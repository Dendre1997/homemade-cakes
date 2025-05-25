const express = require('express');
const app = express();
const dbRoute = require('./route');

app.use('/api', dbRoute);

app.listen(3000, () => {
  console.log('🚀 Server is running on http://localhost:3000');
});