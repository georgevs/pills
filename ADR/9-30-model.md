# Model

## SDK
```
config = { baseUrl: 'https://spamfro.xyz/api/pills/v1/' }
pills = new Pills(config)

pills.drugs() -> fetch('drugs') 
pills.drug(id) -> fetch(`drugs/${id}`) 
pills.drugs({ pid }) -> fetch(`prescriptions/${pid}/drugs`) 

pills.prescriptions() -> fetch('prescriptions')
pills.prescription(id) -> fetch(`prescriptions/${id}`)

pills.tracks() -> fetch('tracks')
pills.track(id) -> fetch(`tracks/${id}`)
pills.tracks({ pid }) -> fetch(`prescriptions/${pid}/tracks`)

pills.history() -> fetch('history')
pills.history({ pid }) -> fetch(`prescriptions/${pid}/history`)
```

## API

### Drugs
```
https://spamfro.xyz/api/pills/v1/drugs
[{ "id": 1, "description": "Xymebac 200", "doses": 14 },
 { "id": 2, "description": "Lymex", "doses": 10 },
 { "id": 3, "description": "Mycomax", "doses": 1 },
 { "id": 4, "description": "Sintrom", "doses": 30 }]

https://spamfro.xyz/api/pills/v1/drugs/1
{ "id": 1, "description": "Xymebac 200", "doses": 14 }

https://spamfro.xyz/api/pills/v1/prescriptions/1/drugs
[{ "id": 1, "description": "Xymebac 200", "doses": 14 },
 { "id": 2, "description": "Lymex", "doses": 10 },
 { "id": 3, "description": "Mycomax", "doses": 1 }]
```

### Prescriptions
```
https://spamfro.xyz/api/pills/v1/prescriptions
[{ "id": 1, "issued": "9/1/2022", "started": "9/1/2022", "completed": "9/7/2022" },
 { "id": 2, "issued": "9/1/2022", "started": "9/1/2022" }]

https://spamfro.xyz/api/pills/v1/prescriptions/1
{ "id": 1, "issued": "9/1/2022", "started": "9/1/2022", "completed": "9/7/2022" }
```

### Tracks
```
https://spamfro.xyz/api/pills/v1/tracks
[{ "id": 1, "pid": 1, "did": 1, "dose": 1, "slot": 800, "span": 7 },
 { "id": 2, "pid": 1, "did": 1, "dose": 1, "slot": 2000, "span": 7 },
 { "id": 3, "pid": 1, "did": 2, "dose": 1, "slot": -3, "span": 7 },
 { "id": 4, "pid": 1, "did": 3, "dose": 1, "slot": -3, "times": 1, "filter": "3" },
 { "id": 5, "pid": 2, "did": 4, "dose": 1/4, "slot": 5, "filter": "mo,we,th,sa,su" },
 { "id": 6, "pid": 2, "did": 4, "dose": 1/2, "slot": 5, "filter": "tu,fr" }]

https://spamfro.xyz/api/pills/v1/tracks/1
{ "id": 1, "pid": 1, "did": 1, "dose": 1, "slot": 800, "span": "1w" }

https://spamfro.xyz/api/pills/v1/prescriptions/1/tracks
[{ "id": 1, "pid": 1, "did": 1, "dose": 1, "slot": 800, "span": 7 },
 { "id": 2, "pid": 1, "did": 1, "dose": 1, "slot": 2000, "span": 7 },
 { "id": 3, "pid": 1, "did": 2, "dose": 1, "slot": -3, "span": 7 },
 { "id": 4, "pid": 1, "did": 3, "dose": 1, "slot": -3, "times": 1, "filter": "3" }]
```

### History
```
https://spamfro.xyz/api/pills/v1/history
[{ "timestamp": "9/1/2022 8:00", "tid": 1 },
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
 { "timestamp": "9/3/2022 20:00", "tid": 5 }]

https://spamfro.xyz/v1/prescriptions/2/history
[{ "timestamp": "9/1/2022 20:00", "tid": 5 },
 { "timestamp": "9/2/2022 20:00", "tid": 6 },
 { "timestamp": "9/3/2022 20:00", "tid": 5 }]
```
