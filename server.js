//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory

app.use(function(req, res, next) {
     //Heroku stores the origin protocol in a header variable. The app itself is isolated within the dyno and all request objects have an HTTP protocol.
     if (req.get('X-Forwarded-Proto')=='https' || req.hostname == 'localhost') {
        //Serve Angular App by passing control to the next middleware
        next();
    } else if(req.get('X-Forwarded-Proto')!='https' && req.get('X-Forwarded-Port')!='443'){
        //Redirect if not HTTP with original request URL
        res.redirect('https://' + req.hostname + req.url);
    }
  });

app.use(express.static(__dirname + '/dist/calculator'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/calculator/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);