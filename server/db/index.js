const conn = require('./conn');
const User = require('./User');

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const [andy, lucy, larry, ethyl] = await Promise.all([
    User.create({ username: 'andy', password: '123'}),
    User.create({ username: 'lucy', password: '123' }),
    User.create({ username: 'larry', password: '123' }),
    User.create({ username: 'ethyl', password: '123' }),
  ]);

  return {
    users: {
      andy,
      lucy,
      larry
    }
  };
};


module.exports = {
  syncAndSeed,
  User,
};