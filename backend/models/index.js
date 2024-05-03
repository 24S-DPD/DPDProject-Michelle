const dbConfig = require("../config/db.js");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected..");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user.js")(sequelize, DataTypes);
db.Doctor = require("./doctor.js")(sequelize, DataTypes);
db.Specialization = require("./specialization.js")(sequelize, DataTypes);
db.Language = require("./language.js")(sequelize, DataTypes);
db.DoctorSpecialization = require("./doctor_specialization.js")(sequelize, DataTypes);
db.DoctorLanguage = require("./doctor_language.js")(sequelize, DataTypes);
db.UserLanguage = require("./user_language.js")(sequelize, DataTypes);

db.Blog = require("./blog.js")(sequelize, DataTypes);
//

db.sequelize.sync({ force: false }).then(() => {});

// Define relationships
db.Doctor.belongsToMany(db.Specialization, {
  through: "doctor_specialization",
  foreignKey: "doctor_id",
  otherKey: "specialization_id",
});
db.Specialization.belongsToMany(db.Doctor, {
  through: "doctor_specialization",
  foreignKey: "specialization_id",
  otherKey: "doctor_id",
});

db.User.belongsToMany(db.Language, {
  through: "user_language",
  foreignKey: "user_id",
  otherKey: "language_id",
});
db.Language.belongsToMany(db.User, {
  through: "user_language",
  foreignKey: "language_id",
  otherKey: "user_id",
});

db.Doctor.belongsToMany(db.Language, {
  through: "doctor_language",
  foreignKey: "doctor_id",
  otherKey: "language_id",
});
db.Language.belongsToMany(db.Doctor, {
  through: "doctor_language",
  foreignKey: "language_id",
  otherKey: "doctor_id",
});

module.exports = db;