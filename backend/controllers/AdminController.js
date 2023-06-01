import Adminloging from "../models/AdminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUserAdmin = async (req, res) => {
  try {
    const admins = await Adminloging.findAll({
      attributes: ["id", "Username", "Password"],
    });
    res.json(admins);
  } catch (error) {
    console.log(error);
  }
};

export const Register = async (req, res) => {
  const { username, password, confPassword } = req.body;
  const usernameInfo = await Adminloging.findOne({
    where: {
      username: username,
    },
  });
  if (usernameInfo)
    return res.status(400).json({ msg: "This username has already exist" });
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password and Confirm Password do not match" });
  const salt = await bcrypt.genSalt(5);
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Adminloging.create({
      username: username,
      password: hashPassword,
    });
    res.json({ msg: "Registration Successful" });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const admin = await Adminloging.findAll({
      where: {
        username: req.body.username,
      },
    });
    const match = await bcrypt.compare(req.body.password, admin[0].password);
    if (!match) return res.status(400).json({ msg: "not Matched" });
    const adminId = admin[0].id;
    const Username = admin[0].Username;
    const accessToken = jwt.sign(
      { adminId, Username },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15s",
      }
    );
    const refreshToken = jwt.sign(
      { adminId, Username },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    await Adminloging.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: adminId,
        },
      }
    );
    res.json({
      refreshToken: refreshToken,
      accessToken: accessToken,
      msg: "Matched",
    });
  } catch (error) {
    res.status(404).json({ msg: "Username not found" });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.query.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const admin = await Adminloging.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!admin[0]) return res.sendStatus(204);
  const adminId = admin[0].id;
  await Adminloging.update(
    { refresh_token: null },
    {
      where: {
        id: adminId,
      },
    }
  );
  return res.sendStatus(200);
};
