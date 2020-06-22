var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var check=require('./middleware/checkSingIn')
var app = express();

//rutas front
var articulosRouter = require('./routes/frontEnd/articulos');

//rutas admin
var usuarioRouter = require('./routes/admin/usuarios');
var productoRouter = require('./routes/admin/producto');
var fraganciaRouter = require('./routes/admin/fragancia');
var marcaRouter = require('./routes/admin/marca');
var categoriaRouter = require('./routes/admin/categoria');
var punteraRouter = require('./routes/admin/puntera');

var cookieParser = require('cookie-parser');
var session = require('express-session');
mongoose.connect('mongodb://localhost:27017/almacenBackEnd', {useNewUrlParser: true, useUnifiedTopology: true});



app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

  next();
});
app.use(cookieParser());
app.use(session({
  secret: 'El secreto de tus ojos',
  resave : false , 
  saveUninitialized : false, 
  cookie: { maxAge: 12*3600000 }
}))



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Bootstrap 4 y librerías necesarias
// app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
// app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
// app.use('/js', express.static(__dirname + '/node_modules/popper.js/dist'));
// app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));

//rutas front
app.use('/', articulosRouter);
//rutas admin
app.use('/admin/users', usuarioRouter);
app.use('/admin/producto', productoRouter);
app.use('/admin/fragancia', fraganciaRouter);
app.use('/admin/marca', marcaRouter);
app.use('/admin/categoria', categoriaRouter);
app.use('/admin/puntera', punteraRouter);
app.get('/admin/',check.checkSignInLogin,function(req,res){
  res.render('shared/home')
  });
app.get('/admin/index',check.checkSignIn,function(req,res){
  var data={
    name:req.session.nameuser,
    id:req.session.iduser,
    img:req.session.imguser,
    email:req.session.email
   }
  res.render('shared/index',{data})
  });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
