## General Rules of Thumb for Accessing Routes

> -   These are general guidelines.
> -   Some of the routes on this list have notes specific to that particular route.

### **'/api/<some-endpoint\>/' GET routes**

> -   Takes in no parameters.
> -   Returns status 200 and all items in an array of objects associated with that specific endpoint.
> -   It will return status 200 and an empty array if no items were found.

### **'/api/<some-endpoint\>/:id' GET routes**

> -   Takes in an id parameter in the url.
> -   Returns status 200 and an array containing a single object associated with that specific endpoint.
> -   Returns status 200 and an empty array if nothing was found for that id.
> -   It will return status 400 (and a "Validation error") if the id param is not an integer.

### **'/api/<some-endpoint\>/' POST routes**

> -   Adds a new record associated with the specific endpoint.
> -   Takes in a list of parameters in the body object.
> -   If successful, it returns status code 201 and an object with the insertId of the new document as the only property.
> -   If unsuccessful, it returns status code 400 and either a "Validation error" or "Invalid request" error.

### **'/api/<some-endpoint\>/' PUT routes**

> -   It is used to edit an existing record by that record's id.
> -   Takes in a list of parameters in the body object.
> -   If successful, it returns status code 204 and nothing else.
> -   If unsuccessful, it returns status code 400 and either a "Validation error" or "Invalid request" error.

### **'/api/<some-endpoint\>/:id' DELETE routes**

> -   Takes in an id parameter in the url.
> -   This will permanently delete a single record associated with the specific endpoint.
> -   If successful, it returns status code 204 and nothing else.
> -   If unsuccessful, it returns status code 400 and either a "Validation error" or "Invalid request" error.
> -   **Note:** Some records cannot be deleted if they are part of other records due to MySQL foreign key constraints.

## Note:

-   All of the **/api** routes except **/api/auth** are going to be protected routes when this app goes to production (you need to be logged in as a valid user to access them)
    -   **/api/auth** is going to be left unprotected because it needs to be accessed while logging in.
-   An access level of 1 (employee) is the default access level for these routes.
-   Some routes will have level 2 or level 3 requirements. They will be denoted as such.

## Unsuccessful attempts on /api routes

-   Some errors on the /api routes will result in status 400 and an error object being returned. Errors of these kinds are most likely caused by trying to pass invalid parameters.
-   Trying to access a non-existent /api route is handled by the catch-all route handler in /controllers/index.js and a status code of 404 is returned.
-   If there is no connection to the database, all /api routes will return status 500 and an error object indictating such.
-   If any /api routes are unsuccessful for unforeseen reasons or actual server errors, they pass their error via next(error) to the error handler in /controllers/index.js which returns a status code of 500 and the error.

---

---

## **/api/rooms**

### **GET methods:**

> ## '/api/rooms'

```
// sample response from this route
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
        "room_rate": "109.99"
    },
    {
        ...
    }
]
```

> ## '/api/rooms/:id'

```
// sample response from this route
[
    {
        "room_id": 21,
        "room_num": "121",
        "description": "",
        "num_beds": 2,
        "clean": 1,
        "occupied": 1,
        "active": 1,
        "room_type_id": 1,
        "type": "2 Queens",
        "room_rate": "109.99"
    }
]
```

> ## '/api/rooms/all-ids-nums'

-   Returns an array of room objects with just each room's room_id and room_num.

