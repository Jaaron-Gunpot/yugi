const models = require('../models');

const { Account } = models;

const loginPage = (req, res) => {
  res.render('login');
};

const changePage = (req, res) => {
  res.render('change');
};

const notFound = (req, res) => {
  res.status(404).render('404');
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const login = (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;

  if (!username || !pass) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  return Account.authenticate(username, pass, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'Wrong username or password!' });
    }

    req.session.account = Account.toAPI(account);

    return res.json({ redirect: '/maker' });
  });
};

const signup = async (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  if (!username || !pass || !pass2) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (pass !== pass2) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    const hash = await Account.generateHash(pass);
    const newAccount = new Account({ username, password: hash });
    await newAccount.save();
    req.session.account = Account.toAPI(newAccount);
    return res.json({ redirect: '/maker' });
  } catch (err) {
    console.log(err);
    // 11000 is the code for duplicate error
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Username already in use' });
    }
    return res.status(500).json({ error: 'An error occurred' });
  }
};

const changePassword = async (req, res) => {
  if (!req.body.oldPass || !req.body.newPass) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const oldPass = await Account.generateHash(req.body.oldPass);
    const newPass = await Account.generateHash(req.body.newPass);
    if (oldPass === newPass) {
      return res.status(400).json({ error: 'New password must be different from the old password' });
    }
    await Account.findOneAndUpdate({ _id: req.session.account._id }, { password: newPass });
    req.session.destroy();
    // bring them back to main page
    return res.status(200).json({ message: 'Password changed successfully', redirect: '/' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = {
  loginPage,
  logout,
  login,
  signup,
  changePassword,
  changePage,
  notFound,
};
