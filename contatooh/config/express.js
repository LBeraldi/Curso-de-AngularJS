var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');

module.exports = function() {
  var app = express();

  app.set('port', 8000);

  //  middlewares
  app.use(express.static('./public'));
  app.set('view engine', 'ejs');
  app.set('views','./app/views');

  // novos middlewares
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(require('method-override')());

  // carregamento de rotas logo abaixo
    load('models', {cwd: 'app'})
        .then('controllers')
        .then('routes')
        .into(app);

  return app;
};