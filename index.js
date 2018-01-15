const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 6301;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/js', express.static('src'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => res.render('index'));

app.listen(port, () => console.log(`Ready to accept connections on port ${port}`));