```
// sample response from this route
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

-   Takes in no parameters.
-   Returns detailed house status for the hotel.

```
// sample response from this route
[
    {
        "roomsToSell": 98,
        "cleanOccupied": 79,
        "cleanVacant": 14,
        "dirtyOccupied": 0,
        "dirtyVacant": 5
    }
]
```

> ## '/api/rooms/housekeeping-status'

-   Takes in a varying number of query parameters in the url... ranging from 0 to 10.
-   It returns an array of room objects for all rooms meeting the criteria of the query parameters.
-   Each of the room objects show detailed room status information.
-   It will return status 200 and an empty array if no rooms are found meeting the query parameters.
-   Possible query parameters: inactive, clean, dirty, occupied, vacant, arrived, departed, stayover, dueout, notreserved.
-   Possible options for all parameters are: 0 and 1.
-   Sample route with query parameters: **/api/rooms/housekeeping-status?clean=1&occupied=0**

```
[
    {
        "room_num": "231",
        "clean": 0,
        "occupied": 0,
        "active": 1,
        "type": "2 Queens",
        "checked_in": null,
        "checked_out": null,
        "room_id": null,
        "departure": null,
        "stayover": null
    },
    {
        ...
    }
]
```

> ## '/api/rooms/available-list/:date'

-   Takes in a date parameter in the url (in the 'YYYY-MM-DD' format, eg: /api/rooms/available-list/2019-11-18).
-   It returns status 200 and an array of active room objects which are available on the date in the url parameter.
-   It will return status 200 and an empty array if no available rooms are found for the days after that starting date.
-   It will return status 400 (and a json with a message property) if the date param is not in 'YYYY-MM-DD' format.
-   It includes the date availability ends for each room (or "n/a" if a room has unlimited availability).

```
// sample response from this route
[
    {
        "room_id": 1,
        "room_num": "101",
        "room_type_id": 1,
        "clean": 1,
        "occupied": 1,
        "availability_ends": "2019-12-02"
    },
    {
        ...
    }
]
```

### **POST methods:**

> ## '/api/rooms'

```
// sample request body for this route
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

### **PUT methods:**

> ## '/api/rooms'

```
// sample request body for this route
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

```
// sample request body for this route
{
    "room_id": 17,
    "clean": 0
}
```

> ## '/api/rooms/occupied-status'

```
// sample request body for this route
{
    "room_id": 35,
    "occupied": 1
}
```

## this route needs to be reworked so the id param is not in the url... it should be in the body

> ## '/api/rooms/:id/checked-out'

-   Takes in a room_id parameter in the url.
-   It sets the room's status to '**clean=0** and **occupied=0**'.

### **DELETE methods:**

> ## '/api/rooms/:id'

---

---

## **/api/users**

### **GET methods:**

> ## '/api/users'

-   Note: Passwords are not included in the response.

```
// sample response from this route
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

> ## '/api/users/:id'

-   Note: Passwords are not included in the response.

```
// sample response from this route
[
    {
        "user_id": 1,
        "username": "admin",
        "type": "Administrator",
        "active": 1
    },
    {
        ...
    }
]
```

### **POST methods:**

> ## '/api/users'

-   If the submitted username is already taken, it returns a status code 202 and a "Username is already in use!" response.
-   If the submitted username and/or password are less than 6 characters long, it returns a status code 406 and a "Username and/or Password don't meet length standards!" response.

```
// sample request body for this route
{
    "username": "Jan-Front-Desk",
    "password": "new_password",
    "access_id": 1,
    "active": 1
}
```

### **PUT methods:**

> ## '/api/users'

-   If the submitted username is already taken, it returns a status code 202 and a "Username is already in use!" response.
-   If the submitted username and/or password are less than 6 characters long, it returns a status code 406 and a "Username and/or Password don't meet length standards!" response.

```
// sample request body for this route
{
    "user_id": 6,
    "username": "manager123",
    "password": "updated_password",
    "access_id": 2,
    "active": 1
}
```

### **DELETE methods:**

> ## '/api/users/:id'

---

---

## **/api/customers**

### **GET methods:**

> ## '/api/customers'

