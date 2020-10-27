# hotel-worx-3

Complete revamp of the original hotel-worx

## How can you use this project?

1. **Clone the repo** onto your local computer:

```
git clone git@github.com:mike14747/hotel-worx-3.git
```

2. Create a **.env** file in the root folder with the following content:

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PW=<your-mysql-password>
DB_NAME=hotel_worx_3_db
SESSION_SECRET=hotelworx3rework
TEST_ADMIN_USERNAME=admin
TEST_ADMIN_PASSWORD=admin
ES_KEY=hw3
```

3. Install the **npm packages**. From the root directory, run:

```
npm install
```

4. Install the database by using the schema/seeds file (**config/hotel_worx_3_db.sql**).

## This project was created and is maintained by:

-   Sibel Baslamisli (https://github.com/sialbul)
-   Mike Gullo (https://github.com/mike14747)
-   This project's github repo: https://github.com/mike14747/hotel-worx-3
