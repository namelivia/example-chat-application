//File: routes/account.js
var passport = require('passport');
var Account = require ('../models/account');
module.exports = function(app) {

  app.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username
	}), req.body.password, function(err, account) {
        if (err) {
          	res.render("login");
        }
        passport.authenticate('local')(req, res, function () {
          	res.render("hall",{user: req.user.username});
			console.log("Registro nuevo usuario.Usuario:"+req.body.username+"Contraseña:"+req.body.password);
        });
    });
  });

  app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
	  if (err) { return next(err) }
	    if (!user) {
          res.render("login");
		}
		req.logIn(user, function(err) {
		  if (err) {
			res.render("login");
		  } else {
          	res.render("hall",{user: req.user.username});
		  }
		});
	  })(req, res, next);
	});

  app.get('/logout', function(req, res) {
  	req.logout();
    res.render("login");
  });
}
