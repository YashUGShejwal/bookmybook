const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
const port = process.env.PORT || 5001;
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
//using middleware to parse json data
app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}))
app.use(express.urlencoded({ extended: true }));

require('./db/conn');
app.use('/', require('./routes/userRoutes'));
app.use('/order', require('./routes/orderRoutes'));
app.use('/books', require('./routes/bookRoutes'));

app.listen(process.env.PORT || 5001, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
