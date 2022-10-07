import { scheduleForTracks, trackDates, tracksFrom, drugsFrom, prescriptionsFrom, slotsFrom, slotOf, filterOf } from './model';
import { dateOf } from './utils/date';

describe('model', () => {
  describe('scheduleForTracks', () => {
    it('should build schedule for tracks', () => {
      const prescriptions = prescriptionsFrom(data.prescriptions);
      const drugs = drugsFrom(data.drugs);
      const slots = slotsFrom(data.tracks);
      const tracks = tracksFrom({ prescriptions, drugs, slots }, data.tracks);
      const tracksOfPrescription = (pid) => (
        Array.from<any>(tracks.values())
          .filter(track => track.prescription.id === pid)
      );

      // { date -> { slot -> [track] } } -> [[date, [slot, [track]]]]
      // const flatten = (schedule) => (
      //   Array.from<any>(schedule.entries())   // -> [[date, { slot -> [track] } ]]
      //   .map(([date, ts]) => [              // -> [[day, [slot.id, [track.id]]]]
      //     date.toDateString(), 
      //     Array.from<any>(ts.entries())
      //       .map(([slot, tracks]) => [slot.id, tracks.map(track => track.id)])
      //   ]) 
      // );
      // console.dir(flatten(scheduleForTracks(tracksOfPrescription(1))), { depth: 5 })

      const t1 = new Map([
        [slots.get(800), [tracks.get(1)]],
        [slots.get(2000), [tracks.get(2)]],
        [slots.get(-3), [tracks.get(3)]]
      ]);
      const t2 = new Map([
        [slots.get(800), [tracks.get(1)]],
        [slots.get(2000), [tracks.get(2)]],
        [slots.get(-3), [tracks.get(3), tracks.get(4)]]
      ]);
      expect(scheduleForTracks(tracksOfPrescription(1))).toEqual(new Map([
        [dateOf('9/1/2022'), t1],
        [dateOf('9/2/2022'), t1],
        [dateOf('9/3/2022'), t2],
        [dateOf('9/4/2022'), t1],
        [dateOf('9/5/2022'), t1],
        [dateOf('9/6/2022'), t1],
        [dateOf('9/7/2022'), t1],
      ]))
    })
  })

  describe('trackDates', () => {
    it('should produce list of dates for track', () => {
      const prescriptions = prescriptionsFrom(data.prescriptions);
      const drugs = drugsFrom(data.drugs);
      const slots = slotsFrom(data.tracks);
      const tracks = tracksFrom({ prescriptions, drugs, slots }, data.tracks);
      expect(Array.from(trackDates(tracks.get(1)))).toEqual([
        dateOf('9/1/2022'),
        dateOf('9/2/2022'),
        dateOf('9/3/2022'),
        dateOf('9/4/2022'),
        dateOf('9/5/2022'),
        dateOf('9/6/2022'),
        dateOf('9/7/2022')
      ]);
      expect(Array.from(trackDates(tracks.get(4)))).toEqual([
        dateOf('9/3/2022')
      ]);
      expect(Array.from(trackDates(tracks.get(6)))).toEqual([
        dateOf('9/2/2022'),  // fr
        dateOf('9/6/2022'),  // tu
        dateOf('9/9/2022'),  // fr
        dateOf('9/13/2022'), // tu 
        dateOf('9/16/2022'), // ...
        dateOf('9/20/2022'),
        dateOf('9/23/2022'),
        dateOf('9/27/2022'),
        dateOf('9/30/2022')
      ])
    })
  })

  describe('drugsFrom', () => {
    it('should transform drugs records to index', () => {
      expect(drugsFrom(data.drugs)).toEqual(
        new Map([
          [1, { id: 1, description: 'Xymebac 200', doses: 14 }],
          [2, { id: 2, description: 'Lymex', doses: 10 }],
          [3, { id: 3, description: 'Mycomax', doses: 1 }],
          [4, { id: 4, description: 'Sintrom', doses: 30 }]
        ])
      )
    })
  })

  describe('prescriptionsFrom', () => {
    it('should transform prescriptions records to index', () => {
      expect(prescriptionsFrom(data.prescriptions)).toEqual(
        new Map([
          [1, { id: 1, issued: dateOf("9/1/2022"), started: dateOf("9/1/2022"), }],
          [2, { id: 2, issued: dateOf("9/1/2022"), started: dateOf("9/1/2022"), }]        
        ])
      )
    })
  })

  describe('slotsFrom', () => {
    it('should transform track records to slot index', () => {
      expect(slotsFrom(data.tracks)).toEqual(
        new Map([
          [800, slotOf(800)],
          [2000, slotOf(2000)],
          [-3, slotOf(-3)],
          [-5, slotOf(-5)]
        ])
      )
    })
  })

  describe('tracksFrom', () => {
    it('should transform track records to index', () => {
      const prescriptions = prescriptionsFrom(data.prescriptions);
      const drugs = drugsFrom(data.drugs);
      const slots = slotsFrom(data.tracks);
      expect(tracksFrom({ prescriptions, drugs, slots }, data.tracks)).toEqual(
        new Map([
          [1, { id: 1, dose: 1, span: 7, prescription: prescriptions.get(1), drug: drugs.get(1), slot: slotOf(800), filter: undefined }],
          [2, { id: 2, dose: 1, span: 7, prescription: prescriptions.get(1), drug: drugs.get(1), slot: slotOf(2000), filter: undefined }],
          [3, { id: 3, dose: 1, span: 7, prescription: prescriptions.get(1), drug: drugs.get(2), slot: slotOf(-3), filter: undefined }],
          [4, { id: 4, dose: 1, times: 1, prescription: prescriptions.get(1), drug: drugs.get(3), slot: slotOf(-3), filter: filterOf('3') }],
          [5, { id: 5, dose: 0.25, span: 30, prescription: prescriptions.get(2), drug: drugs.get(4), slot: slotOf(-5), filter: filterOf('we-th,sa-mo') }],
          [6, { id: 6, dose: 0.5, span: 30, prescription: prescriptions.get(2), drug: drugs.get(4), slot: slotOf(-5), filter: filterOf('tu,fr') }]        
        ])
      )
    })
  })
});

