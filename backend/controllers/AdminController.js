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
  const { Username, Password, confPassword } = req.body;
  const username = await Adminloging.findOne({
    where: {
      Username: Username,
    },
  });
  console.log(username);
  if (username) {
    res.status(400).json({ msg: "This username has already exist" });
  }
  // if (Password !== confPassword)
  //   return res
  //     .status(400)
  //     .json({ msg: "Password and Confirm Password do not match" });
  const salt = await bcrypt.genSalt(5);
  const hashPassword = await bcrypt.hash(Password, salt);
  try {
    // await Adminloging.create({
    //   Username: Username,
    //   Password: hashPassword,
    // });
    // res.json({ msg: "Registration Successful" });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const admin = await Adminloging.findAll({
      where: {
        Username: req.body.Username,
      },
    });
    const match = await bcrypt.compare(req.body.Password, admin[0].Password);
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
