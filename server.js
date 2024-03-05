const express = require('express');
// added code for mongoose to enable connection 
const mongoose = require('mongoose');
// 
const app = express();

const port = 3000;

//enable db connection
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const personSchema = new mongoose.Schema({
  name: String,
  dateOfBirth: Date,
  favoriteColor: String,
  email: String,
});

const Person = mongoose.model('Person', personSchema);

app.get('/people', async (req, res) => {
  try {
    const people = await Person.find();
    console.log(people)
    res.json(people);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
//

// app.use('/'.require('./routes'));


app.use('/', require('./routes'));

 

app.listen(process.env.PORT || port, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || 3000));
});