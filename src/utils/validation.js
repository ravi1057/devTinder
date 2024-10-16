const validator = require("validator");

const validateSingUpData = (req) => {

  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email Id is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password enter a storng password");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFileds = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "age",
    "about",
    "gender",
    "skills",
  ];
  const isEditAllowed = Object.keys(req.body).every((filed) =>
    allowedEditFileds.includes(filed)
  );
  return isEditAllowed;
};

module.exports = {
  validateSingUpData,
  validateEditProfileData,
};
