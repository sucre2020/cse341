const express = require('express');
const app = express();
 
app.get('/', (req, res) => {
  res.send("Hello, This is Efita Effiom. I'm reworking/starting my week one assignment. Happy to be back");
});

 
app.get('/efita', (req, res) => {
    res.send("Efita Effiom");
  });
 
const port = 3000;

app.listen(process.env.PORT || port, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || 3000));
});