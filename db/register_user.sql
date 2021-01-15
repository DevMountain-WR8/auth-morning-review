insert into morning_review_users (
    email,
    username,
    profile_picture,
    password
) values (
    ${email},
    ${username},
    ${profilePicture},
    ${hash}
)
returning user_id, email, username, profile_picture;