import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 8080;
const mongStr = 'mongodb://localhost:2107/';


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  console.log(`Request Method: ${req.method}`);

  if (!req.headers.authorization) {
    const cookies = req.cookies;
    let token = null;
    if (!cookies) {
      console.log("NO COOKIES FOUND")
    } else {
      token = cookies.BirdieJWT;
      console.log("FOUND COOKIES:", token)
    }
    if (token) {
      req.headers.authorization = token;
    }
  }
  next(); // Pass control to the next middleware or route handler
});

async function appInitiallization(){
  try{
    //connection to mongo db
    mongoose
    .connect(mongStr)
    .then(
        ()=>{console.log(`Successfully connect to ${mongStr}`)}, 
        err =>{console.error(`Error connecting to ${mongStr}: ${err}`)})

    //setting cors for connection from frontend
    app.use(cors({
      origin: 'http://localhost:3000', // frontend URL
      credentials: true,               // Allow credentials (cookies, authorization headers)
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
      allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    }));

    //dynamically import the routes
    const passportConfig = (await import('./Passport/config.js')).default;
    const authRoute = (await import('./Controller/authRoute.js')).default;

    passportConfig(app);
    console.log('-----------------------------------------')
    app
    .use('/auth', authRoute)
    .listen(PORT, () => {console.log(`Server running at http://localhost:${PORT}`)});

  }catch(error){
    console.log("Unexpected error occured during initiallization")
    console.log(error.message)
    process.exit(1);
  }
}

await appInitiallization();