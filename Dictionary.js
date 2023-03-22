const express = require('express');
const app = express();
const helmet = require("helmet"); 
const words = require('./words');
const debug = require('debug')('app:debug'); 

if (app.get('env') == 'development') {
    debug('development env...');
}

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()); 
app.use(express.static('views')); 

app.use(helmet()); 

app.use('/api/words', words);
app.get('/', (req, res) => {
    res.sendFile('./views/dict.html', { root: __dirname });
});

const port = process.env.PORT || 3000; 
app.listen(port, () => console.log(`Listening on port ${port}...`));