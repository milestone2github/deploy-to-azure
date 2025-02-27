const express = require('express');
const port = 80;
const path = require('path')
const app = express();

// Example API endpoint
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

// serve frontend build from here 
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})