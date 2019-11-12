# REST API Endpoint Docs for hotel-worx-3

## Note:
* All of the /api routes are going to be protected routes when this app goes to production (you need to be logged in as a valid user)
* An access level of 1 (employee) is the default access level for these routes.
* Some routes will have level 2 or level 3 requirements. They will be denoted as such.

---

## /api/rooms

**GET methods:**
* '/' --> Takes in no parameters. It outputs status code 200 and a message from the /api/rooms route root.

* '/all' --> Takes in no parameters and returns all rooms and their details in an array of objects like this:
```
[
    {
        "room_id": 1,
        "room_num": "101",
        "description": "balcony",
        "num_beds": 2,
        "clean": 1,
        "occupied": 1,
        "active": 1,
        "room_type_id": 1,
        "type": "2 Queens",
        "rate": "109.99"
    },
    {
        ...
    }
]
```

* '/id/:id' --> Takes in a room_id parameter in the url and returns the same as the '/all' route above, but the array will contain only a single room object.

* '/all-ids-nums' --> Takes in no parameters and returns all rooms in an array of objects with just each room's room_id and room_num like this:
```
[
    {
        "room_id": 1,
        "room_num": "101"
    },
    {
        ...
    }
]
```

* '/house-status' --> Takes in no parameters and return detailed house status for the hotel like this:
```
[
    {
        "roomsToSell": 98,
        "cleanOccupied": "79",
        "cleanVacant": "14",
        "dirtyOccupied": "0",
        "dirtyVacant": "5"
    }
]
```

* '/housekeeping-status' --> Takes in no parameters and returns an array of room objects. Each of the room objects show detailed room status for all rooms marked as active.
```
[
    {
        "room_num": "101",
        "clean": 1,
        "occupied": 1,
        "active": 1,
        "type": "2 Queens",
        "checked_in": 1,
        "checked_out": 0,
        "room_id": 1,
        "departure": null,
        "stayover": null
    },
    {
        ...
    }
]
```

* '/available-list/:date' --> Takes in a date parameter in the url (in the 'YYYY-MM-DD' format) and returns

**POST methods:**
* '/'

**PUT methods:**
* '/'
* '/clean-status'
* '/occupied-status'
* '/check-out/:id'

**DELETE methods:**
* '/:id'

---

## /api/users

**GET methods:**
* '/' --> takes in no parameters; outputs status code 200 and a message from the /api/users route root

**POST methods:**

**PUT methods:**

**DELETE methods:**

---

## /api/customers

**GET methods:**
* '/' --> takes in no parameters; outputs status code 200 and a message from the /api/customers route root

**POST methods:**

**PUT methods:**

**DELETE methods:**

---
