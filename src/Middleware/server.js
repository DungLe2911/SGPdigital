import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser'; 
import os from 'os';

const app = express();
const PORT = 8080;
const mongStr = 'mongodb://localhost:2107/';


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const getLocalIP = () => {
  const interfaces = os.networkInterfaces();
  for (const iface of Object.values(interfaces)) {
    for (const config of iface) {
      if (config.family === 'IPv4' && !config.internal) {
        return config.address; // e.g., '192.168.0.10'
      }
    }
  }
  return null;
};



app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  console.log(`Request Method: ${req.method}`);

  if (!req.headers.authorization) {
    const cookies = req.cookies;
    let token = null;
    if (!cookies) {
      console.log("NO COOKIES FOUND")
    } else {
      token = cookies.RichieMiddleRoom;
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

    // setting cors for connection from frontend
    const allowedOrigins = [
      `http://127.0.0.1:3000`,
      'http://localhost:3000',
    ];
    const IpAddr = getLocalIP();
    if(IpAddr !== null){
      allowedOrigins.push(`http://${IpAddr}:3000`)
    }
    const corsOptions = {
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-XSRF-TOKEN', 'Accept', 'Origin'],
      credentials: true,
      optionsSuccessStatus: 200 
    };
    app.options('/', (req, res) => {
      console.log('in OPTIONS request for ALL routes')
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
      res.header('Access-Control-Allow-Credentials', 'true');
      return res.sendStatus(200); // This ensures no further processing of the OPTIONS request
    });
    app.use(cors(corsOptions));

    //dynamically import the routes
    const passportConfig = (await import('./Passport/config.js')).default;
    const authRoute = (await import('./Controller/authRoute.js')).default;

    passportConfig(app);
    console.log('-----------------------------------------')
    app
    .use('/auth', authRoute)
    .listen(PORT, '0.0.0.0', () => {console.log(`Server running at http://localhost:${PORT}`)});

  }catch(error){
    console.log("Unexpected error occured during initiallization")
    console.log(error.message)
    process.exit(1);
  }
}

await appInitiallization();