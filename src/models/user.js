import bcrypt from 'bcrypt';
//user model
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define( "user", {
      email: {
          type: DataTypes.STRING,
          unique: true,
          isEmail: true, //checks for email format
          allowNull: false
      },
      password: {
          type: DataTypes.STRING,
          allowNull: true
      }
    },
      {
        hooks: {
         beforeCreate: async (user) => {
          if (user.password) {
           const salt = await bcrypt.genSaltSync(10, 'a');
           user.password = bcrypt.hashSync(user.password, salt);
          }
         }
    }
  });
  return User
} 