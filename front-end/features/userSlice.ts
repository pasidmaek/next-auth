import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface User {
  username?: string;
  password?: string;
  email?: string;
  role?: string;
  id?: number;
  imgurl?: string;
}

export interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action: PayloadAction<User[]>) => {
      console.log("-> ", action.payload);
      const newUser = action.payload;
      state.users = [...newUser];
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      console.log("[Delete] -> ", action.payload);
      const userId = action.payload;
      state.users = state.users.filter((user) => user.id !== userId);
      console.log("[Delete] -> ", state.users);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const newUser = action.payload;
      state.users = state.users.map((user) =>
        user.id === newUser.id ? newUser : user
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { getUser, deleteUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
