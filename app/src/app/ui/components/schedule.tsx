import React from 'react';

// const Schedule = ({ data }) => (
//   <ul>
//     {data.map(i => <li>{i}</li>)}
//   </ul>
// );


// https://www.javatpoint.com/css-checkbox-style
// https://www.w3schools.com/howto/howto_css_custom_checkbox.asp
// https://stackoverflow.com/questions/4148499/how-to-style-a-checkbox-using-css
// https://css-tricks.com/the-checkbox-hack/
// https://www.css3.com/implementing-custom-checkboxes-and-radio-buttons-with-css3/
// https://paulund.co.uk/how-to-style-a-checkbox-with-css

// new Date(yyyy,mm,dd,...) -> local time yyyy/mm/dd...
// new Date(Date.UTC(yyyy,mm,dd,...)) -> UTC time yyyy,mm,dd,...
// new Date(yyyy,mm,dd,...).valueOf() -> number of milliseconds since 1 January 1970 00:00:00 UTC to local time yyyy/mm/dd...
// Date.UTC(yyyy,mm,dd,...) -> number of milliseconds since 1 January 1970 00:00:00 UTC to UTC time yyyy/mm/dd...


const Schedule = ({ data }) => (
  <table>
    <thead>
      <tr>
        <th>Weekday</th>
        <th>Date</th>
        <th>Wakeup</th>
        <th>Breakfast</th>
        <th>Lunch</th>
        <th>Dinner</th>
        <th>Bedtime</th>
      </tr>
    </thead>
    <tbody>
      {data.map(i => (
        <tr>
          <td>Th</td>
          <td>9/1</td>
          <td>-</td>
          <td>X</td>
          <td>L</td>
          <td>X T</td>
          <td>S</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Schedule;
