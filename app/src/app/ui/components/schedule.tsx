import React from 'react';

const Schedule = ({ data }) => (
  <ul>
    {data.map(i => <li>{i}</li>)}
  </ul>
);

export default Schedule;
