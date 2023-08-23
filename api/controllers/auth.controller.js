import User from "../models/user.model.js";

export const register = async (req, res) => {
  // console.log(req.body + " come from line 7");
  console.log(JSON.stringify(req.body) , " come from line 7");
  try {
    const result = await User.create(req.body);
    // const result = await User.create(req.body);
    res.status(200).json({
      message: "User has been created.",
      data: result,
    });
  } catch (err) {
    res.status(500).send(err);
  }
};
export const login = async (req, res) => {};
export const logout = async (req, res) => {};
