// libraries import
import express from 'express';
import passport from 'passport';
import authenticateJWT from '../Passport/authenticateJWT.js';
import getRemainingShiftDuration from '../Utils/remainShiftTime.js';

const authRoute = express.Router();  

// ---------------------------------------------------------------------------------------------------
authRoute.get('/logout', (req, res) => {
  console.log('/auth/logout reached. Logging out');
  // Clear the JWT cookie
  res.clearCookie('RichieMiddleRoom', {
    httpOnly: true,  // Ensure it's the same settings as when you set the cookie
    secure: false,    // Ensure cookies set over HTTPS are cleared
    sameSite: 'lax', // Match the sameSite setting
  });
  return res.status(200).json({redirect: true, url: `/`, message: 'logout successfully'})
});

//Log in user using local strategy
authRoute.post('/login', passport.authenticate('custom-login', { failWithError: true, session: false }),
  (req, res) => {
    console.log("/login route reached: successful authentication.");
    const {userObject,token} = req.user;
    const maxAge = getRemainingShiftDuration();
    res.cookie('RichieMiddleRoom', token, {
      httpOnly: true,       // Prevents JavaScript access (XSS protection)
      secure: false,  
      sameSite: 'lax',   // Prevents CSRF 
      maxAge: maxAge,
      path: '/',
    });
    return res.status(200).json({redirect: true, url: `/menu`, message: `login successfully`, userObject})
  }
  ,(err, req, res, next) => {
    const info = req.authInfo;
    const message = (err && err.message) || (info && info.message) ;
    console.log()
    return res.status(401).json({ message })
  }
);

authRoute.get('/test', authenticateJWT, (req, res) => {
  console.log('/auth/test reached.');
  // console.log('Decoded token:', req.user);
  return res.status(200).json({
    isAuthenticated: true,
    user: req.user, // This contains the user data encoded in the token
  });
});

export default authRoute;