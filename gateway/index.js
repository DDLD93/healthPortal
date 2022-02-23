
// importing  Packages
var express = require("express");
const proxy = require('http-proxy-middleware').createProxyMiddleware
var cors = require("cors");
var cfg = require("./cfg");
const http = require('http');
const {socketSession} = require("./conn/socketConn")




// 3. Initialize the application
var app = express();
const server = http.createServer(app);



app.use(express.urlencoded({ extended: false }));

app.use(cors({
  origins: '*:*'
}));

app.use(express.json());

const io = require("socket.io")(server, {
  // ...
});


io.on('connection', (socket) => {
    console.log('a user connected');

    setInterval(() => {
      io.emit("online", socket.client.conn.server.clientsCount)
    }, 55000);

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});






app.use('/api/users', require('./router/userRoutes'))
var apiProxy = proxy('/newform', {target: 'http://localhost:3000'});
app.use(apiProxy)
app.use('/api/forms', require('./router/formsRoutes'))


server.listen(cfg.LISTEN_PORT, function () {
  console.log(`app listening on ${cfg.LISTEN_PORT}`);
});
