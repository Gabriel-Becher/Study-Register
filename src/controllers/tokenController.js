require("dotenv").config();

const { where } = require("sequelize");
const User = require("../models/User");

const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;

class TokenController {
  async generateToken(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return { status: 401, errors: ["Invalid input"], data: [] };
    }
    let user;
    try {
      user = await User.findOne({
        where: { email },
      });
      console.log(user);
    } catch (error) {
      return res
        .status(500)
        .json({ errors: error.errors?.map((x) => x.message), data: [] });
    }
    const valid = await user.checkPassword(password);
    if (!valid) {
      return res.status(401).json({ errors: ["Invalid password"], data: [] });
    }
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email,
      },
      secret,
      {
        expiresIn: "5s",
      }
    );
    return res.status(200).json({ errors: [], data: token });
  }

  async verifyToken(req, res, next) {
    const auth = req.headers["authorization"];
    if (!auth) {
      return res.status(401).json({ errors: ["No token provided"], data: [] });
    }
    const token = auth.split(" ")[1];
    if (!token) {
      return res.status(401).json({ errors: ["No token provided"], data: [] });
    }
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ errors: ["Unauthorized"], data: [] });
      }
      req.user_id = decoded.id;
      req.name = decoded.name;
      req.user_email = decoded.email;
      next();
    });
  }
}

module.exports = new TokenController();
