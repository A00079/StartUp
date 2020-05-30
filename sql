var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'sql12.freemysqlhosting.net',
    user: 'sql12341263',
    password: '1bFWSdFWBT', 
    database: 'sql12341263'
});

===========================================================

CREATE TABLE `products` (
 `id` int(10) NOT NULL AUTO_INCREMENT,
 `name` varchar(255) NOT NULL,
 `price` int(10) NOT NULL,
 `description` varchar(255) DEFAULT NULL,
 `stock` tinyint(4) DEFAULT '1',
 `image` varchar(255) NOT NULL,
 `shop_id` int(11) NOT NULL,
 PRIMARY KEY (`id`),
 FOREIGN KEY (shop_id) REFERENCES shop(id)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1


===========================================================

create table shop (
    id int(10) PRIMARY KEY AUTO_INCREMENT not null,
    name varchar(255) not null,
    shopId varchar(255) not null UNIQUE,
    shopPassword varchar(255) not null,
	shopStatus tinyint DEFAULT 1
    );

===========================================================

create table shopaddress (
    id int(10) PRIMARY KEY AUTO_INCREMENT not null,
    shopNo int(10) not null,
    complex varchar(50) not null,
    landmark varchar(50),
    street varchar(50) not null,
    area varchar(50) not null, 
    city varchar(50)not null
);

=============================================================

SELECT  shop.id, shop.name, shop.shopId, shop.shopPassword, shop.shopStatus, shop.phone, shopaddress.shopNo, shopaddress.complex, shopaddress.landmark, shopaddress.street, shopaddress.area, shopaddress.city FROM shop INNER JOIN shopaddress on shop.id = shopaddress.shop_id;

=============================================================

ALTER TABLE products
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;


==============================================================

UPDATE usersaddress SET flatNo = ?, complex = ?, landmark = ?, street = ?, area = ?, city = ?, district = ?, state = ? WHERE user_id = ?';

==============================================================

SELECT registeredusers.fullName, registeredusers.email, registeredusers.phone, usersaddress.flatNo, usersaddress.complex, usersaddress.landmark, usersaddress.street, usersaddress.area, usersaddress.city, products.name, products.price, products.image, orderedproducts.quantity FROM orders INNER JOIN registeredusers ON orders.user_id=registeredusers.id INNER JOIN usersaddress ON registeredusers.id=usersaddress.user_id INNER JOIN orderedproducts ON orderedproducts.order_id=orders.id INNER JOIN products on products.id=orderedproducts.product_id WHERE orders.id = 1


==================================================================




            CREATE TABLE `registeredusers` (
 `id` int(10) NOT NULL AUTO_INCREMENT,
 `fullName` varchar(255) NOT NULL,
 `email` varchar(255) NOT NULL,
 `googleToken` varchar(255) NOT NULL,
 `fcmToken` varchar(255) DEFAULT NULL,
 `subscribed` tinyint(4) DEFAULT '0',
 `phone` varchar(13) NOT NULL,
 `userPassword` varchar(255) NOT NULL,
 PRIMARY KEY (`id`),
 UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=latin1



+++++++++++++++++++++++++++++++++++++++

update and delete the images on patch and delete requests for product by admin.

solve the incorrect email while logging in as a user

Create CRUD for product categories 

check for time delay error while setting previous insert ID in ordered products


+++++++++++++++++++++++++++++++++++++++
    



