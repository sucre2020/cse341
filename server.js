const express = require('express');
const app = express();

const path = require('./controllers/lesson');

app.get('/', path.efitaRoute);
app.get('/lafulji', path.lafuljiRoute);
 
// app.get('/', (req, res) => {
//   res.send("Efita Effiom");
// });

 
// app.get('/efita', (req, res) => {
//     res.send("Lafulji Effiom");
//   });


 
const port = 3000;

app.listen(process.env.PORT || port, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || 3000));
});

