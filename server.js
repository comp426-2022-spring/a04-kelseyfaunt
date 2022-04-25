
const args = require('minimist')(process.argv.slice(2))

console.log(args)

const help = (`
server.js [options]

--port	Set the port number for the server to listen on. Must be an integer
            between 1 and 65535.

--debug	If set to true, creates endlpoints /app/log/access/ which returns
            a JSON access log from the database and /app/error which throws 
            an error with the message "Error test successful." Defaults to 
            false.

--log		If set to false, no log files are written. Defaults to true.
            Logs are always written to database.

--help	Return this message and exit.
`)
// If --help or -h, echo help text to STDOUT and exit
if (args.help || args.h) {
    console.log(help)
    process.exit(0)
}

const express = require('express');
const app = express();
const db = require('./database.js')
const fs = require('fs')
const morgan = require('morgan')

const port = args.port || process.env.PORT || 5555

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port))
});

app.use( (req, res, next) => {
    // Your middleware goes here.
    let logdata = {
        remoteaddr: req.ip,
        remoteuser: req.user,
        time: Date.now(),
        method: req.method,
        url: req.url,
        protocol: req.protocol,
        httpversion: req.httpVersion,
        status: res.statusCode,
        referer: req.headers['referer'],
        useragent: req.headers['user-agent']
    }

    const stmt = db.prepare('INSERT INTO  accesslog (remoteaddr, remoteuser, time, method, url, protocol, httpversion, status, referer, useragent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
    const info = statement.run(logdata.remoteaddr, logdata.remoteuser, logdata.time, logdata.method, logdata.url, logdata.protocol, logdata.httpversion, logdata.status, logdata.referrer, logdata.useragent)
    next();
    })

    //methods
    function coinFlip() {
        return Math.random() < 0.5 ? 'heads':'tails';
      }
    
      function coinFlips(flips) {
        if(flips < 1) {
          flips = 1;
        }
        var array = [];
        for (var i=0; i<flips; i++) {
          array.push( Math.random() < 0.5 ? 'heads':'tails');
        }
      
        return array;
      
      }
    
      function countFlips(array) {
    
        var final = { tails: 0, heads: 0 };
        for(var i = 0; i<array.length; i++) {
          if(array[i] == "heads") {
            final.heads++;
          } else if(array[i] == "tails") {
            final.tails++;
          } 
        }
        if(final.heads == 0) {
          return "{ tails: "+final.tails+" }";
        } else if(final.tails == 0) {
          return  "{ heads: "+final.heads+" }";
        }
        return final;
      
      }
    
      function flipACoin(call) {
        if(call !== 'heads' && call !== 'tails') {
          console.log("Error: no input. Usage: node guess-flip --call=[heads|tails]");
          return;
        }
        var final = { call: '', flip: '', result: '' };
        final.call = call;
        final.flip = coinFlip();
        if(final.flip == final.call) {
          final.result = 'win';
        } else {
          final.result = 'lose';
        }
        
        return final;
      }
      // end of methods

    if(args.log) {
        const WRITESTREAM = fs.createWriteStream('access.log', { flags: 'a' })
        // Set up the access logging middleware
        app.use(morgan('accesslog', { stream: WRITESTREAM }))
    }

    if (args.debug){
        app.get('/app/log/access', (req,res) => {
            const stmt = db.prepare('SELECT * FROM accesslog').all()
            res.statusCode = 200
            res.json(stmt)
        });
        
        app.get('/app/error', (req,res) => {
            throw new Error('Error test successful')
        });
      }


app.get('/app/', (req, res, next) => {
        res.statusCode = 200;
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
 })

app.get('/app/flip/', (req, res) => {
        const flip = {"flip": coinFlip()};
        res.json(flip);
})

app.get('/app/flips/:number', (req, res) => {
    const flips = coinFlips(req.params.number);
    const count = countFlips(flips);
    res.json({"raw": flips, "summary": count});
})

app.get('/app/flip/call/heads', (req, res) => {
    const temp = flipACoin('heads');
    res.json(record);
})

app.get('/app/flip/call/tails', (req, res) => {
    const temp = flipACoin('tails');
    res.json(record);
})

app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});

  
  
  