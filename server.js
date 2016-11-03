'use strict';

// content of index.js
const http = require('http');
const port = 8085;
const serverName = 'fake-ms';
var os = require('os');
var queueCount = 0;
var increment = true

var Router = (req, res) => {
    if (req.method === 'GET') {
        switch (true) {
            case req.url === '/health':
            case req.url === '/health/':
            	if (queueCount > 50) {
            		increment = false;
            	}
            	if (queueCount <= 0 ) {
            		increment = true;
            	}
            	queueCount = increment? queueCount + 10 : queueCount - 10;
                routeSuccess(req, res,  { queued: queueCount} );
                break;
            case req.url === '/':
                routeSuccess(req, res,  { hostname: os.hostname()} );
                break;
            default:
                handleUnknownRoute(req, res);
        }
    } else {
        handleUnknownRoute(req, res);
    }

};



var handleUnknownRoute = (req, res) => {
    var result = {
        url: req.url,
        status: 'NotFound'
    };
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(result));
};

var routeSuccess = function (req, res, result) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(result));
};


const server = http.createServer(Router);

server.listen(port, (err) => {
    if (err) {
        return console.err(serverName + ': server error', err)
    }
    console.log('server ' + serverName + ' listening on port: ' + port);
});