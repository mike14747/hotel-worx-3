# REST API Endpoint Docs for hotel-worx-3

## Note:
* All of the **/api** routes except **/api/auth** are going to be protected routes when this app goes to production (you need to be logged in as a valid user)
   * **/api/auth** is going to be left unprotected because it needs to be accessed while logging in.
* An access level of 1 (employee) is the default access level for these routes.
* Some routes will have level 2 or level 3 requirements. They will be denoted as such.

---

## /api/rooms

**GET methods:**
> ## '/api/rooms'
> * Takes in no parameters.
> * It outputs status code 200 and a message from the /api/rooms route root.

> ## '/api/rooms/all'
> * Takes in no parameters.
> * Returns all rooms and their details in an array of objects.
```
// sample response from the '/api/rooms/all' GET route
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

> ## '/api/rooms/id/:id'
> * Takes in a room_id parameter in the url.
> * Returns the same as the '/api/rooms/all' route above, but the array will contain only a single room object.

> ## '/api/rooms/all-ids-nums'
> * Takes in no parameters.
> * Returns all rooms in an array of objects with just each room's room_id and room_num.
```
// sample response from the '/api/rooms/all-ids-nums' GET route
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

> ## '/api/rooms/house-status'
> * Takes in no parameters.
> * Return detailed house status for the hotel.
```
// sample response from the '/api/rooms/house-status' GET route
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

> ## '/api/rooms/housekeeping-status'
> * Takes in no parameters and returns an array of room objects.
> * Each of the room objects show detailed room status for all rooms marked as active.
```
// sample response from the '/api/rooms/housekeeping-status' GET route
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

> ## '/api/rooms/available-list/:date'
> * Takes in a date parameter in the url (in the 'YYYY-MM-DD' format, eg: /api/rooms/available-list/2019-11-18).
> * It returns an array of active room objects which are available on the date in the url parameter.
> * It includes the date available ends for each room (or "n/a" if a room has unlimited availability).
```
// sample response from the '/api/rooms/available-list/:date' GET route
[
    {
        "room_id": 3,
        "room_num": "103",
        "room_type_id": 1,
        "clean": 1,
        "occupied": 1,
        "availability_end": "2019-11-08"
    },
    {
        "room_id": 94,
        "room_num": "244",
        "room_type_id": 2,
        "clean": 0,
        "occupied": 0,
        "availability_end": "n/a"
    },
    {
        ...
    }
]
```

**POST methods:**
> ## '/api/rooms'
> * Takes in a list of parameters in the body object.
> * It returns status code 200 and a 'New room was successfully added!' message if successful.
> * It returns status code 400 and a 'Could not add the new room... please check your request and try again!' message if unsuccessful.
```
// sample request body for the '/api/rooms' POST route
{
    "room_num": "301",
    "room_type_id": 1,
    "description": "This is a test description",
    "num_beds": 2,
    "clean": 1,
    "occupied": 1,
    "active": 1
}
```

**PUT methods:**
> ## '/api/rooms'
> * Takes in a list of parameters in the body object.
> * It returns status code 200 and a 'Room info was successfully updated!' message if successful.
> * It returns status code 400 and a 'Could not update room info... please check your request and try again!' message if unsuccessful.
```
// sample request body for the '/api/rooms' PUT route
{
    "room_id": 1,
    "room_num": "101",
    "room_type_id": 1,
    "description": "This is a test description",
    "num_beds": 2,
    "clean": 1,
    "occupied": 1,
    "active": 1
}
```
> ## '/api/rooms/clean-status'
> * Takes in a list of parameters in the body object.
> * It returns status code 200 and a 'Room clean status was successfully updated!' message if successful.
> * It returns status code 400 and a 'Could not update room clean status... please check your request and try again!' message if unsuccessful.
```
// sample request body for the '/api/rooms/clean-status' PUT route
{
    "room_id": 17,
    "clean": 0
}
```
> ## '/api/rooms/occupied-status'
> * Takes in a list of parameters in the body object.
> * It returns status code 200 and a 'Room occupied status was successfully updated!' message if successful.
> * It returns status code 400 and a 'Could not update room occupied status... please check your request and try again!' message if unsuccessful.
```
// sample request body for the '/api/rooms/occupied-status' PUT route
{
    "room_id": 35,
    "occupied": 1
}
```
> ## '/api/rooms/checked-out/:id'
> * Takes in a room_id parameter in the url.
> * It sets the room's status to '**clean=0 and occupied=0**'.
> * It returns status code 200 and a 'Room checked-out status was successfully updated!' message if successful.
> * It returns status code 400 and a 'Could not update room checked-out status... please check your request and try again!' message if unsuccessful.

