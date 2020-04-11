// const http = require('http');
// const routes = require('./routes')
const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const path = require('path')

app.use(bodyParser.urlencoded({extended: false}))

// app.use('/',(req,res,next) => {
//   console.log('This will always work');
//   next();
// });
app.use('/admin',adminRoutes);
app.use(shopRoutes);
app.use(express.static(path.join(__dirname,'public')));

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname,'views','404.html'));
});


//const server = http.createServer(app);
  // console.log(req.url, req.method, req.headers);
  // process.exit();

app.listen(3000);
