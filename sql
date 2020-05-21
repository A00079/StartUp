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