import { dateOf, toDateOnly, addDays, daysInRange } from "./utils/date";
import { takeUntil, filter } from "./utils/iter";

export const update = (_model, data) => {
  return modelFrom(data);
};

const modelFrom = (data) => {
  if (!data) { return {} }

  const drugs = drugsFrom(data.drugs);
  const prescriptions = prescriptionsFrom(data.prescriptions);
  const slots = slotsFrom(data.tracks);
  const tracks = tracksFrom({ drugs, prescriptions, slots }, data.tracks);
  const schedule = null;//scheduleFrom({ tracks }, Array.from(prescriptions.get(1));

  return { drugs, prescriptions, slots, tracks, schedule };
};

// export const scheduleFrom = ({ tracks: allTracks }, prescription) => {
//   const tracks = Array.from<any>(allTracks.values())
//     .filter(track => prescription.id === track.prescription.id);
//   // const ppp = tracks.flatMap(track => Array.from(trackDays(track)).map(d => [d, track]))
//   const ppp = tracks.map(track => track);
//   return { tracks, ppp };
// };

export const scheduleForTracks = (tracks) => (
  tracks.flatMap(track => Array.from(trackDates(track)).map(date => [date, track]))
    // .reduce((acc,[date,track])=>{let r=acc.get(date)??[]; acc.set(date,(r.push())}),new Set)
);

export const trackDates = (track) => {
  let dates = daysInRange(
    track.prescription.started, 
    track.span === undefined ? undefined : addDays(track.prescription.started, track.span)
  );
  if (track.filter !== undefined) {
    dates = filter(d => track.filter.includes(track.prescription.started, d))(dates);
  }
  if (track.times !== undefined) {
    dates = takeUntil((_, i) => i + 1 < track.times)(dates);
  }
  return dates;
};

export const drugsFrom = (xs) => (
  (xs || [])
  .reduce((acc, { id, ...rest }) => acc.set(id, { id, ...rest }), new Map)
);

export const prescriptionsFrom = (xs) => (
  (xs || [])
  .reduce((acc, { id, issued, started, completed, ...rest }) => 
    acc.set(id, { 
      id, ...rest,
      issued: dateOf(issued), 
      started: dateOf(started)
    }), new Map)
);

export const slotsFrom = (xs) => (
  (xs || [])
  .reduce((acc, { slot: sid }) => acc.set(sid, acc.get(sid) ?? slotOf(sid)), new Map)
);

export const tracksFrom = ({ prescriptions, drugs, slots }, xs) => (
  (xs || [])
  .reduce((acc, { id, pid, did, slot: sid, filter, ...rest }) => 
    acc.set(id, {
      id, ...rest,
      prescription: prescriptions.get(pid),
      drug: drugs.get(did),
      slot: slots.get(sid),
      filter: !filter ? filter : filterOf(filter)
    }), new Map)
);

export const slotOf = (id: number) => new Slot(id);
export class Slot {
  readonly id: number;
  readonly time: number;
  readonly hour: number;
  readonly minute: number;
  
  constructor(id: number) {
    if (-5 <= id && id < 0) {
      this.id = id;
      // 'Wakeup', 'Breakfast', 'Lunch', 'Dinner', 'Bedtime'
      ([this.hour, this.minute] = [[], [6,0], [8,0], [12,0], [18,0], [22,0]][-id]);
      this.time = this.hour * 100 + this.minute;
      
    } else if (0 <= id && id < 2400) {
      this.id = id;
      this.hour = id / 100 | 0;
      this.minute = id % 100;
      if (this.hour > 23 &&  this.minute > 59) { throw Error(`Bad slot "${id}"`) }
      this.time = id;

    } else {
      throw Error(`Bad slot "${id}"`) ;
    }
  }
}

export const filterOf = (descr: string) => new Filter(descr);

type FilterRange = [number, number];
export class Filter {
  static weekdays = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];  // weekdays[Date.getDay()]
  private ranges: FilterRange[];
  constructor(descr: string) {
    const parseDescr = (descr: string): FilterRange[] => descr.split(',').map(x => x.trim())
      .map(x => /^([^-]+)(-(.*))?/.exec(x) || [])
      .map(([, l, h, r]) => parseRange([l, h ? r : l]))
      .flatMap(([l, r]) => l < 0 ? groomWeekdayRange([l, r]) : [[l, r]]);

    const parseRange = ([l, r]: [string, string]): FilterRange => [parseBound(l), parseBound(r)] as FilterRange;
    const parseBound = (x: string): number => Filter.weekdays.includes(x) ? Filter.weekdays.indexOf(x) - 7 : Number.parseInt(x);
    const groomWeekdayRange = ([l, r]: FilterRange): FilterRange[] => l <= r ? [[l, r]] : [[l, -1], [-7, r]];
    const verifyRanges = (ranges: FilterRange[]): void => ranges.forEach(([l, r]) => { if (!Number.isInteger(l) || !Number.isInteger(r) || r < l) throw Error(`Bad format "${descr}"`) });

    verifyRanges(this.ranges = parseDescr(descr));
  }

  includes(startDate: Date, date: Date): boolean {
    const rangeIncludes = (s, d) => ([l, r]: FilterRange) => l < 0 ? l + 7 <= d.getDay() && d.getDay() <= r + 7 : addDays(s, l - 1) <= d && d < addDays(s, r);
    return this.ranges.some(rangeIncludes(toDateOnly(startDate), date));
  }
}
