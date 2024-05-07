import { createSlice } from "@reduxjs/toolkit";

const chattabSlice = createSlice({
  name: "chattab",
  initialState: {
    chattab: [],
  },
  reducers: {
    addTab: (state, action) => {
      const { data } = action.payload;
      state.chattab = [...state.chattab, data];
      // console.log("addTab")
      // console.log(data)
    },
  },
});
export const { addTab } = chattabSlice.actions;
const chattabReducer = chattabSlice.reducer;
export default chattabReducer;
