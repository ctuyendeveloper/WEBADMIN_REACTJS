CREATE DATABASE IF NOT EXISTS `DATN`;
USE `DATN`;

    CREATE TABLE
    IF NOT EXISTS `CUSTOMER` (
        `CUSTOMER_ID` int(11) NOT NULL AUTO_INCREMENT,
        `CUSTOMER_EMAIL` varchar(255) NOT NULL,
        `CUSTOMER_ADDRESS` varchar(255),
        `CUSTOMER_PHONE` int(11),
        `CUSTOMER_PASSWORD` varchar(255) NOT NULL,
        `CUSTOMER_NAME` varchar(255),
        `CUSTOMER_IMAGE` varchar(255),
        PRIMARY KEY (`CUSTOMER_ID`)
    );

    CREATE TABLE
    IF NOT EXISTS `ADDRESS` (
        `ADDRESS_ID` int(11) NOT NULL AUTO_INCREMENT,
        `ADDRESS_DETAIL` varchar(255) NOT NULL,
        `ADDRESS_PHONE` int(11) NOT NULL,
        `ADDRESS_NAME` varchar(255) NOT NULL,
        `CUSTOMER_ID` int(11) NOT NULL,
        PRIMARY KEY (`ADDRESS_ID`),
        FOREIGN KEY (`CUSTOMER_ID`) REFERENCES `CUSTOMER`(`CUSTOMER_ID`)
    );
    CREATE TABLE
    IF NOT EXISTS `REVIEW` (
        `REVIEW_ID` int(11) NOT NULL AUTO_INCREMENT,
        `REVIEW_CONTENT` varchar(255) NOT NULL,
        `REVIEW_POINT` float(1) NOT NULL,
        `REVIEW_CREATEDAT` datetime DEFAULT NOW() NOT NULL,
        `CUSTOMER_ID` int(11) NOT NULL,
        `ORDERDETAIL_ID` int(11) NOT NULL,
        PRIMARY KEY (`REVIEW_ID`),
        FOREIGN KEY (`CUSTOMER_ID`) REFERENCES `CUSTOMER`(`CUSTOMER_ID`),
        FOREIGN KEY (`ORDERDETAIL_ID`) REFERENCES `ORDERDETAIL`(`ORDERDETAIL_ID`)
    );
    CREATE TABLE
    IF NOT EXISTS `BILL` (
        `BILL_ID` int(11) NOT NULL AUTO_INCREMENT,
        `BILL_CREATEDAT` datetime DEFAULT NOW() NOT NULL,
        `BILL_STATUS` int(1) NOT NULL,
        `BILL_PAYMENTMETHOD` int(1) NOT NULL,
        `BILL_NOTE` varchar(255),
        `ADDRESS_ID` int(11) NOT NULL,
        `CUSTOMER_ID` int(11) NOT NULL,
        PRIMARY KEY (`BILL_ID`),
        FOREIGN KEY (`ADDRESS_ID`) REFERENCES `ADDRESS`(`ADDRESS_ID`),
        FOREIGN KEY (`CUSTOMER_ID`) REFERENCES `CUSTOMER`(`CUSTOMER_ID`)
    );
    CREATE TABLE
    IF NOT EXISTS `ORDERDETAIL` (
        `ORDERDETAIL_ID` int(11) NOT NULL AUTO_INCREMENT,
        `ORDERDETAIL_QUANTITY` int(11) NOT NULL,
        `ORDERDETAIL_PRICE` float(20) NOT NULL,
        `PRODUCT_ID` int(11) NOT NULL,
        `BILL_ID` int(11) NOT NULL,
        PRIMARY KEY (`ORDERDETAIL_ID`),
        FOREIGN KEY (`PRODUCT_ID`) REFERENCES `PRODUCT`(`PRODUCT_ID`),
        FOREIGN KEY (`BILL_ID`) REFERENCES `BILL`(`BILL_ID`)
    );
    CREATE TABLE
    IF NOT EXISTS `PRODUCT` (
        `PRODUCT_ID` int(11) NOT NULL AUTO_INCREMENT,
        `PRODUCT_NAME` varchar(255) NOT NULL,
        `PRODUCT_PRICE` float(20) NOT NULL,
        `PRODUCT_DESCRIBE` varchar(255) NOT NULL,
        `PRODUCT_PROMOTIONPRICE` float(20),
        `PRODUCTCATEGORY_ID` int(11) NOT NULL,
        PRIMARY KEY (`PRODUCT_ID`),
        FOREIGN KEY (`PRODUCTCATEGORY_ID`) REFERENCES `PRODUCTCATEGORY`(`PRODUCTCATEGORY_ID`)
    );
      CREATE TABLE
    IF NOT EXISTS `IMAGE` (
        `IMAGE_ID` int(11) NOT NULL AUTO_INCREMENT,
        `IMAGE_LINK` varchar(255) NOT NULL,
        `PRODUCT_ID` int(11) NOT NULL,
        PRIMARY KEY (`IMAGE_ID`),
        FOREIGN KEY (`PRODUCT_ID`) REFERENCES `PRODUCT`(`PRODUCT_ID`)
    );

  CREATE TABLE
    IF NOT EXISTS `PRODUCTCATEGORY` (
        `PRODUCTCATEGORY_ID` int(11) NOT NULL AUTO_INCREMENT,
        `PRODUCTCATEGORY_NAME` varchar(255) NOT NULL,
        `PRODUCTCATEGORY_DESCRIBE` varchar(255) NOT NULL,
        PRIMARY KEY (`PRODUCTCATEGORY_ID`)
    );
    CREATE TABLE
    IF NOT EXISTS `ADMIN` (
        `ADMIN_ID` int(11) NOT NULL AUTO_INCREMENT,
        `ADMIN_NAME` varchar(255) NOT NULL,
        `ADMIN_EMAIL` varchar(255) NOT NULL,
        `ADMIN_PASSWORD` varchar(255) NOT NULL,
        `ADMIN_PHONE` int(20) unique NOT NULL,
        `ADMIN_IMAGE` varchar(255) NOT NULL,
        `ADMIN_ADDRESS` varchar(255) NOT NULL,
        PRIMARY KEY (`ADMIN_ID`)
    );
   CREATE TABLE
    IF NOT EXISTS `password_resets` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `email` varchar(255) NOT NULL,
        `token` varchar(255) NOT NULL,
        `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
        `available` tinyint(1) NOT NULL DEFAULT 1,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
    -- tạo database

-- thêm dữ liệu vào bảng USERS

INSERT INTO
    `CUSTOMER` (
        `CUSTOMER_ID`,
        `CUSTOMER_EMAIL`,
        `CUSTOMER_ADDRESS`,
        `CUSTOMER_PHONE`,
        `CUSTOMER_PASSWORD`,
        `CUSTOMER_NAME`,
        `CUSTOMER_IMAGE`
    )
VALUES (
        1,
        'customer1@gmail.com',
        'Go Vap HCM',
        0373982102,
        'customer1',
        'Customer 1',
        'https://www.w3schools.com/howto/img_avatar.png'
    ), (
        2,
        'customer2@gmail.com',
        'Binh Thanh HCM',
        0988378628,
        'customer2',
        'Customer 2',
        'https://www.w3schools.com/howto/img_avatar.png'
    ), (
        3,
        'customer3@gmail.com',
        'Quan 7 HCM',
        0974860387,
        'customer3',
        'Customer 3',
        'https://www.w3schools.com/howto/img_avatar.png'
    );

INSERT INTO
    `ADDRESS` (
        `ADDRESS_ID`,
        `ADDRESS_DETAIL`,
        `ADDRESS_PHONE`,
        `ADDRESS_NAME`,
        `CUSTOMER_ID`
    )
VALUES (
        1,
        '120 Go Vap HCM',
        0373982102,
        'TUYEN',
        1
    ), (
        2,
        '97 Binh Thanh HCM',
        0988378628,
        'MINH',
        1
    ), (
        3,
        '59 Binh Thanh HCM',
        0974860387,
        'THAO3',
        2
    );

INSERT INTO
    `REVIEW` (
        `REVIEW_ID`,
        `REVIEW_CONTENT`,
        `REVIEW_POINT`,
        `REVIEW_CREATEDAT`,
        `CUSTOMER_ID`,
        `ORDERDETAIL_ID`
    )
VALUES (
        1,
        'San pham xai tot',
        4.5,
        '2019-11-11 00:00:00',
        1,
        1
    );

    INSERT INTO
    `BILL` (
        `BILL_ID`,
        `BILL_CREATEDAT`,
        `BILL_STATUS`,
        `BILL_PAYMENTMETHOD`,
        `BILL_NOTE`,
        `ADDRESS_ID`,
        `CUSTOMER_ID`
    )
VALUES (
        1,
        '2019-11-11 00:00:00',
        1,
        1,
        'Giao vao luc trua',
        1,
        1
    );
    INSERT INTO
    `ORDERDETAIL` (
        `ORDERDETAIL_ID`,
        `ORDERDETAIL_QUANTITY`,
        `ORDERDETAIL_PRICE`,
        `PRODUCT_ID`,
        `BILL_ID`
    )
VALUES (
        1,
        5,
        150.000,
        1,
        1
    );
        INSERT INTO
    `PRODUCT` (
        `PRODUCT_ID`,
        `PRODUCT_NAME`,
        `PRODUCT_PRICE`,
        `PRODUCT_DESCRIBE`,
        `PRODUCT_PROMOTIONPRICE`,
        `PRODUCTCATEGORY_ID`
    )
VALUES (
        1,
        'Thuc pham cho pet',
        30.000,
        'Sua',
        25.000,
        2
    );

        INSERT INTO
    `PRODUCTCATEGORY` (
        `PRODUCTCATEGORY_ID`,
        `PRODUCTCATEGORY_NAME`,
        `PRODUCTCATEGORY_DESCRIBE`
    )
VALUES (
        1,
        'Quan Ao123',
        'Quan ao cho pet'
    ),(
        2,
        'Thuc Pham',
        'Thuc Pham cho pet'
    );
        INSERT INTO
    `IMAGE` (
        `IMAGE_ID`,
        `IMAGE_LINK`,
        `PRODUCT_ID`
    )
VALUES (
        1,
        'https://www.w3schools.com/howto/img_avatar.png',
        1
    ),(
        2,
        'https://www.w3schools.com/howto/img_avatar.png',
        1
    );
    INSERT INTO
    `ADMIN` (
        `ADMIN_ID`,
        `ADMIN_EMAIL`,
        `ADMIN_ADDRESS`,
        `ADMIN_PHONE`,
        `ADMIN_PASSWORD`,
        `ADMIN_NAME`,
        `ADMIN_IMAGE`
    )
VALUES (
        1,
        'admin@gmail.com',
        'Cong Ty HCM',
        0373982103,
        'admin',
        'Admin 1',
        'https://www.w3schools.com/howto/img_avatar.png'
    );
    