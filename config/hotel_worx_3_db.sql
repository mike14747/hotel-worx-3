DROP DATABASE IF EXISTS hotel_worx_3_db;
CREATE DATABASE hotel_worx_3_db;
USE hotel_worx_3_db;

set foreign_key_checks=0;

-- --------------------------------------------------------

CREATE TABLE users (
    user_id int(6) NOT NULL AUTO_INCREMENT,
    username varchar(20) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    access_id int(3) NOT NULL,
    FOREIGN KEY (access_id) REFERENCES access_levels(access_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    active boolean DEFAULT 1,
    PRIMARY KEY (user_id)
);

-- --------------------------------------------------------

CREATE TABLE access_levels (
    access_id int(3) NOT NULL AUTO_INCREMENT,
    type varchar(30) NOT NULL,
    PRIMARY KEY (access_id)
);

-- --------------------------------------------------------

CREATE TABLE rooms (
    room_id int(6) NOT NULL AUTO_INCREMENT,
    room_num varchar(20) NOT NULL UNIQUE,
    room_type_id int(3) NOT NULL,
    FOREIGN KEY (room_type_id) REFERENCES room_types(room_type_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    description varchar(255) NOT NULL,
    num_beds int(3) NOT NULL,
    clean boolean DEFAULT 0,
    occupied boolean DEFAULT 0,
    active boolean DEFAULT 1,
    PRIMARY KEY (room_id)
);

-- --------------------------------------------------------

CREATE TABLE room_types (
    room_type_id int(3) NOT NULL AUTO_INCREMENT,
    type varchar(30) NOT NULL,
    rate decimal(5,2) NOT NULL,
    PRIMARY KEY (room_type_id)
);

-- --------------------------------------------------------

CREATE TABLE customers (
    customer_id int(6) NOT NULL AUTO_INCREMENT,
    first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    address varchar(50) NOT NULL,
    city varchar(50) NOT NULL,
    state varchar(30) NOT NULL,
    zip varchar(20) NOT NULL,
    email varchar(50) NOT NULL,
    phone varchar(20) NOT NULL,
    credit_card_num varchar(30) NOT NULL,
    cc_expiration varchar(10) NOT NULL,
    PRIMARY KEY (customer_id)
);

-- --------------------------------------------------------

CREATE TABLE reservations (
    reservation_id int(10) NOT NULL AUTO_INCREMENT,
    customer_id int(6) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    user_id int(6) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    comments varchar(255) NOT NULL,
    active boolean DEFAULT 1,
    PRIMARY KEY (reservation_id)
);

-- --------------------------------------------------------

CREATE TABLE res_rooms (
    res_room_id int(10) NOT NULL AUTO_INCREMENT,
    reservation_id int(10) NOT NULL,
    FOREIGN KEY (reservation_id) REFERENCES reservations(reservation_id) ON DELETE CASCADE ON UPDATE CASCADE,
    room_type_id int(6) NOT NULL,
    FOREIGN KEY (room_type_id) REFERENCES room_types(room_type_id) ON DELETE NO ACTION ON UPDATE CASCADE,
    check_in_date date NOT NULL,
    check_out_date date NOT NULL,
    checked_in boolean DEFAULT 0,
    checked_out boolean DEFAULT 0,
    adults int(3) NOT NULL,
    room_id int(6) NULL,
    FOREIGN KEY (room_id) REFERENCES rooms(room_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    rate decimal(5,2) NULL,
    confirmation_code varchar(20) NULL,
    comments varchar(255) NOT NULL,
    active boolean DEFAULT 1,
    PRIMARY KEY (res_room_id)
);

-- --------------------------------------------------------

CREATE TABLE taxes (
    tax_id int(3) NOT NULL AUTO_INCREMENT,
    tax_name varchar(30) NOT NULL,
    tax_rate decimal(4,3) DEFAULT 0,
    active boolean DEFAULT 1,
    PRIMARY KEY (tax_id)
);

-- --------------------------------------------------------

CREATE TABLE charge_types (
    charge_types int(3) NOT NULL AUTO_INCREMENT,
    charge_name varchar(30) NOT NULL,
    active boolean DEFAULT 1,
    PRIMARY KEY (charge_id)
);

-- --------------------------------------------------------

CREATE TABLE payment_types (
    payment__type_id int(3) NOT NULL AUTO_INCREMENT,
    payment_name varchar(30) NOT NULL,
    active boolean DEFAULT 1,
    PRIMARY KEY (payment_id)
);

-- --------------------------------------------------------

CREATE TABLE invoices (
    invoice_id int(10) NOT NULL AUTO_INCREMENT,
    res_room_id int(10) NOT NULL,
    FOREIGN KEY (res_room_id) REFERENCES res_rooms(res_room_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    reservation_id int(10) NOT NULL,
    FOREIGN KEY (reservation_id) REFERENCES reservations(reservation_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    num_nights int(3) NOT NULL,
    rate decimal(5,2) NOT NULL,
    total_due decimal(10,2) DEFAULT 0,
    created_at datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (invoice_id)
);

-- --------------------------------------------------------

CREATE TABLE invoice_taxes (
    invoice_tax_id int(10) NOT NULL AUTO_INCREMENT,
    invoice_id int(10) NOT NULL,
    FOREIGN KEY (invoice_id) REFERENCES invoices(invoice_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    tax_name varchar(30) NOT NULL,
    tax_amount decimal(5,2) DEFAULT 0,
    PRIMARY KEY (invoice_tax_id)
);

-- --------------------------------------------------------

CREATE TABLE invoice_charges (
    invoice_charge_id int(10) NOT NULL AUTO_INCREMENT,
    invoice_id int(10) NOT NULL,
    FOREIGN KEY (invoice_id) REFERENCES invoices(invoice_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    charge_name varchar(30) NOT NULL,
    charge_amount decimal(5,2) DEFAULT 0,
    PRIMARY KEY (invoice_charge_id)
);

-- --------------------------------------------------------

CREATE TABLE invoice_payments (
    invoice_payment_id int(10) NOT NULL AUTO_INCREMENT,
    invoice_id int(10) NOT NULL,
    FOREIGN KEY (invoice_id) REFERENCES invoices(invoice_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    payment_name varchar(30) NOT NULL,
    payment_amount decimal(5,2) DEFAULT 0,
    payment_ref_num varchar(30) NULL,
    PRIMARY KEY (invoice_payment_id)
);

-- --------------------------------------------------------

CREATE TABLE hotel_info (
    hotel_info_id int(6) NOT NULL AUTO_INCREMENT,
    hotel_name varchar(30) NOT NULL,
    address varchar(50) NOT NULL,
    city varchar(50) NOT NULL,
    state varchar(30) NOT NULL,
    zip varchar(20) NOT NULL,
    email varchar(50) NOT NULL,
    phone varchar(20) NOT NULL,
    image_url varchar(60) NOT NULL,
    active boolean DEFAULT 1,
    PRIMARY KEY (hotel_info_id)
);

-- --------------------------------------------------------

CREATE TABLE sessions (
    session_id varchar(128) COLLATE utf8mb4_bin NOT NULL,
    expires int(11) unsigned NOT NULL,
    data mediumtext COLLATE utf8mb4_bin,
    PRIMARY KEY (session_id)
);

-- --------------------------------------------------------

CREATE TABLE room_issues (
    room_issue_id int(10) NOT NULL AUTO_INCREMENT,
    room_id int(6) NOT NULL,
    FOREIGN KEY (room_id) REFERENCES rooms(room_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    issue text NOT NULL,
    user_id int(6) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    start_date date NOT NULL,
    end_date date NOT NULL,
    fixed boolean DEFAULT 0,
    PRIMARY KEY (room_issue_id)
);

-- --------------------------------------------------------

--
-- Seed data for users
--

TRUNCATE TABLE users;

INSERT INTO users (username, password, access_id) VALUES
('admin', '$2b$10$Qf/0VNBQiYr.pHN8IN9Yl.SrYQCpG4b2mrsX6dx85DkE7/fwsNWvy', 3),
('manager', '$2b$10$2ataQ4kjDbZaR9TDSUqXI.Mt.Gq/bDn1Te3MN939s3fJAtTrKJa9i', 2),
('user', '$2b$10$rnUz2cFk61G27KdixeR5G.rf78zaKzDZlebrs9ZK5tnnVGFWrnUPm', 1);

 -- pw admin
 -- pw 123456
 -- pw 654321
 -- pw 123123

-- --------------------------------------------------------

--
-- Seed data for access_levels
--

TRUNCATE TABLE access_levels;

INSERT INTO access_levels (access_id, type) VALUES
(1, 'Employee'),
(2, 'Manager'),
(3, 'Administrator');

-- --------------------------------------------------------

--
-- Seed data for customers
--

TRUNCATE TABLE customers;

INSERT INTO customers (customer_id, first_name, last_name, address, city, state, zip, email, phone, credit_card_num, cc_expiration) VALUES
(1, 'Jamar', 'Wilkerson', '7193 Valley St', 'Lexington', 'NC', '27292', 'rgiersig@yahoo.com', '806-427-8083', '4532860057700920', '10 / 22'),
(2, 'Tatum', 'Guerrero', '255 South Acacia Lane', 'Tupelo', 'MS', '38801', 'neuffer@aol.com', '828-904-7535', '5201787827319417', '07 / 21'),
(3, 'Dillon', 'Espinoza', '940 Wakehurst Circle', 'Reidsville', 'NC', '27320', 'zavadsky@me.com', '247-992-9396', '4532126743033195', '07 / 21'),
(4, 'Dania', 'Bonilla', '98 Schoolhouse Street', 'Mahwah', 'NJ', '07430', 'frikazoyd@comcast.net', '482-508-5700', '5437458666794161', '10 / 21'),
(5, 'Alondra', 'Sanford', '26 Oakwood Court', 'Coachella', 'CA', '92236', 'bdthomas@gmail.com', '792-816-0942', '5372340794008150', '06 / 21'),
(6, 'Alden', 'Weeks', '9991 Princess Road', 'Burke', 'VA', '22015', 'ylchang@comcast.net', '727-471-0334', '4556096080902081', '02 / 23'),
(7, 'Noelle', 'Shaffer', '8863 Homestead Rd', 'Pittsburgh', 'PA', '15206', 'uncled@yahoo.com', '587-315-4887', '5416440139855907', '12 / 22'),
(8, 'Aspen', 'Forbes', '8521 Glenholme St', 'Avon', 'IN', '46123', 'dsugal@me.com', '333-486-1488', '4024007108268276', '10 / 22'),
(9, 'Gael', 'Holt', '926 Roberts Ave', 'Tiffin', 'OH', '44883', 'jfmulder@yahoo.ca', '968-950-0566', '5256249010220351', '02 / 23'),
(10, 'Amina', 'Whitaker', '9961 East Honey Creek Drive', 'West Bloomfield', 'MI', '48322', 'ullman@gmail.com', '662-691-0234', '4485894726287503', '12 / 22'),
(11, 'Addison', 'Oliver', '670 James Lane', 'Palm Beach Gardens', 'FL', '33410', 'syncnine@yahoo.ca', '960-602-1401', '4916097498862490', '08 / 22'),
(12, 'Dylan', 'Cochran', '63 Shadow Brook Ave', 'Forest Hills', 'NY', '11375', 'bbirth@comcast.net', '650-450-4673', '5533534756498856', '07 / 21'),
(13, 'Justice', 'Pruitt', '775 Jackson Dr', 'Miami', 'FL', '33125', 'cameron@icloud.com', '939-786-0529', '5432237236867318', '12 / 22'),
(14, 'Deanna', 'Randolph', '9943 8th Court', 'Encino', 'CA', '91316', 'jaesenj@att.net', '876-859-1297', '5352119825297147', '03 / 20'),
(15, 'Athena', 'Santos', '7 Oakland Lane', 'New Lenox', 'IL', '60451', 'jaxweb@yahoo.com', '914-996-3936', '5106922433471049', '05 / 23'),
(16, 'Sanai', 'Reid', '9 Stillwater Street', 'Cordova', 'TN', '38016', 'adamk@optonline.net', '911-237-5265', '4916556997009788', '01 / 20'),
(17, 'Lilyana', 'Holmes', '750 Clinton Court', 'Winona', 'MN', '55987', 'forsberg@gmail.com', '708-951-1380', '5496169220227030', '10 / 22'),
(18, 'Nolan', 'Cantrell', '9217 Elmwood St', 'Bluffton', 'SC', '29910', 'bflong@yahoo.ca', '865-324-9180', '5261912435156731', '10 / 21'),
(19, 'Jayleen', 'Clark', '64 Hillside Street', 'Raeford', 'NC', '28376', 'mcsporran@verizon.net', '661-609-3680', '5319542457938773', '10 / 22'),
(20, 'Javion', 'George', '510 Randall Mill St', 'Bedford', 'OH', '44146', 'raides@verizon.net', '709-669-4252', '5486618793020141', '05 / 23'),
(21, 'Cadence', 'Mayo', '99 Rock Creek St', 'New Port Richey', 'FL', '34653', 'sinkou@hotmail.com', '616-599-7197', '5577246653852682', '03 / 22'),
(22, 'Sasha', 'Cooper', '23 Selby Street', 'Chesterfield', 'VA', '23832', 'flakeg@att.net', '760-533-4007', '4532877846928448', '07 / 21'),
(23, 'Saniyah', 'Jacobson', '67 Arch Ave', 'Griffin', 'GA', '30223', 'papathan@yahoo.com', '936-222-8116', '5228961842009571', '10 / 21'),
(24, 'Zack', 'Turner', '7259 Queen St', 'Lawrence', 'MA', '01841', 'loscar@msn.com', '910-518-3593', '4532244442010974', '05 / 22'),
(25, 'Zane', 'Rush', '8741 N 53rd Dr', 'Johnston', 'RI', '02919', 'elflord@att.net', '700-655-5860', '4485368559376089', '11 / 20'),
(26, 'Megan', 'Matthews', '857 Lake Forest Drive', 'Marlton', 'NJ', '08053', 'parasite@sbcglobal.net', '310-404-8867', '4485478804077232', '06 / 21'),
(27, 'Jamari', 'Duffy', '901 Purple Finch St', 'North Olmsted', 'OH', '44070', 'steve@icloud.com', '342-273-8703', '4716622530248465', '04 / 20'),
(28, 'Jorden', 'Mejia', '94 Johnson Ave', 'Upper Darby', 'PA', '19082', 'isaacson@aol.com', '520-271-9924', '5479300783928265', '10 / 22'),
(29, 'Remington', 'Wilson', '7486 E Linden Lane', 'Gwynn Oak', 'MD', '21207', 'papathan@msn.com', '986-555-6036', '4504618028078444', '10 / 23'),
(30, 'Jaime', 'Conley', '175 Victoria Dr', 'Powhatan', 'VA', '23139', 'dkeeler@outlook.com', '828-416-1195', '4485900434168529', '08 / 22'),
(31, 'Adyson', 'Rosario', '403 Highland Street', 'Rome', 'NY', '13440', 'mbalazin@aol.com', '399-620-0096', '5434776227170446', '11 / 20'),
(32, 'Alexis', 'Owen', '56 Canal Road', 'Suffolk', 'VA', '23434', 'munson@yahoo.ca', '468-405-3074', '4716528981715151', '10 / 21'),
(33, 'Isabella', 'Norris', '404 Grand Street', 'Ridgecrest', 'CA', '93555', 'oster@comcast.net', '800-257-6419', '4929374741493141', '07 / 23'),
(34, 'Dallas', 'Hanson', '8548 Coffee Drive', 'Collegeville', 'PA', '19426', 'denism@hotmail.com', '456-885-6495', '5157646255393498', '05 / 20'),
(35, 'Laci', 'Figueroa', '8254 Amerige St', 'Murfreesboro', 'TN', '37128', 'shazow@yahoo.ca', '431-402-7023', '5431364554333565', '01 / 20'),
(36, 'Talan', 'Bolton', '964 Southampton Street', 'Holly Springs', 'NC', '27540', 'thowell@outlook.com', '952-234-8973', '5353062098067970', '04 / 20'),
(37, 'Keegan', 'Oneal', '43 Lower River St', 'Arvada', 'CO', '80003', 'eegsa@yahoo.ca', '659-415-3573', '5150118173365104', '05 / 20'),
(38, 'Yareli', 'Wilcox', '401 N Shub Farm Ave', 'Cantonment', 'FL', '32533', 'mastinfo@optonline.net', '459-390-4906', '4485026104820635', '11 / 20'),
(39, 'Malia', 'Moon', '3 Halifax Street', 'Fresh Meadows', 'NY', '11365', 'rsteiner@yahoo.ca', '347-294-2041', '4048264749657365', '07 / 23'),
(40, 'Lauryn', 'Baxter', '64 Pennington St', 'Bensalem', 'PA', '19020', 'knorr@aol.com', '233-378-6219', '4539995497010382', '07 / 23'),
(41, 'Jaidyn', 'Monroe', '77 Cedar Swamp Dr', 'Detroit', 'MI', '48205', 'mcmillan@icloud.com', '814-431-5867', '5418378286552109', '11 / 23'),
(42, 'Hailie', 'Fritz', '7496 Rosewood Avenue', 'Basking Ridge', 'NJ', '07920', 'mosses@att.net', '825-338-1072', '5270923683622703', '03 / 20'),
(43, 'Anastasia', 'Murillo', '3 Saxon Ave', 'Bowling Green', 'KY', '42101', 'amaranth@outlook.com', '814-458-0264', '5527776687798361', '07 / 23'),
(44, 'Henry', 'Greene', '1 Olive St', 'Norristown', 'PA', '19401', 'bockelboy@yahoo.com', '631-317-3252', '5110745756989394', '03 / 22'),
(45, 'Alisa', 'Melton', '9981 Valley View Street', 'Reading', 'MA', '01867', 'brickbat@hotmail.com', '625-935-1250', '4539091236734878', '04 / 20'),
(46, 'Frankie', 'Schmitt', '8727 George Ave', 'Gaithersburg', 'MD', '20877', 'themer@live.com', '412-513-6786', '4024007143754140', '05 / 20'),
(47, 'Will', 'Ramirez', '22 Glen Ridge Street', 'Arlington', 'MA', '02474', 'birddog@optonline.net', '925-620-6861', '5321011925356709', '11 / 23'),
(48, 'Hayley', 'Wolfe', '265 Tower Street', 'Hempstead', 'NY', '11550', 'valdez@hotmail.com', '266-629-5060', '4532762805347758', '01 / 20'),
(49, 'Chad', 'Cooley', '9501 Campfire Ave', 'Charlotte', 'NC', '28205', 'gator@sbcglobal.net', '561-670-6581', '5351188439820868', '11 / 20'),
(50, 'Chasity', 'Brennan', '18 Longfellow Ave', 'Union City', 'NJ', '07087', 'tkrotchko@me.com', '322-916-7918', '4485822151690164', '06 / 20'),
(51, 'Kendall', 'Meyer', '482 W Silver Spear St', 'Natchez', 'MS', '39120', 'plover@live.com', '900-285-7237', '5167538111949522', '10 / 23'),
(52, 'Lucy', 'Navarro', '641 Hill Lane', 'Monroeville', 'PA', '15146', 'sisyphus@aol.com', '479-222-2795', '4929028594282916', '06 / 20'),
(53, 'Rayna', 'Marshall', '7254 James St', 'Cuyahoga Falls', 'OH', '44221', 'matty@att.net', '514-677-5805', '4532769426349899', '12 / 22'),
(54, 'Sanai', 'Gray', '729 Sherman Avenue', 'Miamisburg', 'OH', '45342', 'balchen@hotmail.com', '933-275-5030', '5324721375635793', '11 / 23'),
(55, 'Valentina', 'Hogan', '265 N Valley View Ave', 'Panama City', 'FL', '32404', 'jgmyers@outlook.com', '510-813-1783', '5573329803086494', '01 / 20'),
(56, 'Moshe', 'Powers', '7763 W Strawberry Drive', 'Eau Claire', 'WI', '54701', 'gfody@aol.com', '212-220-2744', '4539750761674144', '05 / 20'),
(57, 'Annie', 'Frederick', '8677 Honey Creek St', 'Wilmette', 'IL', '60091', 'houle@me.com', '739-511-7408', '5392993257139742', '11 / 23'),
(58, 'Alvin', 'Bradley', '9793 Mulberry Road', 'Macomb', 'MI', '48042', 'nwiger@sbcglobal.net', '743-392-3756', '4532817301393993', '11 / 20'),
(59, 'Kaya', 'Mays', '389 Water Lane', 'Horn Lake', 'MS', '38637', 'grossman@outlook.com', '748-219-7266', '4929202104533809', '11 / 23'),
(60, 'Rashad', 'House', '7178 Mill St', 'Mount Vernon', 'NY', '10550', 'kwilliams@gmail.com', '267-905-9863', '5334940369564169', '10 / 22'),
(61, 'Brogan', 'Newman', '216 Glen Creek Ave', 'Spartanburg', 'SC', '29301', 'yzheng@mac.com', '489-834-8509', '5452711376611723', '11 / 23'),
(62, 'Paris', 'Roberson', '9018 Madison Ave', 'Pomona', 'CA', '91768', 'rhialto@yahoo.ca', '918-973-0112', '4916627028682180', '11 / 20'),
(63, 'Jessie', 'Ward', '515 Old 2nd St', 'Goldsboro', 'NC', '27530', 'seano@verizon.net', '957-327-2664', '5577454061180460', '01 / 20'),
(64, 'Zane', 'Kaiser', '8789 S Nichols St', 'Calumet City', 'IL', '60409', 'nasor@me.com', '976-971-5906', '4929845305180869', '07 / 23'),
(65, 'Joanna', 'Patton', '7565 Newport Rd', 'Ottawa', 'IL', '61350', 'penna@optonline.net', '812-281-7607', '5408207780168793', '10 / 22'),
(66, 'Zain', 'Fletcher', '489 Railroad St', 'Watertown', 'MA', '02472', 'jrkorson@mac.com', '423-292-8323', '5526925594296172', '10 / 22'),
(67, 'Harper', 'Davenport', '461 Creek St', 'Pueblo', 'CO', '81001', 'mccurley@outlook.com', '903-938-1934', '4539037397187588', '06 / 20'),
(68, 'Alexandria', 'Green', '8534 Iroquois Street', 'Oviedo', 'FL', '32765', 'dartlife@verizon.net', '740-270-4391', '4485947141014272', '12 / 22'),
(69, 'Christopher', 'Mcmillan', '12 NW Kent St', 'Oxford', 'MS', '38655', 'gommix@me.com', '440-641-0693', '5555235794691758', '01 / 20'),
(70, 'Adriana', 'Compton', '26 South Dogwood Ave', 'Dunedin', 'FL', '34698', 'adhere@sbcglobal.net', '611-376-7210', '5255760485826697', '11 / 23'),
(71, 'Adrienne', 'Marquez', '8537 East Hall Lane', 'Elk River', 'MN', '55330', 'phish@hotmail.com', '459-210-4092', '4716208891266864', '03 / 22'),
(72, 'Cordell', 'Mosley', '8819 Summerhouse St', 'Snellville', 'GA', '30039', 'afeldspar@comcast.net', '549-403-8376', '4532228352412767', '10 / 22'),
(73, 'Derrick', 'Keller', '556 Bay Meadows Ave', 'Gibsonia', 'PA', '15044', 'crusader@outlook.com', '569-795-8637', '5554898631398159', '03 / 22'),
(74, 'Darian', 'Adams', '9 Joy Ridge DR', 'Newton', 'NJ', '07860', 'parents@verizon.net', '725-512-1058', '4929694035882059', '06 / 21'),
(75, 'Simon', 'Macdonald', '8505 South Cross Ave', 'Parkville', 'MD', '21234', 'marioph@me.com', '393-915-4676', '4485265379414316', '06 / 20'),
(76, 'James', 'Jefferson', '7783 8th St', 'Richmond', 'VA', '23223', 'dhwon@live.com', '675-316-9651', '4916815065813574', '02 / 23'),
(77, 'Justin', 'Berry', '9896 William Dr', 'Hephzibah', 'GA', '30815', 'jespley@icloud.com', '713-350-0017', '4532672280619268', '10 / 23'),
(78, 'Joanna', 'Vance', '9115 Academy Ave', 'Hopkinsville', 'KY', '42240', 'parksh@yahoo.ca', '983-793-5543', '4485294475146663', '04 / 20'),
(79, 'Corinne', 'Schneider', '8 North John Ave', 'Camden', 'NJ', '08105', 'dgriffith@gmail.com', '828-733-3793', '4929097663986954', '06 / 21'),
(80, 'Alonzo', 'Kim', '9882 Greystone St', 'Tualatin', 'OR', '97062', 'smallpaul@verizon.net', '287-346-5598', '4532084686016604', '02 / 23'),
(81, 'Maeve', 'Wolf', '17 Gulf Avenue', 'Deer Park', 'NY', '11729', 'cameron@me.com', '813-997-5505', '5240964731122053', '11 / 20'),
(82, 'Kayden', 'Brennan', '9678 East Second St', 'Lacey', 'WA', '98503', 'jaxweb@msn.com', '581-490-2910', '4850372941947539', '10 / 23'),
(83, 'Brianna', 'Ochoa', '8594 W Primrose Dr', 'Bethel Park', 'PA', '15102', 'inico@sbcglobal.net', '207-253-6039', '5506969027947633', '11 / 20'),
(84, 'John', 'Chapman', '21 Laurel St', 'Osseo', 'MN', '55311', 'nogin@optonline.net', '975-251-7418', '5195762654266666', '05 / 22'),
(85, 'Jayden', 'Haas', '9 Acacia Ave', 'Lagrange', 'GA', '30240', 'birddog@outlook.com', '661-348-3687', '4716114579060795', '03 / 20'),
(86, 'Lila', 'Bean', '181 Rockledge St', 'Grosse Pointe', 'MI', '48236', 'malin@verizon.net', '381-291-3227', '5543667310511307', '05 / 23'),
(87, 'Dereon', 'Christensen', '686 Brewery Road', 'Piqua', 'OH', '45356', 'gmcgath@aol.com', '449-334-0030', '5126400313958621', '01 / 20'),
(88, 'Evie', 'Vasquez', '931 Vale St', 'Casselberry', 'FL', '32707', 'themer@att.net', '761-462-4362', '4532409028483016', '02 / 23'),
(89, 'Chris', 'Robinson', '7904 Buttonwood St', 'Rolling Meadows', 'IL', '60008', 'jshearer@att.net', '740-317-1565', '4837504133359374', '11 / 23'),
(90, 'Marina', 'Lynch', '220 Annadale St', 'Dundalk', 'MD', '21222', 'maradine@live.com', '375-955-4770', '5389457265176539', '05 / 23'),
(91, 'Angelique', 'Orr', '33 Wall Drive', 'Laurel', 'MD', '20707', 'wayward@att.net', '920-847-3144', '4916252948545241', '10 / 21'),
(92, 'Jadyn', 'Duke', '7 Central Street', 'East Stroudsburg', 'PA', '18301', 'wortmanj@outlook.com', '504-769-8542', '5377049754048768', '03 / 22'),
(93, 'Ashly', 'Mays', '526 Mechanic Street', 'Glen Allen', 'VA', '23059', 'chaikin@optonline.net', '690-252-2019', '4532822204827774', '04 / 20'),
(94, 'Travis', 'Hale', '284 Bellevue Rd', 'Palm Bay', 'FL', '32907', 'fallorn@yahoo.ca', '381-479-7780', '4556611534232339', '05 / 23'),
(95, 'Clara', 'Moses', '8794 North George Court', 'Catonsville', 'MD', '21228', 'ehood@hotmail.com', '896-810-2805', '5380917988326504', '10 / 21'),
(96, 'Bethany', 'English', '884 Pennsylvania Dr', 'Klamath Falls', 'OR', '97603', 'delpino@sbcglobal.net', '247-914-8204', '5164322742909046', '05 / 23'),
(97, 'Justice', 'Ayers', '7863 Glen Eagles Ave', 'Chicago', 'IL', '60621', 'noneme@aol.com', '954-604-7142', '5364548004224108', '08 / 22'),
(98, 'Greta', 'Miles', '126 Maple Drive', 'Dearborn Heights', 'MI', '48127', 'mjewell@yahoo.com', '466-469-8266', '5580368783843046', '01 / 20'),
(99, 'Mohammad', 'Pena', '750 Pin Oak Drive', 'Morgantown', 'WV', '26508', 'chrisk@yahoo.com', '622-797-2357', '4024007151558672', '07 / 23'),
(100, 'Jayden', 'Pope', '8785 Clinton Street', 'Woodbridge', 'VA', '22191', 'naupa@comcast.net', '378-231-7607', '4119845682261050', '02 / 23'),
(101, 'Melissa', 'Simmons', '9988 Hilltop Street', 'Wheeling', 'WV', '26003', 'kevinm@sbcglobal.net', '563-507-9591', '4341415328489166', '05 / 22'),
(102, 'Bryan', 'Burgess', '9143 Pine Circle', 'Englewood', 'NJ', '07631', 'sacraver@optonline.net', '436-912-8635', '4929935195303158', '07 / 23'),
(103, 'Weston', 'Holden', '550 Wentworth Dr', 'Crawfordsville', 'IN', '47933', 'morain@msn.com', '556-303-4802', '4916467741746388', '10 / 23'),
(104, 'Ainsley', 'Spence', '184 Santa Clara Avenue', 'Clinton', 'MD', '20735', 'oevans@optonline.net', '813-522-4409', '4539491527254489', '01 / 20'),
(105, 'Adam', 'Cox', '74 Shirley Rd', 'Ozone Park', 'NY', '11417', 'fwiles@live.com', '482-795-7224', '5461868642061346', '03 / 20'),
(106, 'Kayleigh', 'Hardy', '348 Ramblewood St', 'Norwalk', 'CT', '06851', 'geeber@optonline.net', '330-564-2716', '4916123701238458', '01 / 20'),
(107, 'Braden', 'Eaton', '96 Mountainview Ave', 'South Plainfield', 'NJ', '07080', 'adillon@me.com', '910-518-2569', '4024007171111148', '11 / 23'),
(108, 'Viviana', 'Perry', '96 Indian Summer Court', 'Greensburg', 'PA', '15601', 'agolomsh@att.net', '538-529-3270', '4024007182021559', '11 / 23'),
(109, 'Wendy', 'Kline', '7843 W William Ave', 'Torrington', 'CT', '06790', 'gward@live.com', '719-452-3133', '5580915250021637', '05 / 20'),
(110, 'Keenan', 'Bradford', '853 Ohio Lane', 'Vincentown', 'NJ', '08088', 'jkegl@verizon.net', '532-224-2358', '5552949290364768', '11 / 23'),
(111, 'Maritza', 'Mccarthy', '832 North Lake Forest Ave', 'Yorktown Heights', 'NY', '10598', 'wikinerd@optonline.net', '656-463-2920', '5446404861717531', '02 / 23'),
(112, 'Sophie', 'Henry', '77 S Fawn Street', 'The Villages', 'FL', '32162', 'chrisj@yahoo.com', '775-581-4083', '4532022596572308', '03 / 20'),
(113, 'James', 'Odonnell', '424 Lookout Street', 'Lansing', 'MI', '48910', 'staikos@yahoo.ca', '307-417-3397', '5270301992784326', '01 / 20'),
(114, 'Elisa', 'Cantrell', '82 4th Dr', 'Bayonne', 'NJ', '07002', 'stakasa@yahoo.com', '958-282-5834', '4532312529085498', '06 / 21'),
(115, 'Braylon', 'Mendoza', '38 Jockey Hollow Street', 'Sarasota', 'FL', '34231', 'leviathan@outlook.com', '835-758-3684', '5289099222984281', '10 / 23'),
(116, 'Julius', 'Bond', '8865 South Rockledge St', 'Montclair', 'NJ', '07042', 'kenja@att.net', '784-381-9622', '4532202390903962', '10 / 22'),
(117, 'Christian', 'Sheppard', '199 North Bridle Lane', 'Florence', 'SC', '29501', 'hermes@mac.com', '464-226-2761', '4929437880350487', '06 / 20'),
(118, 'Leon', 'Rose', '18 Williams St', 'Freeport', 'NY', '11520', 'vmalik@me.com', '629-614-3230', '4532831107214626', '07 / 21'),
(119, 'Julio', 'Pollard', '7162 Clay Lane', 'Newark', 'NJ', '07103', 'hutton@att.net', '319-483-3927', '4556897240877406', '12 / 22'),
(120, 'Parker', 'Church', '232 Bradford Road', 'Strongsville', 'OH', '44136', 'lauronen@sbcglobal.net', '491-884-5142', '4485140093353969', '05 / 22'),
(121, 'Julia', 'Ballard', '23 Branch St', 'Mount Prospect', 'IL', '60056', 'keiji@yahoo.com', '814-207-0175', '5411594498309396', '06 / 21'),
(122, 'Molly', 'Waller', '177 Richardson Dr', 'Southfield', 'MI', '48076', 'satch@live.com', '739-965-6824', '4929867978588939', '11 / 23'),
(123, 'Natasha', 'Small', '8175 Miller Street', 'New Britain', 'CT', '06051', 'liedra@live.com', '794-461-9929', '5132287304024048', '01 / 20'),
(124, 'Fisher', 'Kline', '7778 Mayflower St', 'Ames', 'IA', '50010', 'donev@optonline.net', '598-929-3796', '4024007149208059', '08 / 22'),
(125, 'Maggie', 'Mccarthy', '322 Manchester Street', 'Saint Paul', 'MN', '55104', 'fudrucker@yahoo.ca', '796-719-6501', '4556444115174047', '11 / 23'),
(126, 'Justus', 'Clayton', '7357 South Poplar St', 'Mason', 'OH', '45040', 'msroth@hotmail.com', '701-735-1336', '4916829707958895', '06 / 21'),
(127, 'Sammy', 'King', '457 Magnolia Ave', 'Oakland Gardens', 'NY', '11364', 'dalamb@live.com', '238-389-3800', '4532492770040655', '07 / 21'),
(128, 'Zayne', 'Robles', '406 South Elmwood St', 'Valdosta', 'GA', '31601', 'gozer@hotmail.com', '401-673-6733', '5321145993366180', '04 / 20'),
(129, 'Alfonso', 'Christensen', '578 Joy Ridge Road', 'Jamaica Plain', 'MA', '02130', 'burns@comcast.net', '705-239-6647', '5122911294694898', '07 / 23'),
(130, 'Prince', 'Rivas', '542 Goldfield Drive', 'Seattle', 'WA', '98144', 'singh@optonline.net', '662-547-7098', '5324038470601087', '03 / 22'),
(131, 'Reginald', 'Humphrey', '851 Corona St', 'Superior', 'WI', '54880', 'kmiller@icloud.com', '950-654-8629', '5487218902697209', '07 / 21'),
(132, 'Elyse', 'Williamson', '88 Fawn Court', 'Williamsport', 'PA', '17701', 'goresky@me.com', '908-298-7526', '5590549041546780', '01 / 20'),
(133, 'George', 'Joyce', '7940 Rockville Drive', 'Berwyn', 'IL', '60402', 'fglock@comcast.net', '483-910-7929', '4916759699234825', '02 / 23'),
(134, 'Gauge', 'Daugherty', '79 Bridle Street', 'Linden', 'NJ', '07036', 'skoch@mac.com', '828-228-5616', '4916506626954516', '11 / 23'),
(135, 'Oliver', 'Berg', '7 Coffee Drive', 'Chesapeake', 'VA', '23320', 'fwitness@gmail.com', '638-986-9853', '5339594494440822', '03 / 20'),
(136, 'Kian', 'Shields', '8225 Arnold Lane', 'Middleton', 'WI', '53562', 'pakaste@live.com', '463-600-4566', '4086582763485949', '10 / 21'),
(137, 'Alisson', 'Hutchinson', '740 N Princess Ave', 'Beachwood', 'OH', '44122', 'mhassel@verizon.net', '406-822-2849', '4485747603476948', '07 / 21'),
(138, 'Lilly', 'Conway', '82 Green Hill Ave', 'Fullerton', 'CA', '92831', 'tmaek@comcast.net', '367-340-5495', '4556916647409504', '04 / 20'),
(139, 'Marina', 'Hutchinson', '7727 Brewery St', 'Middle River', 'MD', '21220', 'sokol@yahoo.ca', '522-273-0035', '5540775069609355', '10 / 23'),
(140, 'Joe', 'Farrell', '12 Illinois Street', 'Hazleton', 'PA', '18201', 'ganter@comcast.net', '624-574-4780', '5583668987093851', '05 / 23'),
(141, 'Adyson', 'Chandler', '7483 Young Rd Suite 50', 'North Andover', 'MA', '01845', 'seebs@sbcglobal.net', '759-767-7507', '4024007105301104', '05 / 22'),
(142, 'Hana', 'Waller', '378 Glenlake Lane', 'Summerfield', 'FL', '34491', 'rgiersig@aol.com', '479-802-2162', '5598093084233719', '06 / 20'),
(143, 'John', 'Medina', '135 Harrison Ave', 'Thornton', 'CO', '80241', 'mgemmons@live.com', '338-591-0502', '5324278188153654', '12 / 22'),
(144, 'Charity', 'Carr', '77 Roehampton Dr', 'Beltsville', 'MD', '20705', 'benits@me.com', '522-432-0614', '5264888498491560', '10 / 22'),
(145, 'Paisley', 'Long', '7 County St', 'Lake Zurich', 'IL', '60047', 'hllam@yahoo.com', '903-951-2837', '5553695117116803', '01 / 20'),
(146, 'Justice', 'Levine', '53 Arlington Street', 'Biloxi', 'MS', '39532', 'emmanuel@att.net', '610-962-2072', '4539209693371675', '10 / 22'),
(147, 'Bentley', 'Dougherty', '631 Clark Ave', 'Memphis', 'TN', '38106', 'sriha@optonline.net', '801-800-1435', '5163514789002526', '01 / 20'),
(148, 'Annabelle', 'Potts', '1 Old Lawrence St', 'Stratford', 'CT', '06614', 'euice@aol.com', '442-645-7330', '4532995401159280', '01 / 20'),
(149, 'Clark', 'Faulkner', '7374 Livingston St', 'Lithonia', 'GA', '30038', 'camenisch@optonline.net', '846-492-4708', '5331207621857366', '06 / 20'),
(150, 'Ronald', 'Clements', '779 Pine St', 'Rego Park', 'NY', '11374', 'mnemonic@msn.com', '930-960-5638', '5585181163195225', '03 / 20'),
(151, 'Madilyn', 'Fischer', '308 Saxton Drive', 'Point Pleasant Beach', 'NJ', '08742', 'mfburgo@comcast.net', '344-207-0486', '5174863840490619', '12 / 22'),
(152, 'Ayaan', 'Wilkerson', '166 Woodside Ave', 'Cape Coral', 'FL', '33904', 'willg@gmail.com', '629-689-5102', '4758229444757406', '11 / 23'),
(153, 'Teagan', 'Kennedy', '93 Meadowbrook Rd', 'Oklahoma City', 'OK', '73112', 'caidaperl@yahoo.com', '791-276-3103', '5138494228632708', '05 / 22'),
(154, 'Misael', 'Pierce', '23 Cardinal Lane', 'New York', 'NY', '10002', 'matty@verizon.net', '287-366-6218', '4539148618949928', '08 / 22'),
(155, 'Ismael', 'Carrillo', '193 Walnutwood Lane', 'Michigan City', 'IN', '46360', 'ryanvm@yahoo.ca', '526-910-6461', '5243858343359102', '06 / 20'),
(156, 'Kiera', 'Martin', '510 South St Louis Dr', 'Tampa', 'FL', '33604', 'psichel@mac.com', '628-445-4245', '5155245597678773', '03 / 22'),
(157, 'Vivian', 'Hooper', '777 Bow Ridge Lane', 'Copperas Cove', 'TX', '76522', 'gospodin@mac.com', '550-332-1624', '5509134334201292', '08 / 22'),
(158, 'Kadyn', 'Lawrence', '60 Big Rock Cove St', 'Beverly', 'MA', '01915', 'leviathan@me.com', '365-797-1420', '5556616735514218', '11 / 20'),
(159, 'Jadyn', 'Gibson', '388 2nd St', 'Columbus', 'GA', '31904', 'catalog@mac.com', '437-350-6986', '5206529253202906', '05 / 20'),
(160, 'Quinn', 'Curry', '18 Saxon Street', 'Odenton', 'MD', '21113', 'bowmanbs@yahoo.com', '448-771-5324', '5416877910362464', '01 / 20'),
(161, 'Arthur', 'Barrett', '36 Cedarwood St', 'Hamburg', 'NY', '14075', 'mnemonic@gmail.com', '322-405-1126', '4532517199440225', '10 / 21'),
(162, 'Teagan', 'Becker', '3 Roehampton Street Unit 637', 'Virginia Beach', 'VA', '23451', 'formis@mac.com', '721-303-2911', '4024007146688410', '03 / 20'),
(163, 'Jaelynn', 'Francis', '180 N Lees Creek Ave', 'Bemidji', 'MN', '56601', 'goldberg@me.com', '246-729-9187', '5293207642329011', '06 / 21'),
(164, 'Cael', 'Zamora', '791 Lilac Lane', 'Apex', 'NC', '27502', 'stewwy@att.net', '264-480-3394', '5314985533076735', '05 / 20'),
(165, 'Cullen', 'Lester', '2 Acacia Dr', 'Elk Grove Village', 'IL', '60007', 'afeldspar@yahoo.ca', '219-584-8208', '4916269075398855', '02 / 23'),
(166, 'Jeremiah', 'Newman', '635 Jockey Hollow Court', 'Benton Harbor', 'MI', '49022', 'stinson@mac.com', '989-586-4082', '4024007141385236', '10 / 22'),
(167, 'Triston', 'Harris', '8935 West Silver Spear St', 'Smithtown', 'NY', '11787', 'cgcra@verizon.net', '610-785-2105', '5289361481532460', '03 / 20'),
(168, 'Layton', 'Shepherd', '8824 Princess Drive', 'New Baltimore', 'MI', '48047', 'claypool@sbcglobal.net', '605-548-4510', '5197618268592681', '10 / 22'),
(169, 'Aydin', 'Shields', '14 Fairfield Dr', 'Boca Raton', 'FL', '33428', 'granboul@mac.com', '541-439-0681', '5541836828697997', '10 / 23'),
(170, 'Jeffery', 'Dunlap', '33 Saxon Road', 'Fort Washington', 'MD', '20744', 'dbrobins@aol.com', '441-285-6030', '5453566683871322', '07 / 23'),
(171, 'Demarion', 'Garner', '395 Redwood Drive', 'Randolph', 'MA', '02368', 'william@optonline.net', '302-477-6298', '4929871814630285', '10 / 21'),
(172, 'Samson', 'Wong', '8720 Prairie Dr', 'North Royalton', 'OH', '44133', 'makarow@aol.com', '631-667-1142', '4532655867087165', '10 / 22'),
(173, 'Mateo', 'Walker', '37 Longbranch Rd', 'Franklin Square', 'NY', '11010', 'frostman@gmail.com', '759-263-4490', '5271720235715574', '03 / 22'),
(174, 'Marina', 'Harvey', '808 Harvey Road', 'Grovetown', 'GA', '30813', 'rattenbt@comcast.net', '845-583-1351', '4286102347833486', '10 / 22'),
(175, 'Cristian', 'Haynes', '96 Sage Lane', 'Mechanicsville', 'VA', '23111', 'policies@aol.com', '534-210-5489', '4929691424311336', '05 / 20'),
(176, 'Ireland', 'Petty', '99 Overlook Ave', 'Mebane', 'NC', '27302', 'psharpe@gmail.com', '356-207-7725', '4716561937355129', '05 / 23'),
(177, 'Chaz', 'Page', '55 East Ramblewood Ave', 'Palatine', 'IL', '60067', 'payned@att.net', '880-953-9131', '4716925495133469', '12 / 22'),
(178, 'Andy', 'Park', '7106 SE Border Drive', 'Jeffersonville', 'IN', '47130', 'tristan@comcast.net', '529-810-1204', '4532233389509387', '08 / 22'),
(179, 'Julien', 'Vincent', '780 E River Dr', 'San Pablo', 'CA', '94806', 'sagal@yahoo.ca', '878-739-3726', '4929651163120470', '06 / 21'),
(180, 'Paola', 'Dominguez', '62 Birch Hill Ave', 'Willoughby', 'OH', '44094', 'murty@icloud.com', '370-983-4120', '5451146532406208', '05 / 22'),
(181, 'Jermaine', 'Brandt', '69 Edgewater Street', 'Mundelein', 'IL', '60060', 'tangsh@hotmail.com', '902-668-7000', '5316028924460321', '06 / 20'),
(182, 'Veronica', 'Neal', '8596 Anderson Street', 'Marquette', 'MI', '49855', 'staikos@comcast.net', '385-420-7464', '5214109672703907', '08 / 22'),
(183, 'Audrey', 'Levy', '65 Primrose Avenue', 'Centereach', 'NY', '11720', 'ovprit@yahoo.com', '622-319-7930', '5267861619852785', '01 / 20'),
(184, 'Zain', 'Morris', '8948 Bedford Avenue', 'Champlin', 'MN', '55316', 'marcs@live.com', '725-765-0951', '4716421977913180', '04 / 20'),
(185, 'Jaydon', 'Owen', '4 Sunbeam St', 'Port Saint Lucie', 'FL', '34952', 'lydia@att.net', '259-246-1374', '5322585998334734', '10 / 23'),
(186, 'Andreas', 'Henderson', '287 Airport Ave', 'Georgetown', 'SC', '29440', 'chaki@verizon.net', '518-624-8467', '5406089887069146', '05 / 20'),
(187, 'Mckenna', 'Donaldson', '8 Oxford Street', 'Front Royal', 'VA', '22630', 'jesse@sbcglobal.net', '675-320-9989', '5365094411041354', '05 / 22'),
(188, 'Johan', 'Norris', '8783 Lawrence Ave', 'Hendersonville', 'NC', '28792', 'starstuff@optonline.net', '460-603-2474', '5477029651692156', '01 / 20'),
(189, 'Sidney', 'Rogers', '77 W Riverside Street', 'Cambridge', 'MA', '02138', 'karasik@icloud.com', '273-734-8614', '4485396030169997', '04 / 20'),
(190, 'Trey', 'Terrell', '58 Hill Street', 'Massapequa', 'NY', '11758', 'gordonjcp@outlook.com', '494-294-4674', '5263445706005616', '11 / 23'),
(191, 'Abram', 'Sweeney', '7891 N Miller St', 'Sioux City', 'IA', '51106', 'zeller@att.net', '279-631-9780', '4556492728833632', '01 / 20'),
(192, 'Maleah', 'Wright', '7932 Sunset Street', 'Fond Du Lac', 'WI', '54935', 'overbom@optonline.net', '718-296-2578', '4532192901185136', '03 / 22'),
(193, 'Nasir', 'Graves', '1 North Pin Oak Road', 'Birmingham', 'AL', '35209', 'feamster@verizon.net', '648-709-1177', '5393039168669796', '05 / 22'),
(194, 'Chanel', 'Morton', '8447 Plumb Branch Road', 'Wooster', 'OH', '44691', 'elflord@comcast.net', '576-974-0328', '4539712308905647', '11 / 23'),
(195, 'Ashtyn', 'Frazier', '32 Elm Lane', 'Lake In The Hills', 'IL', '60156', 'majordick@msn.com', '811-334-6284', '4916068018458341', '10 / 22'),
(196, 'Quentin', 'Davies', '954 Trenton Street', 'Herndon', 'VA', '20170', 'heroine@aol.com', '595-211-7057', '5407203926486166', '10 / 22'),
(197, 'Emerson', 'Long', '9927 W Pheasant Drive', 'West New York', 'NJ', '07093', 'tamas@icloud.com', '265-337-9379', '4024007197096901', '07 / 21'),
(198, 'Danielle', 'Gould', '653 Anderson Drive', 'Elizabeth City', 'NC', '27909', 'dgriffith@hotmail.com', '410-903-7957', '5384265839975525', '11 / 23'),
(199, 'Jamarion', 'Le', '278 S Saxon Court', 'Tullahoma', 'TN', '37388', 'hillct@comcast.net', '639-312-9329', '4916118471617469', '08 / 22'),
(200, 'Chance', 'Mcdowell', '78 Virginia Rd', 'Saint Joseph', 'MI', '49085', 'chinthaka@sbcglobal.net', '698-379-0629', '4916164093404811', '05 / 23');

-- --------------------------------------------------------

--
-- Seed data for rooms
--

TRUNCATE TABLE rooms;

INSERT INTO rooms (room_id, room_num, room_type_id, description, num_beds, clean, occupied, active) VALUES
(1, '101', 1, 'balcony', 2, 1, 1, 1),
(2, '102', 2, '', 1, 1, 1, 1),
(3, '103', 1, '', 2, 1, 1, 1),
(4, '104', 2, '', 2, 1, 1, 1),
(5, '105', 1, '', 2, 1, 1, 1),
(6, '106', 3, 'microwave, refridgerator', 1, 1, 1, 1),
(7, '107', 1, '', 2, 1, 1, 1),
(8, '108', 3, 'microwave, refridgerator', 2, 1, 1, 1),
(9, '109', 1, '', 2, 1, 1, 1),
(10, '110', 3, 'microwave, refridgerator', 1, 1, 1, 1),
(11, '111', 1, '', 2, 1, 1, 1),
(12, '112', 2, '60-inch TV', 2, 1, 1, 1),
(13, '113', 1, '', 2, 1, 1, 1),
(14, '114', 2, '60-inch TV', 1, 1, 1, 1),
(15, '115', 1, '', 2, 1, 1, 1),
(16, '116', 3, 'microwave, refridgerator', 2, 1, 1, 1),
(17, '117', 1, '', 2, 1, 1, 1),
(18, '118', 3, 'microwave, refridgerator', 1, 1, 1, 1),
(19, '119', 1, '', 2, 1, 1, 1),
(20, '120', 3, 'microwave, refridgerator', 2, 1, 1, 1),
(21, '121', 1, '', 2, 1, 1, 1),
(22, '122', 2, '', 1, 1, 1, 1),
(23, '123', 1, '', 2, 1, 1, 1),
(24, '124', 2, '60-inch TV', 2, 1, 1, 1),
(25, '125', 1, 'balcony', 2, 1, 1, 1),
(26, '126', 3, 'microwave, refridgerator, balcony', 1, 1, 1, 1),
(27, '127', 1, '', 2, 1, 1, 1),
(28, '128', 3, 'microwave, refridgerator', 2, 1, 1, 1),
(29, '129', 1, '', 2, 1, 1, 1),
(30, '130', 3, 'microwave, refridgerator', 1, 1, 1, 1),
(31, '131', 1, '', 2, 1, 1, 1),
(32, '132', 2, '', 2, 1, 1, 1),
(33, '133', 1, '', 2, 1, 1, 1),
(34, '134', 2, '60-inch TV', 1, 1, 1, 1),
(35, '135', 1, '', 2, 1, 1, 1),
(36, '136', 3, 'microwave, refridgerator', 2, 1, 1, 1),
(37, '137', 1, '', 2, 1, 1, 1),
(38, '138', 3, 'microwave, refridgerator', 1, 1, 1, 1),
(39, '139', 1, '', 2, 1, 1, 1),
(40, '140', 3, 'microwave, refridgerator', 2, 1, 1, 1),
(41, '141', 1, '', 2, 1, 1, 1),
(42, '142', 2, '60-inch TV', 1, 1, 1, 1),
(43, '143', 1, '', 2, 1, 1, 1),
(44, '144', 2, '', 2, 1, 1, 1),
(45, '145', 1, '', 2, 1, 1, 1),
(46, '146', 3, 'microwave, refridgerator', 1, 1, 1, 1),
(47, '147', 1, '', 2, 1, 1, 1),
(48, '148', 3, 'microwave, refridgerator', 2, 1, 1, 1),
(49, '149', 1, '', 2, 1, 1, 1),
(50, '150', 3, 'microwave, refridgerator', 1, 1, 1, 1),
(51, '201', 1, 'balcony', 2, 1, 1, 1),
(52, '202', 2, '', 2, 1, 1, 1),
(53, '203', 1, '', 2, 1, 1, 1),
(54, '204', 2, '', 1, 1, 1, 1),
(55, '205', 1, '', 2, 1, 1, 1),
(56, '206', 3, 'microwave, refridgerator', 2, 1, 1, 1),
(57, '207', 1, '', 2, 1, 1, 1),
(58, '208', 3, 'microwave, refridgerator', 1, 1, 1, 1),
(59, '209', 1, '', 2, 1, 1, 1),
(60, '210', 3, 'microwave, refridgerator', 2, 1, 1, 1),
(61, '211', 1, '', 2, 1, 1, 1),
(62, '212', 2, '60-inch TV', 1, 1, 1, 1),
(63, '213', 1, '', 2, 1, 1, 1),
(64, '214', 2, '', 2, 1, 1, 1),
(65, '215', 1, '', 2, 1, 1, 1),
(66, '216', 3, 'microwave, refridgerator', 1, 1, 1, 1),
(67, '217', 1, '', 2, 1, 1, 1),
(68, '218', 3, 'microwave, refridgerator', 2, 1, 1, 1),
(69, '219', 1, '', 2, 1, 1, 1),
(70, '220', 3, 'microwave, refridgerator', 1, 1, 1, 1),
(71, '221', 1, '', 2, 1, 1, 1),
(72, '222', 2, '', 2, 1, 1, 1),
(73, '223', 1, '', 2, 1, 1, 1),
(74, '224', 2, '60-inch TV', 1, 1, 1, 1),
(75, '225', 1, 'balcony', 2, 1, 1, 1),
(76, '226', 3, 'microwave, refridgerator, balcony', 2, 1, 1, 1),
(77, '227', 1, '', 2, 1, 1, 1),
(78, '228', 3, 'microwave, refridgerator', 1, 1, 1, 1),
(79, '229', 1, '', 2, 1, 1, 1),
(80, '230', 3, 'microwave, refridgerator', 2, 1, 1, 1),
(81, '231', 1, '', 2, 0, 0, 1),
(82, '232', 2, '', 1, 1, 0, 1),
(83, '233', 1, '', 2, 1, 0, 1),
(84, '234', 2, '60-inch TV', 2, 1, 0, 1),
(85, '235', 1, '', 2, 1, 0, 1),
(86, '236', 3, 'microwave, refridgerator', 1, 1, 0, 1),
(87, '237', 1, '', 2, 1, 0, 1),
(88, '238', 3, 'microwave, refridgerator', 2, 1, 0, 1),
(89, '239', 1, '', 2, 0, 0, 0),
(90, '240', 3, 'microwave, refridgerator', 1, 1, 0, 1),
(91, '241', 1, '', 2, 0, 0, 1),
(92, '242', 2, '', 2, 1, 0, 1),
(93, '243', 1, '', 2, 1, 0, 1),
(94, '244', 2, '', 1, 0, 0, 1),
(95, '245', 1, '', 2, 1, 0, 1),
(96, '246', 3, 'microwave, refridgerator', 2, 0, 0, 0),
(97, '247', 1, '', 2, 1, 0, 1),
(98, '248', 3, 'microwave, refridgerator', 1, 1, 0, 1),
(99, '249', 1, '', 2, 1, 0, 1),
(100, '250', 3, 'microwave, refridgerator', 2, 0, 0, 1);

-- --------------------------------------------------------

--
-- Seed data for room_types
--

TRUNCATE TABLE room_types;

INSERT INTO room_types (room_type_id, type, rate) VALUES
(1, '2 Queens', 109.99),
(2, 'King', 119.99),
(3, 'Suite', 129.99),
(4, 'TBD', 0);

-- --------------------------------------------------------

--
-- Seed data for reservations
--

TRUNCATE TABLE reservations;
ALTER TABLE reservations AUTO_INCREMENT = 1001;

INSERT INTO reservations (reservation_id, customer_id, user_id, comments) VALUES
(1001, 1, 1, ''),
(1002, 2, 1, ''),
(1003, 3, 2, ''),
(1004, 4, 1, ''),
(1005, 5, 3, ''),
(1006, 6, 1, ''),
(1007, 7, 1, ''),
(1008, 8, 2, ''),
(1009, 9, 1, ''),
(1010, 10, 3, ''),
(1011, 11, 1, ''),
(1012, 12, 1, ''),
(1013, 13, 2, ''),
(1014, 14, 1, ''),
(1015, 15, 3, ''),
(1016, 16, 1, ''),
(1017, 17, 1, ''),
(1018, 18, 2, ''),
(1019, 19, 1, ''),
(1020, 20, 3, ''),
(1021, 21, 2, ''),
(1022, 22, 3, ''),
(1023, 23, 1, ''),
(1024, 24, 3, ''),
(1025, 25, 2, ''),
(1026, 26, 1, ''),
(1027, 27, 2, ''),
(1028, 28, 1, ''),
(1029, 29, 3, ''),
(1030, 30, 2, ''),
(1031, 31, 3, ''),
(1032, 32, 1, ''),
(1033, 33, 3, ''),
(1034, 34, 2, ''),
(1035, 35, 1, ''),
(1036, 36, 2, ''),
(1037, 37, 1, ''),
(1038, 38, 3, ''),
(1039, 39, 2, ''),
(1040, 40, 3, ''),
(1041, 41, 1, ''),
(1042, 42, 3, ''),
(1043, 43, 2, ''),
(1044, 44, 1, ''),
(1045, 45, 3, ''),
(1046, 46, 2, ''),
(1047, 47, 3, ''),
(1048, 48, 1, ''),
(1049, 49, 3, ''),
(1050, 50, 2, ''),
(1051, 51, 1, ''),
(1052, 52, 2, ''),
(1053, 53, 1, ''),
(1054, 54, 3, ''),
(1055, 55, 2, ''),
(1056, 56, 3, ''),
(1057, 57, 1, ''),
(1058, 58, 3, ''),
(1059, 59, 2, ''),
(1060, 60, 1, ''),
(1061, 61, 3, ''),
(1062, 62, 2, ''),
(1063, 63, 3, ''),
(1064, 64, 1, ''),
(1065, 65, 3, ''),
(1066, 66, 2, ''),
(1067, 67, 1, ''),
(1068, 68, 2, ''),
(1069, 69, 1, ''),
(1070, 70, 3, ''),
(1071, 71, 2, ''),
(1072, 72, 3, ''),
(1073, 73, 1, ''),
(1074, 74, 3, ''),
(1075, 75, 2, ''),
(1076, 76, 1, ''),
(1077, 77, 3, ''),
(1078, 78, 2, ''),
(1079, 79, 3, ''),
(1080, 80, 1, ''),
(1081, 81, 3, ''),
(1082, 82, 2, ''),
(1083, 83, 1, ''),
(1084, 84, 2, ''),
(1085, 85, 1, ''),
(1086, 86, 3, ''),
(1087, 87, 2, ''),
(1088, 88, 3, ''),
(1089, 89, 1, ''),
(1090, 90, 3, ''),
(1091, 91, 2, ''),
(1092, 92, 1, ''),
(1093, 93, 3, ''),
(1094, 94, 2, ''),
(1095, 95, 3, ''),
(1096, 96, 1, ''),
(1097, 97, 3, ''),
(1098, 98, 2, ''),
(1099, 99, 1, ''),
(1100, 100, 2, ''),
(1101, 101, 1, ''),
(1102, 102, 3, ''),
(1103, 103, 2, ''),
(1104, 104, 3, ''),
(1105, 105, 1, ''),
(1106, 106, 3, ''),
(1107, 107, 2, ''),
(1108, 108, 1, ''),
(1109, 109, 3, ''),
(1110, 110, 2, ''),
(1111, 111, 3, ''),
(1112, 112, 1, ''),
(1113, 113, 3, ''),
(1114, 114, 2, ''),
(1115, 115, 1, ''),
(1116, 116, 2, ''),
(1117, 117, 1, ''),
(1118, 118, 3, ''),
(1119, 119, 2, ''),
(1120, 120, 3, ''),
(1121, 121, 1, ''),
(1122, 122, 3, ''),
(1123, 123, 2, ''),
(1124, 124, 1, ''),
(1125, 125, 3, ''),
(1126, 126, 2, ''),
(1127, 127, 3, ''),
(1128, 128, 1, ''),
(1129, 129, 3, ''),
(1130, 130, 2, ''),
(1131, 131, 1, ''),
(1132, 132, 2, ''),
(1133, 133, 1, ''),
(1134, 134, 3, ''),
(1135, 135, 2, ''),
(1136, 136, 3, ''),
(1137, 137, 1, ''),
(1138, 138, 3, ''),
(1139, 139, 2, ''),
(1140, 140, 1, ''),
(1141, 141, 3, ''),
(1142, 142, 2, ''),
(1143, 143, 3, ''),
(1144, 144, 1, ''),
(1145, 145, 3, ''),
(1146, 146, 2, ''),
(1147, 147, 1, ''),
(1148, 148, 2, ''),
(1149, 149, 1, ''),
(1150, 150, 3, ''),
(1151, 151, 2, ''),
(1152, 152, 3, ''),
(1153, 153, 1, ''),
(1154, 154, 3, ''),
(1155, 155, 2, ''),
(1156, 156, 1, ''),
(1157, 157, 3, ''),
(1158, 158, 2, ''),
(1159, 159, 3, ''),
(1160, 160, 1, ''),
(1161, 161, 3, ''),
(1162, 162, 2, ''),
(1163, 163, 1, ''),
(1164, 164, 2, ''),
(1165, 165, 1, ''),
(1166, 166, 3, ''),
(1167, 167, 2, ''),
(1168, 168, 3, ''),
(1169, 169, 1, ''),
(1170, 170, 3, ''),
(1171, 171, 2, ''),
(1172, 172, 1, ''),
(1173, 173, 3, ''),
(1174, 174, 2, ''),
(1175, 175, 3, ''),
(1176, 176, 1, ''),
(1177, 177, 3, ''),
(1178, 178, 2, ''),
(1179, 179, 1, ''),
(1180, 180, 2, ''),
(1181, 181, 1, ''),
(1182, 182, 3, ''),
(1183, 183, 2, ''),
(1184, 184, 3, ''),
(1185, 185, 1, ''),
(1186, 186, 3, ''),
(1187, 187, 2, ''),
(1188, 188, 1, ''),
(1189, 189, 2, ''),
(1190, 190, 1, ''),
(1191, 191, 3, ''),
(1192, 192, 2, ''),
(1193, 193, 3, ''),
(1194, 194, 1, ''),
(1195, 195, 3, ''),
(1196, 196, 2, ''),
(1197, 197, 1, ''),
(1198, 198, 2, ''),
(1199, 199, 3, ''),
(1200, 200, 1, '');

-- --------------------------------------------------------

--
-- Seed data for res_rooms
--

TRUNCATE TABLE res_rooms;
ALTER TABLE res_rooms AUTO_INCREMENT = 1001;

INSERT INTO res_rooms (res_room_id, reservation_id, room_type_id, check_in_date, check_out_date, checked_in, checked_out, adults, room_id, rate, confirmation_code, comments) VALUES
(1001, 1001, 1, DATE_SUB(CURDATE(), INTERVAL 3 DAY), DATE_ADD(CURDATE(), INTERVAL 1 DAY), 1, 0, 1, 9, '109.99', '190501001001', 'needs a late checkout time'),
(1002, 1002, 2, DATE_SUB(CURDATE(), INTERVAL 3 DAY), DATE_ADD(CURDATE(), INTERVAL 1 DAY), 1, 0, 2, 4, '119.99', '190503002001', ''),
(1003, 1003, 1, DATE_SUB(CURDATE(), INTERVAL 3 DAY), DATE_ADD(CURDATE(), INTERVAL 1 DAY), 1, 0, 2, 11, '109.99', '190503003001', ''),
(1004, 1004, 2, DATE_SUB(CURDATE(), INTERVAL 3 DAY), DATE_ADD(CURDATE(), INTERVAL 2 DAY), 1, 0, 1, 12, '119.99', '190504004001', 'wants a good view'),
(1005, 1005, 1, DATE_SUB(CURDATE(), INTERVAL 3 DAY), DATE_ADD(CURDATE(), INTERVAL 2 DAY), 1, 0, 2, 13, '109.99', '190505005001', ''),
(1006, 1006, 3, DATE_SUB(CURDATE(), INTERVAL 3 DAY), DATE_ADD(CURDATE(), INTERVAL 3 DAY), 1, 0, 1, 6, '129.99', '190508006001', ''),
(1007, 1007, 1, DATE_SUB(CURDATE(), INTERVAL 2 DAY), DATE_ADD(CURDATE(), INTERVAL 1 DAY), 1, 0, 2, 23, '109.99', '190509007001', ''),
(1008, 1008, 3, DATE_SUB(CURDATE(), INTERVAL 2 DAY), DATE_ADD(CURDATE(), INTERVAL 2 DAY), 1, 0, 2, 26, '129.99', '190511008001', ''),
(1009, 1009, 1, DATE_SUB(CURDATE(), INTERVAL 2 DAY), DATE_ADD(CURDATE(), INTERVAL 3 DAY), 1, 0, 1, 25, '109.99', '190513009001', ''),
(1010, 1010, 3, DATE_SUB(CURDATE(), INTERVAL 2 DAY), DATE_ADD(CURDATE(), INTERVAL 2 DAY), 1, 0, 3, 28, '129.99', '190515010001', ''),
(1011, 1011, 1, DATE_SUB(CURDATE(), INTERVAL 2 DAY), DATE_ADD(CURDATE(), INTERVAL 3 DAY), 1, 0, 1, 27, '109.99', '190517011001', ''),
(1012, 1012, 2, DATE_SUB(CURDATE(), INTERVAL 2 DAY), DATE_ADD(CURDATE(), INTERVAL 2 DAY), 1, 0, 2, 24, '119.99', '190519012001', ''),
(1013, 1013, 1, DATE_SUB(CURDATE(), INTERVAL 2 DAY), DATE_ADD(CURDATE(), INTERVAL 1 DAY), 1, 0, 2, 29, '109.99', '190521013001', ''),
(1014, 1014, 2, DATE_SUB(CURDATE(), INTERVAL 2 DAY), DATE_ADD(CURDATE(), INTERVAL 2 DAY), 1, 0, 1, 32, '119.99', '190523014001', ''),
(1015, 1015, 1, DATE_SUB(CURDATE(), INTERVAL 2 DAY), DATE_ADD(CURDATE(), INTERVAL 1 DAY), 1, 0, 3, 31, '109.99', '190525015001', ''),
(1016, 1016, 3, DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 3 DAY), 1, 0, 1, 50, '129.99', '190528016001', ''),
(1017, 1017, 1, DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 2 DAY), 1, 0, 2, 63, '109.99', '190529017001', 'needs a late checkout time'),
(1018, 1018, 3, DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 1 DAY), 1, 0, 2, 56, '129.99', '190601018001', ''),
(1019, 1019, 1, DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 2 DAY), 1, 0, 1, 65, '109.99', '190601019001', ''),
(1020, 1020, 3, DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 1 DAY), 1, 0, 3, 58, '129.99', '190601020001', 'wants a good view'),
(1021, 1021, 1, DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 2 DAY), 1, 0, 1, 67, '109.99', '190601021001', ''),
(1022, 1022, 2, DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 4 DAY), 1, 0, 2, 62, '119.99', '190601022001', ''),
(1023, 1023, 1, DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 6 DAY), 1, 0, 2, 69, '109.99', '190602023001', ''),
(1024, 1024, 2, DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 3 DAY), 1, 0, 1, 64, '119.99', '190602024001', ''),
(1025, 1025, 1, DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 1 DAY), 1, 0, 3, 71, '109.99', '190602025001', ''),
(1026, 1026, 3, DATE_SUB(CURDATE(), INTERVAL 3 DAY), DATE_ADD(CURDATE(), INTERVAL 2 DAY), 1, 0, 1, 8, '129.99', '190603026001', 'needs a late checkout time'),
(1027, 1027, 1, DATE_SUB(CURDATE(), INTERVAL 3 DAY), DATE_ADD(CURDATE(), INTERVAL 2 DAY), 1, 0, 2, 15, '109.99', '190603027001', ''),
(1028, 1028, 3, DATE_SUB(CURDATE(), INTERVAL 3 DAY), DATE_ADD(CURDATE(), INTERVAL 3 DAY), 1, 0, 2, 10, '129.99', '190603028001', ''),
(1029, 1029, 1, DATE_SUB(CURDATE(), INTERVAL 2 DAY), DATE_ADD(CURDATE(), INTERVAL 1 DAY), 1, 0, 1, 33, '109.99', '190604029001', ''),
(1030, 1030, 3, DATE_SUB(CURDATE(), INTERVAL 2 DAY), DATE_ADD(CURDATE(), INTERVAL 2 DAY), 1, 0, 3, 30, '129.99', '190604030001', ''),
(1031, 1031, 1, DATE_SUB(CURDATE(), INTERVAL 2 DAY), DATE_ADD(CURDATE(), INTERVAL 3 DAY), 1, 0, 1, 35, '109.99', '190604031001', ''),
(1032, 1032, 2, DATE_SUB(CURDATE(), INTERVAL 2 DAY), DATE_ADD(CURDATE(), INTERVAL 2 DAY), 1, 0, 2, 34, '119.99', '190604032001', ''),
(1033, 1033, 1, DATE_SUB(CURDATE(), INTERVAL 2 DAY), DATE_ADD(CURDATE(), INTERVAL 3 DAY), 1, 0, 2, 37, '109.99', '190605033001', ''),
(1034, 1034, 2, DATE_SUB(CURDATE(), INTERVAL 2 DAY), DATE_ADD(CURDATE(), INTERVAL 2 DAY), 1, 0, 1, 42, '119.99', '190605034001', ''),
(1035, 1035, 1, DATE_SUB(CURDATE(), INTERVAL 2 DAY), DATE_ADD(CURDATE(), INTERVAL 1 DAY), 1, 0, 4, 39, '109.99', '190605035001', ''),
(1036, 1036, 3, DATE_SUB(CURDATE(), INTERVAL 2 DAY), DATE_ADD(CURDATE(), INTERVAL 2 DAY), 1, 0, 1, 36, '129.99', '190605036001', 'needs a late checkout time'),
(1037, 1037, 1, DATE_SUB(CURDATE(), INTERVAL 2 DAY), DATE_ADD(CURDATE(), INTERVAL 1 DAY), 1, 0, 2, 41, '109.99', '190605037001', ''),
(1038, 1038, 3, DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 3 DAY), 1, 0, 2, 60, '129.99', '190605038001', ''),
(1039, 1039, 1, DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 2 DAY), 1, 0, 1, 73, '109.99', '190605039001', ''),
(1040, 1040, 3, DATE_SUB(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 1 DAY), 1, 0, 3, 66, '129.99', '190606040001', ''),
(1041, 1041, 1, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 2 DAY), 0, 0, 1, null, '109.99', '190606041001', 'needs a late checkout time'),
(1042, 1042, 2, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 4 DAY), 0, 0, 2, null, '119.99', '190607042001', ''),
(1043, 1043, 1, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 3 DAY), 0, 0, 2, null, '109.99', '190607043001', ''),
(1044, 1044, 2, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 2 DAY), 0, 0, 1, null, '119.99', '190607044001', ''),
(1045, 1045, 1, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 6 DAY), 0, 0, 3, null, '109.99', '190607045001', ''),
(1046, 1046, 3, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 3 DAY), 0, 0, 1, null, '129.99', '190607046001', ''),
(1047, 1047, 1, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 DAY), 0, 0, 2, null, '109.99', '190608047001', 'needs a late checkout time'),
(1048, 1048, 3, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 DAY), 0, 0, 2, null, '129.99', '190608048001', ''),
(1049, 1049, 1, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 2 DAY), 0, 0, 1, null, '109.99', '190608049001', ''),
(1050, 1050, 3, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 DAY), 0, 0, 3, null, '129.99', '190608050001', ''),
(1051, 1051, 1, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 4 DAY), 0, 0, 1, null, '109.99', '190608051001', ''),
(1052, 1052, 2, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 3 DAY), 0, 0, 2, null, '119.99', '190608052001', ''),
(1053, 1053, 1, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 2 DAY), 0, 0, 2, null, '109.99', '190609053001', ''),
(1054, 1054, 2, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 4 DAY), 0, 0, 1, null, '119.99', '190609054001', ''),
(1055, 1055, 1, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 3 DAY), 0, 0, 3, null, '109.99', '190609055001', ''),
(1056, 1056, 3, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 DAY), 0, 0, 1, null, '129.99', '190609056001', ''),
(1057, 1057, 1, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 DAY), 0, 0, 2, null, '109.99', '190609057001', ''),
(1058, 1058, 3, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 2 DAY), 0, 0, 2, null, '129.99', '190610058001', ''),
(1059, 1059, 1, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 DAY), 0, 0, 1, null, '109.99', '190610059001', ''),
(1060, 1060, 3, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 4 DAY), 0, 0, 3, null, '129.99', '190610060001', ''),
(1061, 1061, 1, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 3 DAY), 0, 0, 1, null, '109.99', '190610061001', 'needs a late checkout time'),
(1062, 1062, 2, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 2 DAY), 0, 0, 2, null, '119.99', '190611062001', ''),
(1063, 1063, 1, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 5 DAY), 0, 0, 2, null, '109.99', '190611063001', ''),
(1064, 1064, 2, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 3 DAY), 0, 0, 1, null, '119.99', '190612064001', ''),
(1065, 1065, 1, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 DAY), 0, 0, 3, null, '109.99', '190612065001', 'wants a large screen tv'),
(1066, 1066, 3, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 4 DAY), 0, 0, 1, null, '129.99', '190613066001', ''),
(1067, 1067, 1, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 3 DAY), 0, 0, 2, null, '109.99', '190613067001', ''),
(1068, 1068, 3, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 DAY), 0, 0, 2, null, '129.99', '190613068001', ''),
(1069, 1069, 1, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 DAY), 0, 0, 1, null, '109.99', '190613069001', ''),
(1070, 1070, 3, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 2 DAY), 0, 0, 3, null, '129.99', '190614070001', ''),
(1071, 1071, 1, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 10 DAY), 0, 0, 1, null, '109.99', '190614071001', ''),
(1072, 1072, 2, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 4 DAY), 0, 0, 2, null, '119.99', '190614072001', ''),
(1073, 1073, 1, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 3 DAY), 0, 0, 2, null, '109.99', '190615073001', 'needs a late checkout time'),
(1074, 1074, 2, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 2 DAY), 0, 0, 1, null, '119.99', '190615074001', ''),
(1075, 1075, 1, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 5 DAY), 0, 0, 3, null, '109.99', '190615075001', ''),
(1076, 1076, 3, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 3 DAY), 0, 0, 1, null, '129.99', '190615076001', ''),
(1077, 1077, 1, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 DAY), 0, 0, 2, null, '109.99', '190615077001', ''),
(1078, 1078, 3, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 4 DAY), 0, 0, 2, null, '129.99', '190616078001', ''),
(1079, 1079, 1, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 DAY), 0, 0, 1, null, '109.99', '190616079001', ''),
(1080, 1080, 3, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 3 DAY), 0, 0, 3, null, '129.99', '190616080001', ''),
(1081, 1081, 1, DATE_SUB(CURDATE(), INTERVAL 3 DAY), CURDATE(), 1, 0, 1, 17, '109.99', '190616081001', ''),
(1082, 1082, 2, DATE_SUB(CURDATE(), INTERVAL 3 DAY), CURDATE(), 1, 0, 2, 14, '119.99', '190617082001', ''),
(1083, 1083, 1, DATE_SUB(CURDATE(), INTERVAL 3 DAY), CURDATE(), 1, 0, 2, 19, '109.99', '190617083001', 'needs a late checkout time'),
(1084, 1084, 2, DATE_SUB(CURDATE(), INTERVAL 3 DAY), CURDATE(), 1, 0, 1, 22, '119.99', '190617084001', ''),
(1085, 1085, 1, DATE_SUB(CURDATE(), INTERVAL 4 DAY), CURDATE(), 1, 0, 3, 3, '109.99', '190617085001', ''),
(1086, 1086, 3, DATE_SUB(CURDATE(), INTERVAL 3 DAY), CURDATE(), 1, 0, 4, 16, '129.99', '190618086001', ''),
(1087, 1087, 1, DATE_SUB(CURDATE(), INTERVAL 2 DAY), CURDATE(), 1, 0, 2, 43, '109.99', '190618087001', ''),
(1088, 1088, 3, DATE_SUB(CURDATE(), INTERVAL 2 DAY), CURDATE(), 1, 0, 2, 38, '129.99', '190618088001', 'wants a good view'),
(1089, 1089, 1, DATE_SUB(CURDATE(), INTERVAL 2 DAY), CURDATE(), 1, 0, 1, 45, '109.99', '190618089001', ''),
(1090, 1090, 3, DATE_SUB(CURDATE(), INTERVAL 2 DAY), CURDATE(), 1, 0, 3, 40, '129.99', '190619090001', ''),
(1091, 1091, 1, DATE_SUB(CURDATE(), INTERVAL 2 DAY), CURDATE(), 1, 0, 1, 47, '109.99', '190619091001', ''),
(1092, 1092, 2, DATE_SUB(CURDATE(), INTERVAL 6 DAY), CURDATE(), 1, 0, 2, 2, '119.99', '190619092001', ''),
(1093, 1093, 1, DATE_SUB(CURDATE(), INTERVAL 2 DAY), CURDATE(), 1, 0, 2, 49, '109.99', '190619093001', ''),
(1094, 1094, 2, DATE_SUB(CURDATE(), INTERVAL 2 DAY), CURDATE(), 1, 0, 1, 44, '119.99', '190619094001', ''),
(1095, 1095, 1, DATE_SUB(CURDATE(), INTERVAL 2 DAY), CURDATE(), 1, 0, 3, 51, '109.99', '190619095001', ''),
(1096, 1096, 3, DATE_SUB(CURDATE(), INTERVAL 1 DAY), CURDATE(), 1, 0, 3, 68, '129.99', '190619096001', ''),
(1097, 1097, 1, DATE_SUB(CURDATE(), INTERVAL 4 DAY), CURDATE(), 1, 0, 2, 5, '109.99', '190620097001', ''),
(1098, 1098, 3, DATE_SUB(CURDATE(), INTERVAL 1 DAY), CURDATE(), 1, 0, 2, 70, '129.99', '190620098001', ''),
(1099, 1099, 1, DATE_SUB(CURDATE(), INTERVAL 2 DAY), CURDATE(), 1, 0, 1, 53, '109.99', '190620099001', 'needs a late checkout time'),
(1100, 1100, 3, DATE_SUB(CURDATE(), INTERVAL 1 DAY), CURDATE(), 1, 0, 3, 76, '129.99', '190620100001', ''),
(1101, 1101, 1, DATE_SUB(CURDATE(), INTERVAL 6 DAY), CURDATE(), 1, 0, 1, 1, '109.99', '190621101001', ''),
(1102, 1102, 2, DATE_SUB(CURDATE(), INTERVAL 1 DAY), CURDATE(), 1, 0, 2, 72, '119.99', '190621102001', ''),
(1103, 1103, 1, DATE_SUB(CURDATE(), INTERVAL 1 DAY), CURDATE(), 1, 0, 2, 75, '109.99', '190621103001', ''),
(1104, 1104, 2, DATE_SUB(CURDATE(), INTERVAL 2 DAY), CURDATE(), 1, 0, 1, 52, '119.99', '190621104001', ''),
(1105, 1105, 1, DATE_SUB(CURDATE(), INTERVAL 1 DAY), CURDATE(), 1, 0, 3, 77, '109.99', '190622105001', ''),
(1106, 1106, 3, DATE_SUB(CURDATE(), INTERVAL 3 DAY), CURDATE(), 1, 0, 2, 18, '129.99', '190622106001', ''),
(1107, 1107, 1, DATE_SUB(CURDATE(), INTERVAL 3 DAY), CURDATE(), 1, 0, 2, 21, '109.99', '190623107001', ''),
(1108, 1108, 3, DATE_SUB(CURDATE(), INTERVAL 3 DAY), CURDATE(), 1, 0, 2, 20, '129.99', '190623108001', ''),
(1109, 1109, 1, DATE_SUB(CURDATE(), INTERVAL 2 DAY), CURDATE(), 1, 0, 1, 55, '109.99', '190623109001', 'needs a late checkout time'),
(1110, 1110, 3, DATE_SUB(CURDATE(), INTERVAL 2 DAY), CURDATE(), 1, 0, 3, 46, '129.99', '190623110001', ''),
(1111, 1111, 1, DATE_SUB(CURDATE(), INTERVAL 2 DAY), CURDATE(), 1, 0, 1, 57, '109.99', '190624111001', ''),
(1112, 1112, 2, DATE_SUB(CURDATE(), INTERVAL 2 DAY), CURDATE(), 1, 0, 2, 54, '119.99', '190625112001', ''),
(1113, 1113, 1, DATE_SUB(CURDATE(), INTERVAL 2 DAY), CURDATE(), 1, 0, 2, 59, '109.99', '190625113001', ''),
(1114, 1114, 2, DATE_SUB(CURDATE(), INTERVAL 1 DAY), CURDATE(), 1, 0, 1, 74, '119.99', '190625114001', ''),
(1115, 1115, 1, DATE_SUB(CURDATE(), INTERVAL 4 DAY), CURDATE(), 1, 0, 3, 7, '109.99', '190625115001', ''),
(1116, 1116, 3, DATE_SUB(CURDATE(), INTERVAL 2 DAY), CURDATE(), 1, 0, 1, 48, '129.99', '190626116001', ''),
(1117, 1117, 1, DATE_SUB(CURDATE(), INTERVAL 2 DAY), CURDATE(), 1, 0, 2, 61, '109.99', '190626117001', ''),
(1118, 1118, 3, DATE_SUB(CURDATE(), INTERVAL 1 DAY), CURDATE(), 1, 0, 2, 78, '129.99', '190626118001', ''),
(1119, 1119, 1, DATE_SUB(CURDATE(), INTERVAL 1 DAY), CURDATE(), 1, 0, 1, 79, '109.99', '190626119001', ''),
(1120, 1120, 3, DATE_SUB(CURDATE(), INTERVAL 1 DAY), CURDATE(), 1, 0, 3, 80, '129.99', '190627120001', ''),
(1121, 1121, 1, DATE_ADD(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 2 DAY), 0, 0, 1, null, '109.99', '190627121001', ''),
(1122, 1122, 2, DATE_ADD(CURDATE(), INTERVAL 2 DAY), DATE_ADD(CURDATE(), INTERVAL 3 DAY), 0, 0, 2, null, '119.99', '190628122001', 'wants a large screen tv'),
(1123, 1123, 1, DATE_ADD(CURDATE(), INTERVAL 3 DAY), DATE_ADD(CURDATE(), INTERVAL 4 DAY), 0, 0, 2, null, '109.99', '190628123001', ''),
(1124, 1124, 2, DATE_ADD(CURDATE(), INTERVAL 4 DAY), DATE_ADD(CURDATE(), INTERVAL 5 DAY), 0, 0, 1, null, '119.99', '190628124001', ''),
(1125, 1125, 1, DATE_ADD(CURDATE(), INTERVAL 5 DAY), DATE_ADD(CURDATE(), INTERVAL 6 DAY), 0, 0, 3, null, '109.99', '190628125001', ''),
(1126, 1126, 3, DATE_ADD(CURDATE(), INTERVAL 6 DAY), DATE_ADD(CURDATE(), INTERVAL 7 DAY), 0, 0, 1, null, '129.99', '190628126001', ''),
(1127, 1127, 1, DATE_ADD(CURDATE(), INTERVAL 7 DAY), DATE_ADD(CURDATE(), INTERVAL 8 DAY), 0, 0, 2, null, '109.99', '190629127001', 'needs a late checkout time'),
(1128, 1128, 3, DATE_ADD(CURDATE(), INTERVAL 8 DAY), DATE_ADD(CURDATE(), INTERVAL 9 DAY), 0, 0, 2, null, '129.99', '190629128001', ''),
(1129, 1129, 1, DATE_ADD(CURDATE(), INTERVAL 9 DAY), DATE_ADD(CURDATE(), INTERVAL 10 DAY), 0, 0, 1, null, '109.99', '190629129001', ''),
(1130, 1130, 3, DATE_ADD(CURDATE(), INTERVAL 10 DAY), DATE_ADD(CURDATE(), INTERVAL 13 DAY), 0, 0, 3, null, '129.99', '190629130001', ''),
(1131, 1131, 1, DATE_ADD(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 2 DAY), 0, 0, 1, null, '109.99', '190630131001', ''),
(1132, 1132, 2, DATE_ADD(CURDATE(), INTERVAL 2 DAY), DATE_ADD(CURDATE(), INTERVAL 3 DAY), 0, 0, 2, null, '119.99', '190630132001', ''),
(1133, 1133, 1, DATE_ADD(CURDATE(), INTERVAL 3 DAY), DATE_ADD(CURDATE(), INTERVAL 4 DAY), 0, 0, 2, null, '109.99', '190630133001', ''),
(1134, 1134, 2, DATE_ADD(CURDATE(), INTERVAL 4 DAY), DATE_ADD(CURDATE(), INTERVAL 5 DAY), 0, 0, 2, null, '119.99', '190701134001', ''),
(1135, 1135, 1, DATE_ADD(CURDATE(), INTERVAL 5 DAY), DATE_ADD(CURDATE(), INTERVAL 8 DAY), 0, 0, 3, null, '109.99', '190701135001', ''),
(1136, 1136, 3, DATE_ADD(CURDATE(), INTERVAL 6 DAY), DATE_ADD(CURDATE(), INTERVAL 7 DAY), 0, 0, 4, null, '129.99', '190701136001', ''),
(1137, 1137, 1, DATE_ADD(CURDATE(), INTERVAL 7 DAY), DATE_ADD(CURDATE(), INTERVAL 11 DAY), 0, 0, 2, null, '109.99', '190701137001', ''),
(1138, 1138, 3, DATE_ADD(CURDATE(), INTERVAL 8 DAY), DATE_ADD(CURDATE(), INTERVAL 9 DAY), 0, 0, 2, null, '129.99', '190701138001', ''),
(1139, 1139, 1, DATE_ADD(CURDATE(), INTERVAL 9 DAY), DATE_ADD(CURDATE(), INTERVAL 12 DAY), 0, 0, 1, null, '109.99', '190701139001', ''),
(1140, 1140, 3, DATE_ADD(CURDATE(), INTERVAL 10 DAY), DATE_ADD(CURDATE(), INTERVAL 13 DAY), 0, 0, 3, null, '129.99', '190701140001', 'needs a late checkout time'),
(1141, 1141, 1, DATE_ADD(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 6 DAY), 0, 0, 1, null, '109.99', '190701141001', ''),
(1142, 1142, 2, DATE_ADD(CURDATE(), INTERVAL 2 DAY), DATE_ADD(CURDATE(), INTERVAL 7 DAY), 0, 0, 2, null, '119.99', '190701142001', ''),
(1143, 1143, 1, DATE_ADD(CURDATE(), INTERVAL 3 DAY), DATE_ADD(CURDATE(), INTERVAL 5 DAY), 0, 0, 2, null, '109.99', '190702143001', ''),
(1144, 1144, 2, DATE_ADD(CURDATE(), INTERVAL 4 DAY), DATE_ADD(CURDATE(), INTERVAL 6 DAY), 0, 0, 1, null, '119.99', '190702144001', ''),
(1145, 1145, 1, DATE_ADD(CURDATE(), INTERVAL 5 DAY), DATE_ADD(CURDATE(), INTERVAL 12 DAY), 0, 0, 3, null, '109.99', '190702145001', 'wants a good view'),
(1146, 1146, 3, DATE_ADD(CURDATE(), INTERVAL 6 DAY), DATE_ADD(CURDATE(), INTERVAL 12 DAY), 0, 0, 4, null, '129.99', '190702146001', ''),
(1147, 1147, 1, DATE_ADD(CURDATE(), INTERVAL 7 DAY), DATE_ADD(CURDATE(), INTERVAL 12 DAY), 0, 0, 2, null, '109.99', '190702147001', ''),
(1148, 1148, 3, DATE_ADD(CURDATE(), INTERVAL 8 DAY), DATE_ADD(CURDATE(), INTERVAL 11 DAY), 0, 0, 2, null, '129.99', '190703148001', 'needs a late checkout time'),
(1149, 1149, 1, DATE_ADD(CURDATE(), INTERVAL 9 DAY), DATE_ADD(CURDATE(), INTERVAL 10 DAY), 0, 0, 1, null, '109.99', '190703149001', ''),
(1150, 1150, 3, DATE_ADD(CURDATE(), INTERVAL 10 DAY), DATE_ADD(CURDATE(), INTERVAL 12 DAY), 0, 0, 3, null, '129.99', '190703150001', ''),
(1151, 1151, 1, DATE_ADD(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 7 DAY), 0, 0, 1, null, '109.99', '190703151001', ''),
(1152, 1152, 2, DATE_ADD(CURDATE(), INTERVAL 2 DAY), DATE_ADD(CURDATE(), INTERVAL 5 DAY), 0, 0, 2, null, '119.99', '190703152001', ''),
(1153, 1153, 1, DATE_ADD(CURDATE(), INTERVAL 3 DAY), DATE_ADD(CURDATE(), INTERVAL 6 DAY), 0, 0, 2, null, '109.99', '190703153001', ''),
(1154, 1154, 2, DATE_ADD(CURDATE(), INTERVAL 4 DAY), DATE_ADD(CURDATE(), INTERVAL 12 DAY), 0, 0, 1, null, '119.99', '190703154001', ''),
(1155, 1155, 1, DATE_ADD(CURDATE(), INTERVAL 5 DAY), DATE_ADD(CURDATE(), INTERVAL 6 DAY), 0, 0, 3, null, '109.99', '190703155001', ''),
(1156, 1156, 3, DATE_ADD(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 6 DAY), 0, 0, 4, null, '129.99', '190703156001', ''),
(1157, 1157, 1, DATE_ADD(CURDATE(), INTERVAL 2 DAY), DATE_ADD(CURDATE(), INTERVAL 6 DAY), 0, 0, 2, null, '109.99', '190703157001', ''),
(1158, 1158, 3, DATE_ADD(CURDATE(), INTERVAL 3 DAY), DATE_ADD(CURDATE(), INTERVAL 7 DAY), 0, 0, 2, null, '129.99', '190703158001', ''),
(1159, 1159, 1, DATE_ADD(CURDATE(), INTERVAL 4 DAY), DATE_ADD(CURDATE(), INTERVAL 5 DAY), 0, 0, 1, null, '109.99', '190703159001', 'needs a late checkout time'),
(1160, 1160, 3, DATE_ADD(CURDATE(), INTERVAL 5 DAY), DATE_ADD(CURDATE(), INTERVAL 6 DAY), 0, 0, 3, null, '129.99', '190703160001', ''),
(1161, 1161, 1, DATE_ADD(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 12 DAY), 0, 0, 1, null, '109.99', '190703161001', ''),
(1162, 1162, 2, DATE_ADD(CURDATE(), INTERVAL 2 DAY), DATE_ADD(CURDATE(), INTERVAL 5 DAY), 0, 0, 2, null, '119.99', '190703162001', ''),
(1163, 1163, 1, DATE_ADD(CURDATE(), INTERVAL 3 DAY), DATE_ADD(CURDATE(), INTERVAL 5 DAY), 0, 0, 2, null, '109.99', '190703163001', ''),
(1164, 1164, 2, DATE_ADD(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 2 DAY), 0, 0, 2, null, '119.99', '190703164001', ''),
(1165, 1165, 1, DATE_ADD(CURDATE(), INTERVAL 2 DAY), DATE_ADD(CURDATE(), INTERVAL 5 DAY), 0, 0, 3, null, '109.99', '190703165001', ''),
(1166, 1166, 3, DATE_ADD(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 4 DAY), 0, 0, 2, null, '129.99', '190703166001', ''),
(1167, 1167, 1, DATE_ADD(CURDATE(), INTERVAL 12 DAY), DATE_ADD(CURDATE(), INTERVAL 15 DAY), 0, 0, 2, null, '109.99', '190704167001', 'wants a large screen tv'),
(1168, 1168, 3, DATE_ADD(CURDATE(), INTERVAL 12 DAY), DATE_ADD(CURDATE(), INTERVAL 15 DAY), 0, 0, 2, null, '129.99', '190704168001', ''),
(1169, 1169, 1, DATE_ADD(CURDATE(), INTERVAL 13 DAY), DATE_ADD(CURDATE(), INTERVAL 15 DAY), 0, 0, 1, null, '109.99', '190704169001', ''),
(1170, 1170, 3, DATE_ADD(CURDATE(), INTERVAL 14 DAY), DATE_ADD(CURDATE(), INTERVAL 15 DAY), 0, 0, 3, null, '129.99', '190704170001', ''),
(1171, 1171, 1, DATE_ADD(CURDATE(), INTERVAL 16 DAY), DATE_ADD(CURDATE(), INTERVAL 19 DAY), 0, 0, 1, null, '109.99', '190704171001', ''),
(1172, 1172, 2, DATE_ADD(CURDATE(), INTERVAL 22 DAY), DATE_ADD(CURDATE(), INTERVAL 23 DAY), 0, 0, 2, null, '119.99', '190704172001', ''),
(1173, 1173, 1, DATE_ADD(CURDATE(), INTERVAL 28 DAY), DATE_ADD(CURDATE(), INTERVAL 29 DAY), 0, 0, 2, null, '109.99', '190704173001', ''),
(1174, 1174, 2, DATE_ADD(CURDATE(), INTERVAL 30 DAY), DATE_ADD(CURDATE(), INTERVAL 36 DAY), 0, 0, 1, null, '119.99', '190704174001', ''),
(1175, 1175, 1, DATE_ADD(CURDATE(), INTERVAL 35 DAY), DATE_ADD(CURDATE(), INTERVAL 38 DAY), 0, 0, 3, null, '109.99', '190705175001', ''),
(1176, 1176, 3, DATE_ADD(CURDATE(), INTERVAL 42 DAY), DATE_ADD(CURDATE(), INTERVAL 44 DAY), 0, 0, 1, null, '129.99', '190705176001', ''),
(1177, 1177, 1, DATE_ADD(CURDATE(), INTERVAL 45 DAY), DATE_ADD(CURDATE(), INTERVAL 48 DAY), 0, 0, 2, null, '109.99', '190705177001', 'needs a late checkout time'),
(1178, 1178, 3, DATE_ADD(CURDATE(), INTERVAL 47 DAY), DATE_ADD(CURDATE(), INTERVAL 49 DAY), 0, 0, 2, null, '129.99', '190705178001', ''),
(1179, 1179, 1, DATE_ADD(CURDATE(), INTERVAL 49 DAY), DATE_ADD(CURDATE(), INTERVAL 52 DAY), 0, 0, 1, null, '109.99', '190705179001', ''),
(1180, 1180, 3, DATE_ADD(CURDATE(), INTERVAL 1 DAY), DATE_ADD(CURDATE(), INTERVAL 6 DAY), 0, 0, 3, null, '129.99', '190706180001', ''),
(1181, 1181, 1, DATE_ADD(CURDATE(), INTERVAL 2 DAY), DATE_ADD(CURDATE(), INTERVAL 7 DAY), 0, 0, 1, null, '109.99', '190706181001', ''),
(1182, 1182, 2, DATE_ADD(CURDATE(), INTERVAL 3 DAY), DATE_ADD(CURDATE(), INTERVAL 5 DAY), 0, 0, 2, null, '119.99', '190706182001', ''),
(1183, 1183, 1, DATE_ADD(CURDATE(), INTERVAL 4 DAY), DATE_ADD(CURDATE(), INTERVAL 6 DAY), 0, 0, 2, null, '109.99', '190707183001', ''),
(1184, 1184, 2, DATE_ADD(CURDATE(), INTERVAL 5 DAY), DATE_ADD(CURDATE(), INTERVAL 9 DAY), 0, 0, 1, null, '119.99', '190707184001', ''),
(1185, 1185, 1, DATE_ADD(CURDATE(), INTERVAL 6 DAY), DATE_ADD(CURDATE(), INTERVAL 9 DAY), 0, 0, 3, null, '109.99', '190707185001', ''),
(1186, 1186, 3, DATE_ADD(CURDATE(), INTERVAL 7 DAY), DATE_ADD(CURDATE(), INTERVAL 8 DAY), 0, 0, 1, null, '129.99', '190708186001', ''),
(1187, 1187, 1, DATE_ADD(CURDATE(), INTERVAL 8 DAY), DATE_ADD(CURDATE(), INTERVAL 11 DAY), 0, 0, 2, null, '109.99', '190708187001', 'needs a late checkout time'),
(1188, 1188, 3, DATE_ADD(CURDATE(), INTERVAL 9 DAY), DATE_ADD(CURDATE(), INTERVAL 10 DAY), 0, 0, 2, null, '129.99', '190709188001', ''),
(1189, 1189, 1, DATE_ADD(CURDATE(), INTERVAL 10 DAY), DATE_ADD(CURDATE(), INTERVAL 12 DAY), 0, 0, 1, null, '109.99', '190709189001', ''),
(1190, 1190, 3, DATE_ADD(CURDATE(), INTERVAL 68 DAY), DATE_ADD(CURDATE(), INTERVAL 71 DAY), 0, 0, 3, null, '129.99', '190710190001', ''),
(1191, 1191, 1, DATE_ADD(CURDATE(), INTERVAL 75 DAY), DATE_ADD(CURDATE(), INTERVAL 77 DAY), 0, 0, 1, null, '109.99', '190710191001', 'wants a good view'),
(1192, 1192, 2, DATE_ADD(CURDATE(), INTERVAL 81 DAY), DATE_ADD(CURDATE(), INTERVAL 84 DAY), 0, 0, 2, null, '119.99', '190711192001', ''),
(1193, 1193, 1, DATE_ADD(CURDATE(), INTERVAL 85 DAY), DATE_ADD(CURDATE(), INTERVAL 89 DAY), 0, 0, 2, null, '109.99', '190711193001', ''),
(1194, 1194, 2, DATE_ADD(CURDATE(), INTERVAL 95 DAY), DATE_ADD(CURDATE(), INTERVAL 96 DAY), 0, 0, 1, null, '119.99', '190712194001', 'wants a large screen tv'),
(1195, 1195, 1, DATE_ADD(CURDATE(), INTERVAL 98 DAY), DATE_ADD(CURDATE(), INTERVAL 100 DAY), 0, 0, 3, null, '109.99', '190712195001', ''),
(1196, 1196, 3, DATE_ADD(CURDATE(), INTERVAL 101 DAY), DATE_ADD(CURDATE(), INTERVAL 102 DAY), 0, 0, 2, null, '129.99', '190713196001', ''),
(1197, 1197, 1, DATE_ADD(CURDATE(), INTERVAL 106 DAY), DATE_ADD(CURDATE(), INTERVAL 107 DAY), 0, 0, 2, null, '109.99', '190713197001', 'needs a late checkout time'),
(1198, 1198, 3, DATE_ADD(CURDATE(), INTERVAL 108 DAY), DATE_ADD(CURDATE(), INTERVAL 110 DAY), 0, 0, 2, null, '129.99', '190713198001', ''),
(1199, 1199, 1, DATE_ADD(CURDATE(), INTERVAL 111 DAY), DATE_ADD(CURDATE(), INTERVAL 116 DAY), 0, 0, 1, null, '109.99', '190714199001', ''),
(1200, 1200, 3, DATE_ADD(CURDATE(), INTERVAL 120 DAY), DATE_ADD(CURDATE(), INTERVAL 123 DAY), 0, 0, 3, null, '129.99', '190714200001', '');

