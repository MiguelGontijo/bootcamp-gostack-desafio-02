import jwt from 'jsonwebtoken';

import Users from '../models/Users';
import auth from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const userExists = await Users.findOne({ where: { email } });

    if (!userExists) {
      return res.status(401).json({ error: 'User do not exists!' });
    }

    if (!userExists.admin) {
      return res.status(400).json({ error: 'User are not admin!' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Password are necessary!' });
    }

    if (!(await userExists.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match!' });
    }

    const { id, name } = userExists;

    return res.json({
      userExists: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, auth.secret, {
        expiresIn: auth.expiresIn,
      }),
    });
  }
}

export default new SessionController();
