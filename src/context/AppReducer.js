const reducer = async (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        users: [...state, action.payload],
      };
    case "EDIT_USER":
      const updateUser = action.payload;

      const updateUsers = state.map((user) => {
        if (user.id === updateUser.id) {
          return updateUser;
        }
        return user;
      });

      return {
        ...state,
        users: updateUsers,
      };

    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };

    default:
      return state;
  }
};

export default reducer;