**DELETE methods:**
> ## '/api/rooms/:id'
> * Takes in a room_id parameter in the url.
> * It returns status code 200 and a 'Room was successfully deleted!' message if successful.
> * It returns status code 400 and a 'Room could not be deleted... please check your request and try again!' message if unsuccessful.

---

## /api/users

**GET methods:**
> ## '/api/users'
> * Takes in no parameters.
> * It outputs status code 200 and a message from the /api/users route root.

> ## '/api/users/all'
> * Takes in no parameters.
> * Returns all users and their details in an array of objects (note: passwords are not included).
```
// sample response from the '/api/users/all' GET route
[
    {
        "user_id": 3,
        "username": "jonathon123",
        "type": "Employee",
        "active": 1
    },
    {
        ...
    }
]
```

> ## '/api/users/id/:id'
> * Takes in a user_id parameter in the url.
> * Returns the same as the '/api/users/all' route above, but the array will contain only a single user object (note: passwords are not included).

**POST methods:**
> ## '/api/users'
> * Takes in a list of parameters in the body object.
> * It returns status code 200 and a 'New user was successfully added!' message if successful.
> * It returns status code 400 and a 'Could not add the new user... please check your request and try again!' message if unsuccessful.
```
// sample request body for the '/api/users' POST route
{
    "username": "Jan-Front-Desk",
    "password": "new_password",
    "access_id": 1,
    "active": 1
}
```

**PUT methods:**
> ## '/api/users'
> * Takes in a list of parameters in the body object.
> * It returns status code 200 and a 'User info was successfully updated!' message if successful.
> * It returns status code 400 and a 'Could not update user info... please check your request and try again!' message if unsuccessful.
```
// sample request body for the '/api/users' PUT route
{
    "user_id": 6,
    "username": "manager123",
    "password": "updated_password",
    "access_id": 2,
    "active": 1
}
```

**DELETE methods:**
> ## '/api/users/:id'
> * Takes in a user_id parameter in the url.
> * It returns status code 200 and a 'User was successfully deleted!' message if successful.
> * It returns status code 400 and a 'User could not be deleted... please check your request and try again!' message if unsuccessful.

---

## /api/customers

**GET methods:**
> ## '/api/customers'
> * Takes in no parameters.
> * It outputs status code 200 and a message from the /api/customers route root.

> ## '/api/customers/all'
> * Takes in no parameters.
> * Returns all customers and their details in an array of objects.
```
// sample response from the '/api/customers/all' GET route
[
    {
        "customer_id": 1,
        "first_name": "Jamar",
        "last_name": "Wilkerson",
        "address": "7193 Valley St",
        "city": "Lexington",
        "state": "NC",
        "zip": "27292",
        "email": "rgiersig@yahoo.com",
        "phone": "806-427-8083",
        "creditCardLastFour": "0920",
        "cc_expiration": "10 / 22"
    },
    {
        ...
    }
]
```

> ## '/api/customers/id/:id'
> * Takes in a customer_id parameter in the url.
> * Returns the same as the '/api/customers/all' route above, but the array will contain only a single customer object.

**POST methods:**
> ## '/api/customers'
> * Takes in a list of parameters in the body object.
> * It returns status code 200 and a 'New customer was successfully added!' message if successful.
> * It returns status code 400 and a 'Could not add the new customer... please check your request and try again!' message if unsuccessful.
```
// sample request body for the '/api/customers' POST route
{
    "first_name": "John",
    "last_name": "Doe",
    "address": "123 Main St,
    "city": "Cleveland",
    "state": "OH",
    "zip": "44124",
    "email": "temp@temp.com",
    "phone": "800-555-1212",
    "credit_card_num": "4444111122223333",
    "cc_expiration": "05 / 23"
}
```

**PUT methods:**
> ## '/api/customers'
> * Takes in a list of parameters in the body object.
> * It returns status code 200 and a 'Customer info was successfully updated!' message if successful.
> * It returns status code 400 and a 'Could not update customer info... please check your request and try again!' message if unsuccessful.
```
// sample request body for the '/api/customers' PUT route
{
    "customer_id": 123,
    "first_name": "John",
    "last_name": "Doe",
    "address": "123 Main St,
    "city": "Cleveland",
    "state": "OH",
    "zip": "44124",
    "email": "temp@temp.com",
    "phone": "800-555-1212",
    "credit_card_num": "4444111122223333",
    "cc_expiration": "05 / 23"
}
```

**DELETE methods:**
> ## '/api/customers/:id'
> * Takes in a customer_id parameter in the url.
> * It returns status code 200 and a 'Customer was successfully deleted!' message if successful.
> * It returns status code 400 and a 'Customer could not be deleted... please check your request and try again!' message if unsuccessful.

---

## /api/reservations

**GET methods:**
> ## '/api/reservations'
> * Takes in no parameters.
> * It outputs status code 200 and a message from the /api/reservations route root.

