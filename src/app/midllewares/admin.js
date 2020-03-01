import User from '../models/Users';

export default async (req, res, next) => {
  const id = req.userId;

  const user = await User.findByPk(id);

  if (!user.admin) {
    return res.status(401).json({ error: 'User are not admin!' });
  }
  // console.log(user);

  return next();
};
