import { date } from '../utils/date';

export interface PillsConfig {
  baseUrl: URL;
}

export const pills = (config: PillsConfig) => new Pills(config);

class Pills {
  constructor(config: PillsConfig) { }

  drugs() {
    return [
      { "id": 1, "description": "Xymebac 200", "doses": 14 },
      { "id": 2, "description": "Lymex", "doses": 10 },
      { "id": 3, "description": "Mycomax", "doses": 1 },
      { "id": 4, "description": "Sintrom", "doses": 30 }
    ];
  }

  prescriptions() {
    return [
      { "id": 1, "issued": date("9/1/2022"), "started": date("9/1/2022"), "completed": date("9/7/2022") },
      { "id": 2, "issued": date("9/1/2022"), "started": date("9/1/2022") }
    ];
  }

  tracks() {
    return [
      { "id": 1, "pid": 1, "did": 1, "dose": 1, "slot": slot(800), "span": 7 },
      { "id": 2, "pid": 1, "did": 1, "dose": 1, "slot": slot(2000), "span": 7 },
      { "id": 3, "pid": 1, "did": 2, "dose": 1, "slot": slot(-3), "span": 7 },
      { "id": 4, "pid": 1, "did": 3, "dose": 1, "slot": slot(-3), "times": 1, "filter": filter("3") },
      { "id": 5, "pid": 2, "did": 4, "dose": 1/4, "slot": slot(-5), "filter": filter("we-th,sa-mo") },
      { "id": 6, "pid": 2, "did": 4, "dose": 1/2, "slot": slot(-5), "filter": filter("tu,fr") }
    ];
  }
}

const slot = (n: number) => new Slot(n);

class Slot {
  readonly time?: Number;
  readonly hour?: Number;
  readonly minute?: Number;
  readonly label: String;
  
  constructor(time: number) {
    if (-5 <= time && time < 0) {
      this.label = ['', 'Wakeup', 'Breakfast', 'Lunch', 'Dinner', 'Bedtime'][-time];
    } else if (0 <= time && time < 2400) {
      this.hour = time / 100 | 0;
      this.minute = time % 100;
      if (this.hour > 23 &&  this.minute > 59) { throw Error(`Bad time "${time}"`) }
      this.time = time;
      this.label = `${this.hour.toString().padStart(2, '0')}:${this.minute.toString().padStart(2, '0')}`;
    } else {
      throw Error(`Bad time "${time}"`) ;
    }
  }
}

const filter = (descr: string) => new Filter(descr);

type FilterRange = [number, number];
class Filter {
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
    const add = (d: Date, n: number) => new Date(new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime() + n * (24 * 60 * 60 * 1000));
    const rangeIncludes = (s: Date, d: Date) => ([l, r]: FilterRange) => l < 0 ? l + 7 <= d.getDay() && d.getDay() <= r + 7 : add(s, l - 1) <= d && d < add(s, r);
    return this.ranges.some(rangeIncludes(startDate, date));
  }
}
