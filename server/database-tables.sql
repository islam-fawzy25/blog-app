
create table users (
id   int auto_increment  primary key,
user_name  varchar(255) not null,
email varchar(255) not null,
password varchar(255) not null,
user_type enum("admin","moderator","user"),
user_img varchar(255) ,
user_created_date datetime default CURRENT_TIMESTAMP(),
isActive boolean default true,
isPublished boolean default true,
updated_date date default null,
isBlocked boolean default false,
blocked_date date default null
);


create table posts (
id   int auto_increment  primary key,
title  varchar(255) not null,
description text not null,
post_created_date  datetime not null default CURRENT_TIMESTAMP(),
post_img varchar(255) ,
cat varchar(255) ,
isActive boolean default true,
updated_date date default null,
isBlocked boolean default false,
blocked_date date default null,
user_id int not null ,
 foreign key (user_id) references users(id) on update cascade  on delete cascade
);
