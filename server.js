
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const https = require('https');

const app = express();

// Set up middleware to parse JSON data
app.use(bodyParser.json());

// Serve static files (but not HTML files directly)
app.use( express.static(path.join(__dirname, 'public')));
//app.use('/js', express.static(path.join(__dirname, 'public', 'js')));
//app.use('/images', express.static(path.join(__dirname, 'public', 'images')));


// Serve index.html on the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/', (req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName;
    const email = req.body.email;
    console.log(firstName, lastName, email);

    const apikey ="50a224297081bc18eb40cf7062625ed8-us13";
    const listId = "a191d75f4e";
    const url ="https://us13.api.mailchimp.com/3.0/lists/a191d75f4e";
    const options = {
        method: "POST",
        auth: "ta:50a224297081bc18eb40cf7062625ed8-us13"
    }
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data);
    
    const request = https.request(url, options, (response) => {
        response.on("data", (data) => {
            console.log(JSON.parse(data));
        })
        response.on("end", () => {
            if (response.statusCode === 200) {
                // Successful response from Mailchimp
                res.json({ message: 'Subscription successful', firstName, lastName });
            } else {
                // Failed response from Mailchimp
                res.status(response.statusCode).json({ message: 'Subscription failed' });
            }
        });
    })
    request.write(jsonData);
    request.end();
    console.log(firstName,lastName,email);
});


// Start the server
const PORT = process.env.PORT || 3301;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
// email.js
// Displaying email.js
