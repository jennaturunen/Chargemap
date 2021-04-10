# Chargemap
Server-side Scripting Frameworks-course, week 2 Chargemap assingment

Jelastic endpoint: `http://jt-test-app.jelastic.metropolia.fi/station`

## Get-methods

Limit the results: `http://jt-test-app.jelastic.metropolia.fi/station?limit=1`

Get stations with limited area: `http://jt-test-app.jelastic.metropolia.fi/station?topRight={"lat":60.2821946,"lng":25.036108}&bottomLeft={"lat":60.1552076,"lng":24.7816538}`

By default and without the query-params, the endpoint will return 10 stations

## Post-method

Same jelastic endpoint,
Example of the body for creating new station
```
{
    "Station": {
        "Title": "Capgemini Oy",
        "Town": "Espoo",
        "AddressLine1": "Sinimäentie 8b",
        "StateOrProvince": "Southern Finland",
        "Postcode": "02630",
        "Location": {
        "coordinates": [24.77772323548868, 60.203353130088146]
        }
    },
    "Connections":[
        {
        "ConnectionTypeID": "5e39eecac5598269fdad81a0",
        "CurrentTypeID": "5e39ef4a6921476aaf62404a",
        "LevelID": "5e39edf7bb7ae768f05cf2bc",
        "Quantity": 2
        }
    ]
}

```

## Put-method

Same jelastic endpoint,
Example of the body for updating one station
```
{
"Station": {
    "_id": "5e8df9a81f87eb168e4c6757",
    "Title": "Testi",
    "Town": "Espoo",
    "AddressLine1": "Sinimäentie 8b",
    "StateOrProvince": "Southern Finland",
    "Postcode": "02630",
    "Location": {
        "coordinates": [24.77772323548868, 60.203353130088146]
        }
},
"Connections":[
        {
        "_id": "5e8df9a81f87eb168e4c6756",
        "ConnectionTypeID": "5e39eecac5598269fdad81a0",
        "CurrentTypeID": "5e39ef4a6921476aaf62404a",
        "LevelID": "5e39edf7bb7ae768f05cf2bc",
        "Quantity": 7
        }
  ]
}

```

## Delete-method

When deleting stations, just pass the ID of the station as a parameter `http://jt-test-app.jelastic.metropolia.fi/station/stationID`