> ## '/api/reservations/all'
> * Takes in no parameters.
> * Returns all reservations and their details in an array of objects.
```
// sample response from the '/api/reservations/all' GET route
[
    {
        "reservation_id": 1001,
        "active": 1,
        "first_name": "Jamar",
        "last_name": "Wilkerson",
        "type": "2 Queens",
        "res_room_id": 1001,
        "created_at": "Nov 15, 2019 (09:39 PM)",
        "check_in_date": "Nov 12, 2019",
        "check_out_date": "Nov 16, 2019"
    },
    {
        ...
    }
]
```

> ## '/api/reservations/id/:id'
> * Takes in a reservation_id parameter in the url.
> * Returns a single reservation and detailed customer info in an array of a single object.
> * This route should be used in conjunction with the **/api/reservations/res-rooms/id/:id** route to get all rooms associated with this reservation.
```
// sample response from the '/api/reservations/id/:id' GET route
[
    {
        "reservation_id": 1056,
        "customer_id": 56,
        "user_id": 3,
        "created_at": "Nov 15, 2019 (09:39 PM)",
        "comments": "",
        "active": 1,
        "first_name": "Moshe",
        "last_name": "Powers",
        "address": "7763 W Strawberry Drive",
        "city": "Eau Claire",
        "state": "WI",
        "zip": "54701",
        "email": "gfody@aol.com",
        "phone": "212-220-2744",
        "ccLastFour": "4144",
        "cc_expiration": "05 / 20"
    }
]
```

> ## '/api/reservations/res-rooms/id/:id'
> * Takes in a reservation_id parameter in the url.
> * Returns all rooms associated with a single reservation.
> * This route should be used in conjunction with the **/api/reservations/id/:id** route
```
// sample response from the '/api/reservations/id/:id' GET route
[
    {
        "res_room_id": 1056,
        "reservation_id": 1056,
        "room_type_id": 3,
        "check_in_date": "Nov 15, 2019",
        "check_out_date": "Nov 16, 2019",
        "checked_in": 0,
        "checked_out": 0,
        "adults": 1,
        "room_id": null,
        "rate": "129.99",
        "confirmation_code": "190609056001",
        "comments": ""
    },
    {
        ...
    }
]
```

**POST methods:**
> ## '/api/reservations'
> * Takes in a list of parameters in the body object.
> * This route uses these 3 database models:
>   * customer
>   * reservation
>   * res_room
> * The **rooms** property of the body is an array that contains an object element for each room in the reservation.
> * It returns an object with a **reservation_id** property for the newly created reservation.
```
// sample request body for the '/api/reservations' POST route
{
    "customerObj": {
        "first_name": "Peter",
        "last_name": "Pan",
        "address": "1111 FairyTale Lane",
        "city": "Fantasyland",
        "state": "Vermont",
        "zip": "23456",
        "email": "p.pan@yahoo.net",
        "phone": "800-555-1212",
        "credit_card_num": "1234567890123456",
        "cc_expiration": "11 / 21"
    },
    "reservationObj": {
        "user_id": 1,
        "comments": "test reservation comment"
    },
    "resRoomsArr": [
        {
            "room_type_id": 2,
            "check_in_date": "2019-12-12",
            "check_out_date": "2019-12-15",
            "adults": 2,
            "rate": "119.99",
            "comments": "need a good view"
        },
        {
            "room_type_id": 1,
            "check_in_date": "2019-12-12",
            "check_out_date": "2019-12-17",
            "adults": 2,
            "rate": "109.99",
            "comments": "want a late checkout"
        }
    ]
}
```

**PUT methods:**
> ## '/api/reservations/res-rooms'
> * Takes in a list of parameters in the body object.
```
// sample request body for the '/api/reservations/res-rooms' PUT route

```

> ## '/api/reservations/res-rooms/assign'
> * Takes in a list of parameters in the body object.
> * This route is used for assigning a room number and room type to a res room.
> * It will have its confirmation code updated by the reservationsController as needed.
```
// sample request body for the '/api/reservations/res-rooms/assign' PUT route
{
	"res_room_id": 1202,
    "room_type_id": 1,
    "room_id": 98,
    "rate": 109.99,
    "reservation_id": 1201,
    "confirmation_code": "191116201001"
}
```

> ## '/api/reservations/res-rooms/reassign'
> * Takes in a list of parameters in the body object.
> * This route is used for re-assigning a room number and room type to a res room.
> * It will not change the confirmation code associated with the room being reassigned.
```
// sample request body for the '/api/reservations/res-rooms/reassign' PUT route
{
	"res_room_id": 1202,
    "room_type_id": 1,
    "room_id": 98,
    "rate": 109.99,
    "reservation_id": 1201,
    "confirmation_code": "191116201001"
}
```

