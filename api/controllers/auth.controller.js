import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createErrors from "../utils/createErrors.js";

export const register = async (req, res,next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const result = await User.create({
      ...req.body,
      password: hash,
    });

    res.status(200).json({
      message: "User has been created.",
      data: result,
    });
  } catch (err) {
    next(err);

  }
};
export const login = async (req, res,next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    
    if (!user) return next(createErrors(404,"user not found!"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) return res.status(400).send("Wrong password or username ");

    //* USING JWT ACCESS TOKEN

    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY
    );

    const { password, ...info } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};
export const logout = async (req, res) => {
  res.clearCookie('accessToken',{
    sameSite:'none',
    secure:true,
  })
  .status(200)
  .send('User has been log out')
};

