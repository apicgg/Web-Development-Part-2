const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const client = require('@mailchimp/mailchimp_marketing');

const app = express();

client.setConfig({
  apiKey: '6dd53017a8b2bc17961ad21779b3f504-us14', // TODO - Hide api key with dotenv
  server: 'us14',
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function () {
  console.log('Server is running on port 3000');
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/signup.html');
});

app.post('/', function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  console.log(firstName, lastName, email);

  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
  };
  const run = async () => {
    const response = await client.lists.addListMember('f51dc03501', {
      email_address: subscribingUser.email,
      status: 'subscribed',
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName,
      },
    });

    if (response.statusCode === 200) {
      res.sendFile(__dirname + '/success.html');
    } else {
      res.sendFile(__dirname + '/failure.html');
    }

    console.log(response);
  };

  run();
});

// API Key
// 6dd53017a8b2bc17961ad21779b3f504-us14

// List id
// f51dc03501
