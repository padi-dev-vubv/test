const db = require("../../configs/database");

console.log("database", db.models.User);

const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const users = await userModel.findAll({
          include: [{ model: todoModel, as: "todos" }],
        });
        return users;
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    },
    getUserById: async (_, { id }) => {
      try {
        const user = await userModel.findByPk(id, {
          include: [{ model: todoModel, as: "todos" }],
        });
        return user;
      } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
      }
    },
  },
  Mutation: {
    createUser: async (_, { name, email }) => {
      try {
        console.log({ name, email });
        const newUser = await db.models.User.create({ name, email });
        return newUser;
      } catch (error) {
        console.error("Error creating user:", error);
        throw error;
      }
    },
    updateUser: async (_, { id, name, email }) => {
      try {
        const user = await userModel.findByPk(id);
        if (!user) {
          throw new Error("User not found");
        }
        await user.update({ name, email });
        return user;
      } catch (error) {
        console.error("Error updating user:", error);
        throw error;
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        const user = await userModel.findByPk(id);
        if (!user) {
          throw new Error("User not found");
        }
        await user.destroy();
        return user;
      } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
      }
    },
  },
};

module.exports = resolvers;
