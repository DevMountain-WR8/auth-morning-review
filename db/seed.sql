create table morning_review_users (
    user_id serial primary key,
    email varchar(100),
    username varchar(20),
    profile_picture varchar(250),
    password varchar(250)
);