# MySQL

## Create database
```
mysql < pills.sql
```

## Populate with data
```
mysql pills < __data.sql
```

## Dump schema
```
mysqldump --no-data --databases pills > pills.sql
```

## Dump data
```
mysqldump --no-create-info pills > __data.sql
```