```
// sample response from this route
[
    {
        "customer_id": 1,
        "first_name": "Jamar",
        "last_name": "Wilkerson",
        "address": "7193 Valley St",
        "city": "Lexington",
        "state": "NC",
        "zip": "27292",
        "country": "USA",
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

> ## '/api/customers/:id'

```
// sample response from this route
[
    {
        "customer_id": 1,
        "first_name": "Jamar",
        "last_name": "Wilkerson",
        "address": "7193 Valley St",
        "city": "Lexington",
        "state": "NC",
        "zip": "27292",
        "country": "USA",
        "email": "rgiersig@yahoo.com",
        "phone": "806-427-8083",
        "creditCardLastFour": "0920",
        "cc_expiration": "10 / 22"
    }
]
```

### **POST methods:**

> ## '/api/customers'

```
// sample request body for this route
{
    "first_name": "John",
    "last_name": "Doe",
    "address": "123 Main St",
    "city": "Cleveland",
    "state": "OH",
    "zip": "44124",
    "country": "USA",
    "email": "temp@temp.com",
    "phone": "800-555-1212",
    "credit_card_num": "4444111122223333",
    "cc_expiration": "05 / 23"
}
```

### **PUT methods:**

> ## '/api/customers'

```
// sample request body for this route
{
    "customer_id": 123,
    "first_name": "John",
    "last_name": "Doe",
    "address": "123 Main St",
    "city": "Cleveland",
    "state": "OH",
    "zip": "44124",
    "country": "USA",
    "email": "temp@temp.com",
    "phone": "800-555-1212",
    "credit_card_num": "4444111122223333",
    "cc_expiration": "05 / 23"
}
```

### **DELETE methods:**

> ## '/api/customers/:id'

-   Customers cannot be deleted if they are part of any existing reservations due to MySQL foreign key constraints.

---

---

## /api/reservations

### **GET methods:**

> ## '/api/reservations'

-   Takes in no parameters.
-   Returns all reservations (with partial customer and res_room info) in an array of reservation objects.
-   Each res_room on a reservation is returned on its own row.

```
// sample response from this route
[
    {
        "reservation_id": 1001,
        "active": 1,
        "first_name": "Jamar",
        "last_name": "Wilkerson",
        "type": "2 Queens",
        "res_room_id": 1001,
        "created_at": "Nov 30, 2019 (01:19 PM)",
        "check_in_date": "Nov 27, 2019",
        "check_out_date": "Dec 01, 2019"
    },
    {
        ...
    }
]
```

> ## '/api/reservations/:id'

-   Takes in a reservation_id parameter in the url.
-   Returns an array containing a single reservation object.
-   This route should be used in conjunction with the **/api/reservations/:id/res-rooms** route to get detailed info about all rooms associated with this reservation.

```
// sample response from this route
[
    {
        "reservation_id": 1001,
        "customer_id": 1,
        "user_id": 1,
        "created_at": "Nov 30, 2019 (01:19 PM)",
        "comments": "",
        "active": 1,
        "first_name": "Jamar",
        "last_name": "Wilkerson",
        "address": "7193 Valley St",
        "city": "Lexington",
        "state": "NC",
        "zip": "27292",
        "email": "rgiersig@yahoo.com",
        "phone": "806-427-8083",
        "ccLastFour": "0920",
        "cc_expiration": "10 / 22"
    }
]
```

> ## '/api/reservations/:id/res-rooms'

-   Takes in a reservation_id parameter in the url.
-   Returns an array of all res_rooms (and detailed res_room info) associated with a single reservation as objects.
-   This route should be used in conjunction with the **/api/reservations/:id** route to get more info about the reservation.

```
// sample response from this route
[
    {
        "res_room_id": 1001,
        "reservation_id": 1001,
        "room_type_id": 1,
        "check_in_date": "Nov 27, 2019",
        "check_out_date": "Dec 01, 2019",
        "checked_in": 1,
        "checked_out": 0,
        "adults": 1,
        "room_id": 9,
        "room_rate": "109.99",
        "confirmation_code": "190501001001",
        "comments": "needs a late checkout time",
        "allow_charges": 1,
        "active": 1
    },
	{
	    ...
	}
]
```

### **POST methods:**

> ## '/api/reservations'

-   Takes in a list of parameters in the body object.
-   This route accesses the reservation model which uses a database transaction that sequentially queries 3 tables (**customers, reservations and res_rooms**)... with either all succeeding/committing or rolling back if any of them fail.
-   The **resRoomsArr** property of the body is an array that contains an object element for each res_room in the reservation.
-   If successful, it returns status code 201 and a JSON object including the reservation_id, the customer_id and the final res_room_id of the inserted reservation.

```
// sample request body for this route
{
    "customerObj": {
        "first_name": "Peter",
        "last_name": "Pan",
        "address": "1111 FairyTale Lane",
        "city": "Fantasyland",
        "state": "Vermont",
        "zip": "23456",
        "country": "USA",
        "email": "p.pan@yahoo.net",
        "phone": "800-555-1212",
        "credit_card_num": "1234567890123456",
        "cc_expiration": "11 / 21"
    },
    "reservationObj": {
        "company_id": null,
        "user_id": 1,
        "comments": "test reservation comment"
    },
    "resRoomsArr": [
        {
            "room_type_id": 2,
            "check_in_date": "2019-12-12",
            "check_out_date": "2019-12-15",
            "adults": 2,
            "room_rate": 119.99,
            "comments": "need a good view",
            "allow_charges": 1
        },
        {
            "room_type_id": 1,
            "check_in_date": "2019-12-12",
            "check_out_date": "2019-12-17",
            "adults": 2,
            "room_rate": 109.99,
            "comments": "want a late checkout",
            "allow_charges": 0
        }
    ]
}
```

```
// sample response from this route
{
    "reservation_id": 1206,
    "customer_id": 209,
    "res_room_id": 1204
}
```

### **PUT methods:**

> ## '/api/reservations'

-   This route is used to update information about a reservation, but not the rooms associated with the reservation.

```
// sample request body for this route
{
	"reservation_id": 1201,
	"customer_id": 201,
    "company_id": null,
    "user_id": 1,
    "comments": "test reservation comment",
    "active": 1
}
```

### **DELETE methods:**

> ## '/api/reservations/:id'

-   This route is used to delete a reservation.
-   It will also delete all resRooms associated with the reservation through the cascading of the foreign keys.

---

---

## /api/res-rooms

### **PUT methods:**

> ## '/api/reservations/res-rooms/assign'

-   This route is used for assigning a room number and room type to a res_room.
-   It will have its confirmation code updated by the reservationsController as needed.

```
// sample request body for this route
{
	"res_room_id": 1201,
    "room_type_id": 1,
    "room_id": 98,
    "room_rate": 109.99,
    "reservation_id": 1201,
    "confirmation_code": "191130201001"
}
```

> ## '/api/reservations/res-rooms/reassign'

-   This route is used for re-assigning a room number and room type to a res_room.
-   It will not change the confirmation code associated with the room being reassigned.

```
// sample request body for this route
{
	"res_room_id": 1202,
    "room_type_id": 1,
    "room_id": 91,
    "room_rate": 109.99,
    "reservation_id": 1201
}
```

> ## '/api/reservations/res-rooms'

-   This route is used for changing information about a res_room.

```
// sample request body for this route
{
	"res_room_id": 1200,
    "room_type_id": 2,
    "check_in_date": "2020-03-14",
    "check_out_date": "2020-03-18",
    "adults": 3,
    "room_rate": 119.99,
    "comments": "blah, blah",
    "allow_charges": 1
}
```

---

---

## **/api/room-types**

### **GET methods:**

> ## '/api/room-types'

```
// sample response from this route
[
    {
        "room_type_id": 1,
        "type": "2 Queens",
        "room_rate": "109.99"
    },
    {
        ...
    }
]
```

> ## '/api/room-types/:id'

```
// sample response from this route
[
    {
        "room_type_id": 1,
        "type": "2 Queens",
        "room_rate": "109.99"
    }
]
```

## this route needs some work to get rid of the data[0] object and it needs a better desciption

> ## '/api/room-types/availability/:date'

-   Takes in a date parameter in the url (in the YYYY-MM-DD format).
-   Returns an array of 14 days worth of availability objects... each of which shows detailed availabilty for that day.

```
// sample response from this route
[
    {
        "fieldCount": 0,
        "affectedRows": 0,
        "insertId": 0,
        "info": "",
        "serverStatus": 10,
        "warningStatus": 0
    },
    [
        {
            "date": "2019-12-02",
            "AvailableType1": 28,
            "AvailableType2": 8,
            "AvailableType3": 16,
            "TotalAvailable": 52,
            "OccupiedType1": 21,
            "OccupiedType2": 12,
            "OccupiedType3": 13,
            "TotalOccupied": 46
        },
        {
            ...
        }
    ]
]
```

### **POST methods:**

> ## '/api/room-types'

```
// sample request body for this route
{
    "type": "Double",
    "room_rate": 109.99
}
```

### **PUT methods:**

> ## '/api/room-types'

```
// sample request body for this route
{
    "room_type_id": 2,
    "type": "King",
    "room_rate": "119.99"
}
```

### **DELETE methods:**

> ## '/api/room-types/:id'

---

---

## **/api/invoices**

### **GET methods:**

> ## '/api/invoices'

```
// sample response from this route
[
    {
        "invoice_id": 1,
        "res_room_id": 1001,
        "total_due": "604.25",
        "created_at": "2019-11-30T18:19:24.000Z"
    },
    {
        ...
    }
]
```

> ## '/api/invoices/:id'

-   Takes in an invoice_id parameter in the url.
-   Returns status 200 and all the details associated with the invoice (customer, company, reservation, res_room, room, room_type, payments, taxes, charges) in an array containing a single compound object.
-   Returns status 200 and an empty array if nothing was found for that invoice_id.
-   It will return status 400 (and a json with a message property) if the invoice_id param is not an integer.

```
// sample response from this route
[
    {
        "invoice_id": 1,
        "res_room_id": 1001,
        "total_due": "604.25",
        "num_nights": 4,
        "reservation_id": 1001,
        "room_type_id": 1,
        "check_in_date": "Nov 27, 2019",
        "check_out_date": "Dec 01, 2019",
        "adults": 1,
        "room_id": 9,
        "room_rate": "109.99",
        "confirmation_code": "190501001001",
        "res_room_comments": "needs a late checkout time",
        "room_num": "109",
        "type": "2 Queens",
        "customer_id": 1,
        "company_id": null,
        "reservation_comments": "",
        "first_name": "Jamar",
        "last_name": "Wilkerson",
        "address": "7193 Valley St",
        "city": "Lexington",
        "state": "NC",
        "zip": "27292",
        "country": "USA",
        "email": "rgiersig@yahoo.com",
        "phone": "806-427-8083",
        "creditCardLastFour": "0920",
        "cc_expiration": "10 / 22",
        "company_name": null
    }
]
```

> ## '/api/invoices/:id/invoice-taxes'

-   Takes in an invoice_id parameter in the url.
-   Returns status 200 and all taxes associated with an invoice_id in an array of tax objects.
-   Returns status 200 and an empty array if no taxes were found for that invoice_id.
-   It will return status 400 (and a json with a message property) if the invoice_id param is not an integer.

```
// sample response from this route
[
    {
        "invoice_tax_id": 1,
        "invoice_id": 1,
        "tax_name": "County Tax",
        "tax_amount": "24.40"
    },
    {
        ...
    }
]
```

> ## '/api/invoices/:id/invoice-payments'

-   Takes in an invoice_id parameter in the url.
-   Returns status 200 and all payments associated with an invoice_id in an array of payment objects.
-   Returns status 200 and an empty array if no payments were found for that invoice_id.
-   It will return status 400 (and a json with a message property) if the invoice_id param is not an integer.

```
// sample response from this route
[
    {
        "invoice_payment_id": 1,
        "invoice_id": 1,
        "payment_type": "Credit Card",
        "payment_amount": "484.25",
        "payment_ref_num": "1234"
    },
    {
        ...
    }
]
```

### **POST methods:**

> ## '/api/invoices'

-   It adds a new invoice, plus the items associated with that invoice (invoice_taxes and invoice_payments).
-   This route also does the following:
    -   Marks the res_room of the invoice as "checked_out=1".
    -   Marks the room of the res_room as "occupied=0" and "clean=0".
-   It does all of the above in the invoice model using a database transaction that sequentially queries 5 tables (**invoices, invoice_taxes, invoice_payments, res_rooms and rooms**)... with either all succeeding/committing or rolling back if any of them fail.
-   Takes in a list of parameters in the body object.
-   If successful, it returns status code 201 and an object with the insertId of the new document as the only property.
-   On this endpoint, the "insertId" will be the new invoice_id.
-   If unsuccessful, it returns status code 400 and an error object.

```
// sample request body for this route
{
    "invoiceObj": {
        "res_room_id": 1001,
        "total_due": 470.76
    },
    "invoiceTaxesArr": [
        {
            "tax_id": 1,
            "tax_amount": 22.00
        },
        {
            "tax_id": 2,
            "tax_amount": 13.20
        },
        {
            "tax_id": 3,
            "tax_amount": 30.80
        }
    ],
    "invoicePaymentsArr": [
        {
            "payment_type_id": 1,
            "payment_amount": 350.96,
            "payment_ref_num": "1234"
        },
        {
            "payment_type_id": 3,
            "payment_amount": 120.00,
            "payment_ref_num": ""
        }
    ]
}
```

### **PUT methods:**

### **DELETE methods:**

> ## '/api/invoices/:id'

-   Takes in an invoice_id parameter in the url.
-   This will permanently delete an invoice, plus any taxes and payments that were associated with that invoice through foreign key cascade on delete.
-   If successful, it returns status code 204 and nothing else.
-   If unsuccessful, it returns status code 400 and an error object.

---

---

## **/api/taxes**

### **GET methods:**

> ## '/api/taxes'

```
// sample response from this route
[
    {
	    "tax_id": 1,
        "tax_name": "County Tax",
        "tax_rate": "5.000",
        "active": 1
    },
    {
        ...
    }
]
```

> ## '/api/taxes/:id'

```
// sample response from this route
[
    {
	    "tax_id": 1,
        "tax_name": "County Tax",
        "tax_rate": "5.000",
        "active": 1
    }
]
```

### **POST methods:**

> ## '/api/taxes'

```
// sample request body for this route
{
    "tax_name": "Special Tax",
    "tax_rate": 2.625
}
```

### **PUT methods:**

> ## '/api/taxes'

```
// sample request body for this route
{
    "tax_id": 1,
    "tax_name": "County Tax",
    "tax_rate": 5.500,
    "active": 1
}
```

### **DELETE methods:**

> ## '/api/taxes/:id'

---

---

## **/api/charges**

### **GET methods:**

> ## '/api/charges'

```
// sample response from this route
[
    {
        "charge_id": 1,
        "res_room_id": 1200,
        "charge_type": "Restaurant",
        "charge_amount": "43.12",
        "taxable": 0
    },
	{
	    ...
	}
]
```

> ## '/api/charges/:id'

```
// sample response from this route
[
    {
        "charge_id": 1,
        "res_room_id": 1200,
        "charge_type": "Restaurant",
        "charge_amount": "43.12",
        "taxable": 0
    }
]
```

> ## '/api/charges/res-rooms/:id'

-   Takes in a res_room_id parameter in the url.
-   Returns all charges associated with a res_room in an array of charges objects.
-   It will return status 200 and all charges associated with a res_room in an array of charges objects.
-   It will return status 200 and an empty array if no charges were found for that res_room id.
-   It will return status 400 (and a json with a message property) if the res_room id param is not an integer.

```
// sample response from this route
[
    {
        "charge_id": 1,
        "res_room_id": 1200,
        "charge_type": "Restaurant",
        "charge_amount": "43.12",
        "taxable": 0
    },
    {
        ...
    }
]
```

### **POST methods:**

> ## '/api/charges'

```
// sample request body for this route
{
    "res_room_id": 1200,
    "charge_type_id": 3,
    "charge_amount": 43.12,
    "taxable": 1
}
```

### **PUT methods:**

> ## '/api/charges'

```
// sample request body for this route
{
    "charge_id": 1,
    "res_room_id": 1200,
    "charge_type_id": 3,
    "charge_amount": 43.12,
    "taxable": 1
}
```

### **DELETE methods:**

> ## '/api/charges/:id'

> ## '/api/charges/res-rooms/:id'

-   Takes in a res_room_id parameter in the url.
-   This will permanently delete all charges associated with a res_room.
-   If successful, it returns status code 204.
-   If unsuccessful, it returns status code 400 and an error object.

---

---

## **/api/charge-types**

### **GET methods:**

> ## '/api/charge-types'

```
[
    {
        "charge_type_id": 1,
        "charge_type": "Phone",
        "active": 1
    },
    {
        ...
    }
]
```

> ## '/api/charge-types/:id'

```
// sample response from this route
[
    {
        "charge_type_id": 3,
        "charge_type": "Room Service",
        "active": 1
    }
]
```

### **POST methods:**

> ## '/api/charge-types'

```
// sample request body for this route
{
    "charge_type": "Gift Certificate",
    "active": 1
}
```

### **PUT methods:**

> ## '/api/charge-types'

```
// sample request body for this route
{
    "charge_type_id": 1,
    "charge_type": "Phone",
    "active": 1
}
```

### **DELETE methods:**

> ## '/api/charge-types/:id'

-   Charge_types cannot be deleted if they are part of any existing charges due to MySQL foreign key constraints.

---

---

## **/api/payment-types**

### **GET methods:**

> ## '/api/payment-types'

```
// sample response from this route
[
    {
        "payment_type_id": 1,
        "payment_type": "Credit Card",
        "active": 1
    },
    {
        ...
    }
]
```

> ## '/api/payment-types/:id'

```
// sample response from this route
[
    {
        "payment_type_id": 1,
        "payment_type": "Credit Card",
        "active": 1
    }
]
```

### **POST methods:**

> ## '/api/payment-types'

```
// sample request body for this route
{
    "payment_type": "Travelers Check",
    "active": 1
}
```

### **PUT methods:**

> ## '/api/payment-types'

```
// sample request body for this route
{
    "payment_type_id": 5,
    "payment_type": "Travelers Check2",
    "active": 0
}
```

### **DELETE methods:**

> ## '/api/payment-types/:id'

-   Payment_types cannot be deleted if they are part of any existing payments due to MySQL foreign key constraints.

---

---

## **/api/companies**

### **GET methods:**

> ## '/api/companies'

```
// sample response from this route
[
    {
        "company_id": 1,
        "company_name": "Union Sand",
        "address": "234 Bank St",
        "city": "Painesville",
        "state": "Ohio",
        "zip": "44077",
        "country": "USA",
        "email": "u.sand@yahoo.net",
        "phone": "800-555-1212",
        "credit_card_num": "1234567890123456",
        "cc_expiration": "11 / 24",
        "tax_exempt": 0
    },
    {
        ...
    }
]
```

> ## '/api/companies/:id'

```
// sample response from this route
[
    {
        "company_id": 1,
        "company_name": "Union Sand",
        "address": "234 Bank St",
        "city": "Painesville",
        "state": "Ohio",
        "zip": "44077",
        "country": "USA",
        "email": "u.sand@yahoo.net",
        "phone": "800-555-1212",
        "credit_card_num": "1234567890123456",
        "cc_expiration": "11 / 24",
        "tax_exempt": 0
    }
]
```

### **POST methods:**

> ## '/api/companies'

```
// sample request body for this route
{
    "company_name": "Union Sand",
    "address": "234 Bank St",
    "city": "Painesville",
    "state": "Ohio",
    "zip": "44077",
    "country": "USA",
    "email": "u.sand@yahoo.net",
    "phone": "800-555-1212",
    "credit_card_num": "1234567890123456",
    "cc_expiration": "11 / 24",
    "tax_exempt": 0
}
```

### **PUT methods:**

> ## '/api/companies'

```
// sample request body for this route
{
    "company_id": 1,
    "company_name": "Union Sand",
    "address": "234 Bank St",
    "city": "Painesville",
    "state": "Ohio",
    "zip": "44077",
    "country": "USA",
    "email": "u.sand@yahoo.net",
    "phone": "800-555-1212",
    "credit_card_num": "1234567890123456",
    "cc_expiration": "11 / 24",
    "tax_exempt": 0
}
```

### **DELETE methods:**

> ## '/api/companies/:id'

-   Companies cannot be deleted if they are part of any existing reservations due to MySQL foreign key constraints.

---

---

## **/api/auth**

### **GET methods:**

> ## '/api/auth'

-   Takes in no parameters.
-   It outputs status code 200 and a message from the /api/auth route root.

> ## '/api/auth/logout'

-   Takes in no parameters.
-   It is used by Passport JS to log out a user.
-   It calls: **req.logout();**, then sets the req.user object to that of a guest.

### **POST methods:**

> ## '/api/auth/login'

-   It is used by Passport JS to log in a user.
-   Takes in 2 parameters in the body object (username and password).
