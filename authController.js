//Things you need for auth
//1. Set up sessions (express-session)
//2. Build a db table for users data
//3. Create an SQL to retrieve user info from the users table
//4. Create an SQL to insert into the users table
//5. Install and require bcryptjs

const bcrypt = require('bcryptjs');

module.exports = {
    register: async(req, res) => {
        const { email, username, profilePicture, password } = req.body;
        const db = req.app.get('db');

        const [foundUser] = await db.check_user({email});
        if(foundUser){
            return res.status(400).send('Email already in use')
        }

        let salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const [newUser] = await db.register_user({email, username, profilePicture, hash});

        req.session.user = newUser;
        res.status(201).send(req.session.user);
    },
    login: async(req, res) => {
        const { email, password } = req.body;
        const db = req.app.get('db');

        const [foundUser] = await db.check_user({email});
        if(!foundUser){
            return res.status(404).send('Account not found')
        }

        const authenticated = bcrypt.compareSync(password, foundUser.password);
        if(!authenticated){
            return res.status(401).send('Password is incorrect')
        }

        delete foundUser.password;
        req.session.user = foundUser;
        res.status(202).send(req.session.user);
    },
    logout: (req, res) => {
        req.session.destroy();
        res.status(200).send(req.session);
    }
}