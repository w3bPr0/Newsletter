const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname +'/signup.html')
})

app.post('/', function(req, res){
    res.send("Dear " + req.body.FName + " " + req.body.LName.toUpperCase() +", you have successfully subscribed for our newslettre with the email " + req.body.Email);

    const firstName = req.body.FName;
    const lastName = req.body.LName;
    const email = req.body.Email;

    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);


    const url = 'https://us14.api.mailchimp.com/3.0/lists/7554a0da51';

    const options = {
        method: 'POST',
        auth: 'newsletter:4b8237eb5c38ea71bdc257b5a4557969-us14'
    }
    const request = https.request(url, options, function(response){
        response.on('data', function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();

});

app.listen(process.env.PORT || 3000, function(){
    console.log('server is running on port 3000')
});


// api key
// 4b8237eb5c38ea71bdc257b5a4557969-us14


// list id
// 7554a0da51

