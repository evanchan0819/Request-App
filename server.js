const express = require('express')
const app = require('express')()
const bodyParser = require('body-parser');

const username = process.env.USERNAME
const passwordAuth = process.env.PASSWORD

app.use(express.json());
app.use((req, res, next) => {  
    const auth = {login: username, password: passwordAuth}

    // parse login and password from headers
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

    // Verify login and password are set and correct
    if (login && password && login === auth.login && password === auth.password) {
        // Access granted...
        return next()
    }

    res.set('WWW-Authenticate', 'Basic realm="401"')
    res.status(401).send('Authentication required.')
})

app.get("/", (request, response) => {
  response.send("Welcome to The Robloxian Game Studios' Roblox Request Proxy!");
});

// Require the API Routes.
require('./API/routes')(app);

// Make the app listen to the port defined below.
const PORT = 3000
app.listen(PORT, () => {
    console.log("> App Listening to", PORT)
})
