const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

const allowedOrigins = [
  'https://ceisa40.customs.go.id',
  'https://ceisa40-new.customs.go.id',
  'https://ceisa40-dev.customs.go.id',
  'http://localhost:3800'
];
app.use(cors({
    origin: function(origin, callback){
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
            const msg = 'The CORS policy for this site does not ' +
              'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.use(express.static(path.join(__dirname, '../build')));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});
app.listen(4000);