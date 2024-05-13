const Sequelize = require("sequelize");

const sequelize = new Sequelize("demo_test", "root", "vuvanbui@18", {
  host: "localhost",
  port: "3306",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },

  operatorsAliases: false,
});

const modelDefiners = [
  require("../models/todo.model.js"),
  require("../models/user.model.js"),
];

for (const modelDefiner of modelDefiners) {
  const model = modelDefiner(sequelize, Sequelize.DataTypes);
  model.associate && model.associate(sequelize.models);
}

sequelize.models.User.hasMany(sequelize.models.Todo, {
  foreignKey: "userId",
  as: "todos",
});

sequelize.models.Todo.belongsTo(sequelize.models.User, {
  foreignKey: "userId",
  as: "user",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

module.exports = sequelize;
