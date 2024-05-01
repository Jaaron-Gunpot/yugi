const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  // to be evaluated at a later time
  app.get('/maker', mid.requiresLogin, controllers.Player.getResponse);
  // app.post('/maker', mid.requiresLogin, controllers.Domo.makeDomo);

  app.get('/', controllers.Account.loginPage);

  app.get('/getMessages', mid.requiresLogin, controllers.Message.getMessages);
  app.post('/sendMessage', mid.requiresLogin, controllers.Message.sendMessage);

  app.get('/change', mid.requiresLogin, controllers.Account.changePage);

  app.post('/changePass', mid.requiresLogin, controllers.Account.changePassword);
  app.post('/saveCard', mid.requiresLogin, controllers.Card.saveCard);
  app.get('/getCards', mid.requiresLogin, controllers.Card.getCards);

  app.get('/*', controllers.Account.notFound);
};

module.exports = router;
