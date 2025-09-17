const express = require('express');
const path = require('path');
const app = express();

// Serve static files from public
app.use(express.static(path.join(__dirname, 'public')));

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Serve login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Handle login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if(username.toLowerCase() === 'user' && password === '2000') {
        res.sendFile(path.join(__dirname, 'public', 'ALL SER.html'));
    } else {
        res.send('<h2 style="color:red;text-align:center;">Invalid Credentials!</h2><a href="/">Go Back</a>');
    }
});

// Use Render PORT or fallback 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
