const express = require('express');
const PORT = process.env.PORT || 80;
const path = require('path')
require('dotenv').config();
const app = express();

// Example API endpoint
console.log('env-var: ', process.env.FRONTEND_ORIGIN);
app.get("/api/hello", (req, res) => {
  let message = "Hello from the backend!" + process.env.FRONTEND_ORIGIN;
  res.json({ message });
});

// serve frontend build from here 
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})