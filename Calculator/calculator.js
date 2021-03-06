const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req, res) {
  var num1 = Number(req.body.n1);
  var num2 = Number(req.body.n2);

  var result = num1 + num2;

  res.send('The result is ' + result);
});

app.get('/bmicalculator', function (req, res) {
  res.sendFile(__dirname + '/bmiCalculator.html');
});

app.post('/bmicalculator', function (req, res) {
  var weight = Number(req.body.w);
  var height = Number(req.body.h);

  var n = weight / (height * height);

  res.send('Your BMI is ' + n);
});

app.listen(3000, function () {
  console.log('Server has been started!');
});
