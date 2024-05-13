const Todo = require("../../models/todo.model");

const resolvers = {
  Query: {
    getTodos: async () => {
      try {
        const todos = await Todo.findAll({
          include: [{ model: User, as: "user" }],
        });
        return todos;
      } catch (error) {
        console.error("Error fetching todos:", error);
        throw error;
      }
    },
  },
  Mutation: {
    createTodo: async (_, { title, description }) => {
      try {
        const newTodo = await Todo.create({ title, description });
        return newTodo;
      } catch (error) {
        console.error("Error creating todo:", error);
        throw error;
      }
    },
    updateTodo: async (_, { id, title, description, completed }) => {
      try {
        const todo = await Todo.findByPk(id);
        if (!todo) {
          throw new Error("Todo not found");
        }
        await todo.update({ title, description, completed });
        return todo;
      } catch (error) {
        console.error("Error updating todo:", error);
        throw error;
      }
    },
    deleteTodo: async (_, { id }) => {
      try {
        const todo = await Todo.findByPk(id);
        if (!todo) {
          throw new Error("Todo not found");
        }
        await todo.destroy();
        return todo;
      } catch (error) {
        console.error("Error deleting todo:", error);
        throw error;
      }
    },
  },
};

module.exports = resolvers;
