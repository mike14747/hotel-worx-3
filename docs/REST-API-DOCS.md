# REST API Endpoint Docs for hotel-worx-3

## Note:
* All of the **/api** routes are going to be protected routes when this app goes to production (you need to be logged in as a valid user)
* An access level of 1 (employee) is the default access level for these routes.
* Some routes will have level 2 or level 3 requirements. They will be denoted as such.

---

## /api/rooms

**GET methods:**
> ## '/'
> * Takes in no parameters.
> * It outputs status code 200 and a message from the /api/rooms route root.

> ## '/all'
> * Takes in no parameters.
> * Returns all rooms and their details in an array of objects like this:
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

> ## '/id/:id'
> * Takes in a room_id parameter in the url.
> * Returns the same as the '/all' route above, but the array will contain only a single room object.

> ## '/all-ids-nums'
> * Takes in no parameters.
> * Returns all rooms in an array of objects with just each room's room_id and room_num like this:
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

> ## '/house-status'
> * Takes in no parameters.
> * Return detailed house status for the hotel like this:
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

> ## '/housekeeping-status'
> * Takes in no parameters and returns an array of room objects.
> * Each of the room objects show detailed room status for all rooms marked as active.
> * Sample of the returned array:
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

> ## '/available-list/:date'
> * Takes in a date parameter in the url (in the 'YYYY-MM-DD' format, eg: /api/rooms/available-list/2019-11-18).
> * It returns an array of active room objects which are available on the date in the url parameter.
> * It includes the date available ends for each room (or "n/a" if a room has unlimited availability).
> * Sample of the returned array:
```
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
> ## '/'
> * Takes in a list of parameters in the body object (shown below).
> * It returns status code 200 and a 'New room was successfully added!' message if successful.
> * It returns status code 400 and a 'Could not add the new room... please check your request and try again!' message if unsuccessful.
> * Needed parameters in the body being sent:
```
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
> ## '/'
> * Takes in a list of parameters in the body object (shown below).
> * It returns status code 200 and a 'Room info was successfully updated!' message if successful.
> * It returns status code 400 and a 'Could not update room info... please check your request and try again!' message if unsuccessful.
> * Needed parameters in the body being sent:
```
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
> ## '/clean-status'
> * Takes in a list of parameters in the body object (shown below).
> * It returns status code 200 and a 'Room clean status was successfully updated!' message if successful.
> * It returns status code 400 and a 'Could not update room clean status... please check your request and try again!' message if unsuccessful.
> * Needed parameters in the body being sent:
```
{
    "room_id": 17,
    "clean": 0
}
```
> ## '/occupied-status'
> * Takes in a list of parameters in the body object (shown below).
> * It returns status code 200 and a 'Room occupied status was successfully updated!' message if successful.
> * It returns status code 400 and a 'Could not update room occupied status... please check your request and try again!' message if unsuccessful.
> * Needed parameters in the body being sent:
```
{
    "room_id": 35,
    "occupied": 1
}
```
> ## '/checked-out/:id'
> * Takes in a room_id parameter in the url.
> * It sets the room's status to '**clean=0 and occupied=0**'.
> * It returns status code 200 and a 'Room checked-out status was successfully updated!' message if successful.
> * It returns status code 400 and a 'Could not update room checked-out status... please check your request and try again!' message if unsuccessful.

**DELETE methods:**
> ## '/:id'
> * Takes in a room_id parameter in the url.
> * It returns status code 200 and a 'Room was successfully deleted!' message if successful.
> * It returns status code 400 and a 'Room could not be deleted... please check your request and try again!' message if unsuccessful.

---

## /api/users

**GET methods:**
> ## '/'
> * Takes in no parameters.
> * It outputs status code 200 and a message from the /api/users route root.

> ## '/all'
> * Takes in no parameters.
> * Returns all users and their details in an array of objects like this (note: passwords are not included):
```[
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

> ## '/id/:id'
> * Takes in a user_id parameter in the url.
> * Returns the same as the '/all' route above, but the array will contain only a single user object (note: passwords are not included).

**POST methods:**
> ## '/'
> * Takes in a list of parameters in the body object (shown below).
> * It returns status code 200 and a 'New user was successfully added!' message if successful.
> * It returns status code 400 and a 'Could not add the new user... please check your request and try again!' message if unsuccessful.
> * Needed parameters in the body being sent:
```
{
    "username": "Jan-Front-Desk",
    "password": "new_password",
    "access_id": 1,
    "active": 1
}
```

**PUT methods:**
> ## '/'
> * Takes in a list of parameters in the body object (shown below).
> * It returns status code 200 and a 'User info was successfully updated!' message if successful.
> * It returns status code 400 and a 'Could not update user info... please check your request and try again!' message if unsuccessful.
> * Needed parameters in the body being sent:
```
{
    "user_id": 6,
    "username": "manager123",
    "password": "updated_password",
    "access_id": 2,
    "active": 1
}
```

**DELETE methods:**
> ## '/:id'
> * Takes in a user_id parameter in the url.
> * It returns status code 200 and a 'User was successfully deleted!' message if successful.
> * It returns status code 400 and a 'User could not be deleted... please check your request and try again!' message if unsuccessful.

---

## /api/customers

**GET methods:**
> ## '/'
> * Takes in no parameters.
> * It outputs status code 200 and a message from the /api/customers route root.

> ## '/all'
> * Takes in no parameters.
> * Returns all customers and their details in an array of objects like this:
```[
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

> ## '/id/:id'
> * Takes in a customer_id parameter in the url.
> * Returns the same as the '/all' route above, but the array will contain only a single customer object.

**POST methods:**
> ## '/'
> * Takes in a list of parameters in the body object (shown below).
> * It returns status code 200 and a 'New customer was successfully added!' message if successful.
> * It returns status code 400 and a 'Could not add the new customer... please check your request and try again!' message if unsuccessful.
> * Needed parameters in the body being sent:
```
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
> ## '/'
> * Takes in a list of parameters in the body object (shown below).
> * It returns status code 200 and a 'Customer info was successfully updated!' message if successful.
> * It returns status code 400 and a 'Could not update customer info... please check your request and try again!' message if unsuccessful.
> * Needed parameters in the body being sent:
```
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
> ## '/:id'
> * Takes in a customer_id parameter in the url.
> * It returns status code 200 and a 'Customer was successfully deleted!' message if successful.
> * It returns status code 400 and a 'Customer could not be deleted... please check your request and try again!' message if unsuccessful.

---

## /api/reservations

**GET methods:**
> ## '/'
> * Takes in no parameters.
> * It outputs status code 200 and a message from the /api/reservations route root.

**POST methods:**
> ## '/'
>* Takes in a list of parameters in the body object (shown below).
> * This route uses these 3 database models:
>   * customer
>   * reservation
>   * res_room
> * The **rooms** property of the body is an array that contains an object element for each room in the reservation.
> * It returns an object with a **reservation_id** property for the newly created reservation.
> * Needed parameters in the body being sent:
```
{
    "cust": {
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
    "reserve": {
        "user_id": 1,
        "comments": "test reservation comment"
    },
    "rooms": [
        {
            "room_type_id": 2,
            "check_in_date": "2019-08-12",
            "check_out_date": "2019-08-15",
            "adults": 2,
            "rate": "119.99",
            "comments": "need a good view"
        },
        {
            "room_type_id": 1,
            "check_in_date": "2019-08-12",
            "check_out_date": "2019-08-17",
            "adults": 2,
            "rate": "109.99",
            "comments": "want a late checkout"
        }
    ]
}
```

**PUT methods:**

**DELETE methods:**