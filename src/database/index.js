import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Users from '../app/models/Users';
import Recipients from '../app/models/Recipients';

const models = [Users, Recipients];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
