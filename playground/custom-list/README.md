# Custom list

## Refernecs 
- https://moderncss.dev/totally-custom-list-styles/
- https://css-tricks.com/clipping-masking-css/
- https://css-tricks.com/masking-vs-clipping-use/
- https://css-tricks.com/change-color-of-svg-on-hover/
- https://ishadeed.com/article/clip-path/

## Summary

The list has `list-style` which modifies the list items marker.
Limited set of the marker properties are controlled through a pseudo element `::marker`.

For more flexible marker, the list style is set to `none`, and the list items `::before` pseudo element can be styled instead.

The psedo element properties CANNOT be controlled DYNAMICALLY with JavaScript because there's no ELEMENT to select. The properties can be observed through the computed properties, and can be changed through CSS variables:
```
const color = window.getComputedStyle(document.querySelector('li'), ':before')`).color;

li::marker { color: var(--marker-color); }
document.querySelector('li').style.setProperty('--marker-color', 'red');
```

The marker glyph can be set to any text (including emoji), or image (including SVG):
```
li::marker {
  content: '\2588';
}

li::marker {
    content: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%0A%20%20%20%20%3Cpath%20fill%3D%22rgb%281%2C1%2C1%29%22%20d%3D%22M11.5%2C22C11.64%2C22%2011.77%2C22%2011.9%2C21.96C12.55%2C21.82%2013.09%2C21.38%2013.34%2C20.78C13.44%2C20.54%2013.5%2C20.27%2013.5%2C20H9.5A2%2C2%200%200%2C0%2011.5%2C22M18%2C10.5C18%2C7.43%2015.86%2C4.86%2013%2C4.18V3.5A1.5%2C1.5%200%200%2C0%2011.5%2C2A1.5%2C1.5%200%200%2C0%2010%2C3.5V4.18C7.13%2C4.86%205%2C7.43%205%2C10.5V16L3%2C18V19H20V18L18%2C16M19.97%2C10H21.97C21.82%2C6.79%2020.24%2C3.97%2017.85%2C2.15L16.42%2C3.58C18.46%2C5%2019.82%2C7.35%2019.97%2C10M6.58%2C3.58L5.15%2C2.15C2.76%2C3.97%201.18%2C6.79%201%2C10H3C3.18%2C7.35%204.54%2C5%206.58%2C3.58Z%22%2F%3E%0A%3C%2Fsvg%3E");
}
```
An alternative way to set a marker image is to use `clip-path` over a `background-color`. Since background color and clip path are not controllable for `::marker`, a `::before` pseudo element should be used:
```
ul {
  list-style: none;
}
li::before {
  content: '';
  padding-inline: 0.5em;
  background-color: var(--marker-color);
  clip-path: circle(0.2em at center);
}
```
The marker glyph can also be linked to a `data` attribute of the list item. The feature is not necessarily well supported:
```
<li data-glyph="&#x2588;">...

li::marker {
  content: attr(data-glyph);
}
```
By default the marker is placed OUTSIDE the item inline box, into the list box left padding area. This can be changed through `list-style-position`:
```
ul {
  list-style-position: inside;
}
```

If positioned inside the marker adds a margin which CANNOT be controlled. The only option is to switch to `::before` pseudo element instead. Then the spacing can be set with `padding-inline`:
```
ul {
  list-style: none;
}
li::before {
  content: '\2588';
  padding-inline: 0 0.2em;
}
```