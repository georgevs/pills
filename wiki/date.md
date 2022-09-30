# Date

## Summary

[Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) can be initialized from local/wall time or UTC time.

No matter how it is initialized, a date object value (`date.getTime()` or `date.valueOf()`) is number of milliseconds since 1 January 1970 00:00:00 UTC.


## API

### New date from local/wall time yyyy/mm/dd,...
```
new Date(yyyy,mm,dd,...)
```

### New date from UTC time yyyy/mm/dd,...
```
new Date(Date.UTC(yyyy,mm,dd,...))
```

### New "date only" (aka start of the day) from a date
```
new Date(date.getFullYear(), date.getMonth(), date.getDay())
```
