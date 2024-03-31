const bcrypt = require("bcrypt");

//hashing password logic
const hashPassword = async (password) => {
  try {
    // generate salt
    const saltRounds = await bcrypt.genSalt(10);
    // hash password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword; // return the hashed password
  } catch (error) {
    console.log(error);
  }
};
//compare logic
const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword); //it compares the plain password and hashedPassword
};
module.exports = { hashPassword, comparePassword };
