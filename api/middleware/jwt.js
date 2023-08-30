import createErrors from "../utils/createErrors.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return next(createErrors(401, "You are not authenticated"));
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return next(createErrors(401,"Token is not valid"));
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    next()
  });
};
