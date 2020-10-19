const SECONDS_IN_30_DAYS = 2592000000;

const session = (
    require('express-session')(
        {
            key: process.env.ES_KEY,
            secret: process.env.SESSION_SECRET,
            store: require('./sessionStore'),
            resave: false,
            saveUninitialized: true,
            cookie: {
                maxAge: SECONDS_IN_30_DAYS,
                sameSite: true,
            },
        },
    )
);

module.exports = session;
