import React from 'react';



// slots :: { id -> { id, time } }
// schedule :: { date -> { slot -> [track] } }
const Schedule = ({ data: { slots, schedule } }) => (
  <table>
    <thead>
      <HeaderRow slots={slots} />
    </thead>
    <tbody>
      {Array.from<any>(schedule.entries())
        .map(([date, schedule]) => <DayRow date={date} slots={slots} schedule={schedule}/>)}
    </tbody>
  </table>
);

const HeaderRow = ({ slots }) => (
  <tr>
    <th colSpan={2}>Date</th>
    {Array.from<any>(slots.values()).map(({ id }) => <th>{id}</th>)}
  </tr>
);

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];  // weekdays[Date.getDay()]

// slots :: { id -> { id, time } }
// schedule :: { slot -> [track] }
const DayRow = ({ date, slots, schedule }) => (
  <tr>
    <td>{weekdays[date.getDay()]}</td>
    <td>{`${date.getMonth() + 1}/${date.getDate()}`}</td>
    {Array.from<any>(slots.values()).map(slot => <SlotCell tracks={schedule.get(slot) ?? []}/>)}
  </tr>
);

const SlotCell = ({ tracks }) => (
  <td>{tracks.map(take).join(',')}</td>
);

const take = (track) => track.dose === 1 ? track.drug.description[0] : `${dose(track.dose)} ${track.drug.description[0]}`;

const doses = new Map([
  [1/4,'1/4'],
  [1/2,'1/2'],
  [1/8,'1/8']
]);
const dose = (dose) => doses.get(dose) ?? dose.toString();

export default Schedule;