-- --------------------------------------------------------

--
-- Seed data for taxes
--

TRUNCATE TABLE taxes;

INSERT INTO taxes (tax_name, tax_rate) VALUES
('County Tax', 5.000),
('City Tax', 3.000),
('State Tax', 7.000);

-- --------------------------------------------------------

--
-- Seed data for charges
--

TRUNCATE TABLE charges;

INSERT INTO charges (charge_name) VALUES
('Phone'),
('Laundry'),
('Room Service'),
('Restaurant'),
('Wifi'),
('Television'),
('Misc');

-- --------------------------------------------------------

--
-- Seed data for payment_types
--

TRUNCATE TABLE payment_types;

INSERT INTO payment_types (payment_name) VALUES
('Credit Card'),
('Check'),
('Cash'),
('Gift Card');

-- --------------------------------------------------------

--
-- Seed data for hotel_info
--

TRUNCATE TABLE hotel_info;

INSERT INTO hotel_info (hotel_name, address, city, state, zip, email, phone, image_url, active) VALUES
('Regal Inn & Suites', '12345 E Main St', 'Cleveland', 'Ohio', '44114', 'info@regalinnandsuites.com', '216-555-1212', 'hotel.png', 1);

-- --------------------------------------------------------

--
-- Seeds data for room_issues
--

TRUNCATE TABLE room_issues;

INSERT INTO room_issues (room_id, issue, user_id, start_date, end_date, fixed) VALUES
(89, "Needs a new toilet, plus there's a bad stain on the carpet near the window.", 1, "2019-07-16", "2019-07-20", 0),
(96, "The tub drain is clogged and the shower curtain needs to be replaced.", 1, "2019-07-17", "2019-07-19", 0);

-- --------------------------------------------------------

--
-- Seeds data for invoices
--

TRUNCATE TABLE invoices;

-- --------------------------------------------------------

set foreign_key_checks=1;
