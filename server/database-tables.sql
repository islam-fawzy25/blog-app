
create table users (
id   int auto_increment  primary key,
user_name  varchar(255) not null,
email varchar(255) not null,
password varchar(255) not null,
user_img varchar(255) ,
created_date date default CURRENT_TIMESTAMP(),
isActive boolean default true,
updated_date date default null,
isBlocked boolean default false,
blocked_date date default null

);


create table posts (
id   int auto_increment  primary key,
title  varchar(255) not null,
description text not null,
date datetime not null,
post_img varchar(255) ,
cat varchar(255) ,
isActive boolean default true,
updated_date date default null,
isBlocked boolean default false,
blocked_date date default null,
user_id int not null ,
 foreign key (user_id) references users(id) on update cascade  on delete cascade
);

