const express = require('express');
const app = express();
const path = require('path');

// স্ট্যাটিক ফাইল সার্ভ করা (CSS, JS, Images)
app.use(express.static(path.join(__dirname, 'public')));

// হোমপেজে login.html দেখানো
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// সার্ভার চালু
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
