const adminAuth = (req, res, next) => {
  console.log("Admin auth is checked");
  const token = "abc";

  const isAdminAuthorized = (token === "abc");
  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized Request");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("User auth is checked");
  const token = "abc";

  const isUserAuthorized = token === "abc";
  if (!isUserAuthorized) {
    res.status(401).send("Unauthorized Request");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth
};