const data = { 
  drugs: [
    { "id": 1, "description": "Xymebac 200", "doses": 14 },
    { "id": 2, "description": "Lymex", "doses": 10 },
    { "id": 3, "description": "Mycomax", "doses": 1 },
    { "id": 4, "description": "Sintrom", "doses": 30 }
  ], 
  prescriptions: [
    { "id": 1, "issued": "9/1/2022", "started": "9/1/2022" },
    { "id": 2, "issued": "9/1/2022", "started": "9/1/2022" }
  ], 
  tracks: [
    { "id": 1, "pid": 1, "did": 1, "dose": 1, "slot": 800, "span": 7 },
    { "id": 2, "pid": 1, "did": 1, "dose": 1, "slot": 2000, "span": 7 },
    { "id": 3, "pid": 1, "did": 2, "dose": 1, "slot": -3, "span": 7 },
    { "id": 4, "pid": 1, "did": 3, "dose": 1, "slot": -3, "times": 1, "filter": "3" },
    { "id": 5, "pid": 2, "did": 4, "dose": 1/4, "slot": -5, "span": 30, "filter": "we-th,sa-mo" },
    { "id": 6, "pid": 2, "did": 4, "dose": 1/2, "slot": -5, "span": 30, "filter": "tu,fr" }
  ], 
  history: [
    { "timestamp": "9/1/2022 8:00", "tid": 1 },
    { "timestamp": "9/1/2022 12:00", "tid": 3 },
    { "timestamp": "9/1/2022 20:00", "tid": 2 },
    { "timestamp": "9/1/2022 20:00", "tid": 5 },
    { "timestamp": "9/2/2022 8:00", "tid": 1 },
    { "timestamp": "9/2/2022 12:00", "tid": 3 },
    { "timestamp": "9/2/2022 20:00", "tid": 2 },
    { "timestamp": "9/2/2022 20:00", "tid": 6 },
    { "timestamp": "9/3/2022 8:00", "tid": 1 },
    { "timestamp": "9/3/2022 12:00", "tid": 3 },
    { "timestamp": "9/3/2022 12:00", "tid": 4 },
    { "timestamp": "9/3/2022 20:00", "tid": 2 },
    { "timestamp": "9/3/2022 20:00", "tid": 5 }
  ]
};
