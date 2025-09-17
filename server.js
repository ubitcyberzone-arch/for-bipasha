const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if(username.toLowerCase() === 'user' && password === '2000') {
        res.sendFile(path.join(__dirname, 'public', 'ALL SER.html'));
    } else {
        res.send('<h2 style="color:red;text-align:center;">Invalid Credentials!</h2><a href="/">Go Back</a>');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));