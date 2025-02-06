const resolvers = {
  Query: {
    users: (_, __, context) => {
      return context.dataSources.userAPI.getUsers();
    },
    items: (_, __, context) => {
      return context.dataSources.userAPI.getItems();
    },
    userById: (_, args, context) => {
      return context.dataSources.userAPI.getUserById(args.id);
    },
    restaurent(_, __, context) {
      return "This is a restaurent";
    }
  }
};

module.exports = resolvers;
