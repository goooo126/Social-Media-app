const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
env.config();


//* ROUTES
const UserRoute = require('./routes/User.route.js')
const AuthRoute = require('./routes/Auth.route.js')

//* MIDDELWARES
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.use('/api/users',UserRoute);
app.use('/api/auth',AuthRoute);



//* CONNECT TO DATA BASE AND RUN THE SERVER:
app.listen(8800, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Server is runzning on port 88000');
  } catch (e) {
    console.log(e);
  }
});
