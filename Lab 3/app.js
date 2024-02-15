const express = require('express');
const router = require('./routes/router');

const app = express();

app.use('/public', express.static('public'));

app.set('view engine', 'pug');

app.use(express.json());

app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});