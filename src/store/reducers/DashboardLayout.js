import { createSlice } from "@reduxjs/toolkit";

const DashboardLayoutSlice = createSlice({
  name: "dashboardLayout",
  initialState: {
    layout: [], // An array to store layout
    currentLayout: [],
  },
  reducers: {
    addLayout: (state, action) => {
      var rowHeight = Math.trunc(state.layout.length / 4);
      const { data } = action.payload;

      // console.log("addLayout");
      switch (state.layout.length % 4) {
        case 0:
          // console.log("case1");
          // console.log(state.layout);
          state.layout = [
            ...state.layout,
            {
              i: data.timestamp + data.title,
              x: 0,
              y: rowHeight * 4,
              w: 4,
              h: 4,
            },
          ];
          // console.log(state.layout);
          break;
        case 1:
          // console.log("case2");
          // console.log(state.layout);
          var lastLayout = state.layout[state.layout.length - 1].i;
          state.layout.pop();
          // console.log(state.layout);
          state.layout = [
            ...state.layout,
            {
              i: lastLayout,
              x: 0,
              y: rowHeight * 4,
              w: 2,
              h: 4,
            },
            {
              i: data.timestamp + data.title,
              x: 2,
              y: rowHeight * 4,
              w: 2,
              h: 4,
            },
          ];
          break;
        case 2:
          var lastLayout = state.layout[state.layout.length - 1].i;
          state.layout.pop();
          state.layout = [
            ...state.layout,
            {
              i: lastLayout,
              x: 2,
              y: rowHeight * 4,
              w: 2,
              h: 2,
            },
            {
              i: data.timestamp + data.title,
              x: 2,
              y: rowHeight * 4 + 2,
              w: 2,
              h: 2,
            },
          ];
          break;
        case 3:
          var lastLayout = state.layout[state.layout.length - 1].i;
          state.layout.pop();
          state.layout = [
            ...state.layout,
            {
              i: lastLayout,
              x: 2,
              y: (rowHeight - 1) * 4 + 2,
              w: 1,
              h: 2,
            },
            {
              i: data.timestamp + data.title,
              x: 3,
              y: (rowHeight - 1) * 4 + 2,
              w: 1,
              h: 2,
            },
          ];
          break;
      }
      state.currentLayout = [...state.layout];
    },
    removeLayout: (state, action) => {
      const { chart } = action.payload;
      const removeLayout = chart.timestamp + chart.title;
      for (let i = 0; i < state.layout.length; i++) {
        if (state.layout[state.layout.length - 1].i === removeLayout) {
          state.layout.pop();
          break;
        }
        if (state.layout[i].i === removeLayout) {
          state.layout[i].i = state.layout[state.layout.length - 1].i;
          state.layout.pop();
          break;
        }
      }
      state.currentLayout = [...state.layout];
    },
    saveCurentLayout: (state, action) => {
      const { layout } = action.payload;
      state.currentLayout = [...layout];
    },
    cleanLayout: (state, action) => {
      state.layout = [];
      state.currentLayout = [];
    },
    Returndefaultlayout: (state, action) => {
      state.currentLayout = state.layout;
    },
  },
});

export const {
  addLayout,
  removeLayout,
  cleanLayout,
  saveCurentLayout,
  Returndefaultlayout,
} = DashboardLayoutSlice.actions;
const DashboardLayoutReducer = DashboardLayoutSlice.reducer;
export default DashboardLayoutReducer;
