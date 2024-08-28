db.createUser({
    user: 'username1',
    pwd: 'password1',
    roles: [
        {
            role: 'dbOwner',
            db: 'the_database'
        }
    ]
});

db.createCollection('contacts');