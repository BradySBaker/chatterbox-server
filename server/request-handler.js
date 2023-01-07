/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

// var messages = [{username: 'Jono', text: 'Do my bidding!'}];

var fs = require('fs');

var messages = [];


var readMessages = function(cb) {
  fs.readFile('server/messageFile.txt', 'utf8', function(err, data) {
    if (err) {
      console.log('err ', err);
    }
    cb(data);/////////////////////////////////////////////////////////////////////investigate why cb works here, but when using "return data" it returns undefined.

    //
  });
};




var requestHandler = function(request, response) {

  readMessages((data) => {
    messages = JSON.parse(data);
  });



  //I was thinking for post what we can do is first push the new content to are messages array

  //messages.push(data)
  //Then delete everything in messageFile.txt and overwrite it will the new stringifed messages

  //that sounds like a good plan!

  //Hopefully that will work I think theres an issue with asynhcronous where we send back the data before messages is updated from the file but it still sends later on

  //yeah, ill definitely give that a try when i refactor a bit. when i have time

//Same good working with you!!!!! We can do so much more now with are server side knowledge!


//same! I'll commit n push now

//yup, agreed! TA here we come! lol


  var defaultCorsHeaders = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept, authorization',
    'access-control-max-age': 10 // Seconds.
  };
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.

  console.log('Serving request type ' + request.method + ' for url ' + request.url);


  // The outgoing status.
  var statusCode = 404;

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;


  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.

  headers['Content-Type'] = 'application/json';


  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.

  var dataBody = 'ERROR';


  if (request.url === '/classes/messages') {
    if (request.method === 'GET') {
      statusCode = 200;
      console.log(messages);
      dataBody = JSON.stringify(messages);
    } else if (request.method === 'POST') {
      statusCode = 201;
      request.on('data', (data) => {
        var message = JSON.parse(data);
        message['message_id'] = messages.length + 1;
        dataBody = JSON.stringify(messages);
        if (message.username && message.text) {
          messages.push(message);
        } else {
          statusCode = 400;
        }
        response.writeHead(statusCode, headers);
        response.end(dataBody);
      });
    } else if (request.method === 'OPTIONS') {
      statusCode = 200;
      dataBody = 'Sent options';
    }
  }
  if (request.method !== 'POST') {
    response.writeHead(statusCode, headers);
    response.end(dataBody);
  }

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.

};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

module.exports = {requestHandler};