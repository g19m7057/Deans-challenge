const app = require('./app');
const port = process.env.PORT || 4000;

app.listen(port, (err) => {
    if(err){
        return console.log(`Could not connect to port ${port}`);
    }
    console.log(`Successfully connected to port ${port}`)
});

// log to file instead with winston logger