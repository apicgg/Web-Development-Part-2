const express = require('express');
const https = require('https');

const app = express();

app.get('/', function (req, res) {
  const url = 'https://api.openweathermap.org/data/2.5/weather?q=Kolkata&appid=c401820d47fc6a51fc00dd54ba35a660&units=metric';
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on('data', function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;

      console.log(temp);

      const weatherDescription = weatherData.weather[0].description;
      console.log(weatherDescription);

      const icon = weatherData.weather[0].icon;
      const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      res.write(`<p>The weather is ${weatherDescription}</p>`);
      res.write(`<h1>The temp of Kolkata is ${temp}degree Celcius</h1>`);
      res.write(`<img src = ${iconURL}>`);
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log('Server is running on port 3000!');
});
