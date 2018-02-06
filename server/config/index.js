module.exports = {
    database: 'mongodb://Test:qwerty@ds119028.mlab.com:19028/passport-test',
    port: 3005,
    secret: 'passport-test',
    githubClientId: '6592b055f05b2e29694e',
    githubClientSecret: '28a40e6797b759afb7d85b19705a962d58b7a430',
    githubCallbackUrl: 'http://localhost:3005/api/auth/github/callback',
    basePageRedirect: 'http://localhost:3001',
    successRedirect: 'http://localhost:3001/#login-success',
    failureRedirect: 'http://localhost:3001',
    corsOptions: {
        origin: 'http://localhost:3001',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true
    },
    sessionOptions: {
        secret: 'passport_test',
        resave: true,
        saveUninitialized: true
    },
    multipartyOptions: {
        autoFiles: true
    }
};