> ## '/api/reservations/res-rooms/info'
> * Takes in a list of parameters in the body object.
> * This route is used for changing information about a reservation's room.
```
// sample request body for the '/api/reservations/res-rooms/info' PUT route
{
	"res_room_id": 1200,
    "room_type_id": 2,
    "check_in_date": "2020-03-14",
    "check_out_date": "2020-03-18",
    "adults": 3,
    "rate": 119.99,
    "comments": "blah"
}
```

> ## '/api/reservations/res-rooms/check-in'
> * Takes in a list of parameters in the body object.
> * This route is used for marking a res room as checked_in.
> * It should be used in conjuction with a parallel api call to: **/api/rooms/occupied-status** (which will mark the room as occupied).
```
// sample request body for the '/api/reservations/res-rooms/check-in' PUT route
{
	"res_room_id": 1200,
    "checked_in": 1
}
```

**DELETE methods:**

---

## /api/room-types

**GET methods:**
> ## '/api/room-types'
> * Takes in no parameters.
> * It outputs status code 200 and a message from the /api/room-types route root.

> ## '/api/room-types/all'
> * Takes in no parameters.
> * Returns all room types and their rates in an array of objects.
```
// sample response from the '/api/room-types/all' GET route
[
    {
        "room_type_id": 1,
        "type": "2 Queens",
        "rate": "109.99"
    },
    {
        ...
    }
]
```

> ## '/api/room-types/id/:id'
> * Takes in a room_type_id parameter in the url.
> * Returns the same as the '/api/room-types/all' route above, but the array will contain only a single room type object.

> ## '/api/room-types/availability/:date'
> * Takes in a date parameter in the url (in the YYYY-MM-DD format).
> * Returns an array of 14 days worth of availability objects... each of which shows detailed availabilty for that day.
```
// sample response from the '/api/room-types/availability/:date' GET route
[
    {
        "date": "2019-11-13",
        "AvailableType1": "45",
        "AvailableType2": "19",
        "AvailableType3": "29",
        "TotalAvailable": "93",
        "OccupiedType1": "4",
        "OccupiedType2": "1",
        "OccupiedType3": "0",
        "TotalOccupied": "5"
    },
    {
        ...
    }
]
```

**POST methods:**
> ## '/api/room-types'
> * It adds a new room type.
> * Takes in a list of parameters in the body object.
```
// sample request body for the '/api/room-types' POST route
{
    "type": "King",
    "rate": "119.99"
}
```

**PUT methods:**
> ## '/api/room-types'
> * It is used to edit an existing room type by room_type_id.
> * Takes in a list of parameters in the body object.
```
// sample request body for the '/api/room-types' POST route
{
    "room_type_id": 2,
    "type": "King",
    "rate": "119.99"
}
```

**DELETE methods:**
> ## '/api/room-types/:id'
> * Takes in a room_type_id parameter in the url.
> * This will permanently delete a room type.
> * It returns status code 200 and a 'Room type was successfully deleted!' message if successful.
> * It returns status code 400 and a 'Could not delete room type... please check your request and try again!' message if unsuccessful.

---

## /api/invoices

**GET methods:**
> ## '/api/invoices'
> * Takes in no parameters.
> * It outputs status code 200 and a message from the /api/invoices route root.

**POST methods:**


**PUT methods:**


**DELETE methods:**

---

## /api/taxes

**GET methods:**
> ## '/api/taxes'
> * Takes in no parameters.
> * It outputs status code 200 and a message from the /api/taxes route root.

> ## '/api/taxes/all'
> * Takes in no parameters.
> * Returns an array with an oject containing all taxes and their rates.
```
// sample response from the '/api/taxes/all' GET route
[
    {
        "tax_name": "County Tax",
        "tax_rate": "5.000"
    },
    {
        "tax_name": "City Tax",
        "tax_rate": "3.000"
    },
    {
        "tax_name": "State Tax",
        "tax_rate": "7.000"
    }
]
```

**POST methods:**
> ## '/api/taxes'
> * It adds a new tax.
> * Takes in a list of parameters in the body object.
```
// sample request body for the '/api/taxes' POST route
{
    "tax_name": "Special Tax",
    "tax_rate": "2.625"
}
```

**PUT methods:**
> ## '/api/taxes'
> * It is used to edit an existing tax by tax_id.
> * Takes in a list of parameters in the body object.
```
// sample request body for the '/api/taxes' PUT route
[
    {
        "tax_id": 1,
        "tax_name": "County Tax",
        "tax_rate": "5.000"
    }
]
```

**DELETE methods:**
> ## '/api/taxes/:id'
> * Takes in a tax_id parameter in the url.
> * This will permanently delete a tax.
> * It returns status code 200 and a 'Tax was successfully deleted!' message if successful.
> * It returns status code 400 and a 'Could not delete tax... please check your request and try again!' message if unsuccessful.

---

