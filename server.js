const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const PORT = 3000;
const verifyJWT = require("./middleware/verifyJWT")

app.use(express.json());


//middleware for cookies
app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT)
app.use('/employees', require('./routes/api/employees'));


app.use((req,res) => {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"))
})
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});