import React from 'react';



const Schedule = ({ data: { slots } }) => (
  <table>
    <thead>
      <HeaderRow slots={slots} />
    </thead>
    <tbody>
      {[1,2,3,4,5].map(() => <DayRow slots={slots} />)}
    </tbody>
  </table>
);

const HeaderRow = ({ slots }) => (
  <tr>
    <th colSpan={2}>Date</th>
    {Array.from<{ label }>(slots.values()).map(({ label }) => <th>{label}</th>)}
  </tr>
);

const DayRow = ({ slots }) => (
  <tr>
    <td>Th</td>
    <td>9/1</td>
    {Array.from(slots.values()).map(() => <SlotCell />)}
  </tr>
);

const SlotCell = () => (
  <td>X</td>
);

export default Schedule;
