const loginLogout = (req, res) => {
    res.send(
      req.oidc.isAuthenticated()
        ? `Logged in as ${req.oidc.user.name}`
        : 'Logged out'
    );
  };
  
  module.exports = { loginLogout };