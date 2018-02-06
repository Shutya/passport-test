const passportInitializer = (passport, ...strategies) => {
        passport.serializeUser((user, done) => done(null, user));
        passport.deserializeUser((user, done) => done(null, user));
        strategies.forEach(strategy => {
            passport.use(strategy.name, strategy.core);
        })
    };

module.exports = passportInitializer;
