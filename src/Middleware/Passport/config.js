import passport from 'passport';
import customStrategy from './customStrategy.js';

const passportConfig = (app) => {
    passport.use('custom-login',customStrategy);
    app.use(passport.initialize())
}

export default passportConfig;