import { dateOf, toDateOnly, addDays, daysInRange } from "./utils/date";
import { takeUntil, filter } from "./utils/iter";
import { compose, remap, index, indexBy, map, unique } from "./utils/functional";

export const update = (_model, data) => {
  return modelFrom(data);
};

const modelFrom = (data) => {
  if (!data) { return {} }

  const drugs = drugsFrom(data.drugs);
  const prescriptions = prescriptionsFrom(data.prescriptions);
  const slots = slotsFrom(data.tracks);
  const tracks = tracksFrom({ drugs, prescriptions, slots })(data.tracks);
  const schedule = scheduleForTracks(Array.from<any>(tracks.values()));

  return { drugs, prescriptions, slots, tracks, schedule };
};

// track -> date...
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

// [track] -> { s -> [track] }
const indexBySlot = index(({ slot }) => [slot]);

const uniqueDate = () => unique(date => date.getTime());

// track -> [date]
const trackUniqueDates = compose(map(uniqueDate()), Array.from, trackDates);

// [track] -> { d -> [track] }
const indexByDate = index(trackUniqueDates);

// [track] -> { d -> { s -> [track] } }
export const scheduleForTracks = compose(remap(indexBySlot), indexByDate);

// db/drug -> [id, drug]
const drugKey = ({ id, ...rest }) => [id, { id, ...rest }];

// [db/drug] -> { id -> drug }
export const drugsFrom = indexBy(drugKey);

// db/prescription -> [id, prescription]
const prescriptionKey = ({ id, issued, started, completed, ...rest }) => [id, { 
  id, ...rest,
  issued: dateOf(issued), 
  started: dateOf(started)
}];

// [db/prescription] -> { id -> prescription }
export const prescriptionsFrom = indexBy(prescriptionKey);

// db/track -> [slot/id, slot]
const slotKey = () => {
  const m = new Map;
  const get = (sid) => m.get(sid) ?? m.set(sid, slotOf(sid)).get(sid);
  return ({ slot: sid }) => [sid, get(sid)];
};

// [db/track] -> { slot/id -> slot }
export const slotsFrom = indexBy(slotKey());

// ([prescription], [drug], [slot]) -> db/track -> [id, track]
const trackKey = ({ prescriptions, drugs, slots }) => (
  ({ id, pid, did, slot: sid, filter, ...rest }) => [id, {
    id, ...rest,
    prescription: prescriptions.get(pid),
    drug: drugs.get(did),
    slot: slots.get(sid),
    filter: !filter ? filter : filterOf(filter)
  }]
);

// ([prescription], [drug], [slot]) -> [db/track] -> { id -> track }
export const tracksFrom = ({ prescriptions, drugs, slots }) => indexBy(trackKey({ prescriptions, drugs, slots }));

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
