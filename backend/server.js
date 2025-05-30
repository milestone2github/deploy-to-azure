require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require("cors");
const { connetToTransactionsDb } = require("./dbConfig/connection");
const path = require('path')
const PORT = process.env.PORT || 80;
const app = express();
const MongoStore = require("connect-mongo");
const transactionDbConnection = connetToTransactionsDb();


// Configure session middleware
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      dbName: "mftransactiondb", // database name
      ttl: 24 * 60 * 60, // 1-day session expiration
    }),
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// Get allowed origins from environment variable
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",") : [];

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
// serve frontend build from here 
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Middleware to provide db access
function dbAccess(req, res, next) {
  req.transactionsDb = transactionDbConnection;
  next();
}

app.use(dbAccess); // Use the middleware

// Example API endpoint
console.log('env-var: ', process.env.FRONTEND_ORIGIN);

app.get("/api/hello", (req, res) => {
  // modify or check session here
  console.log("Session Object:", req.session);

  let message = "Hello from the backend!" + process.env.FRONTEND_ORIGIN;
  res.json({ message });
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})