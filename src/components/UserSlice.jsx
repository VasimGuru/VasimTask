import { createSlice } from "@reduxjs/toolkit";
export const Userslice = createSlice({
  name: "users",
  initialState: {
    users: []
  },
  reducers: {
    Useradded(state, action) {
      // console.log(action.payload);
      state.users.push(action.payload);
    }
  }
});
export const { Useradded } = Userslice.actions;
export default Userslice.reducer;
