import { createSlice } from "@reduxjs/toolkit";

interface DarkModeState {
  isDark: boolean;
}

const initialState: DarkModeState = {
  isDark: false,
};

export const themeSlice = createSlice({
  name: "theme adjust",
  initialState,
  reducers: {
    changeTheme: (state) => {
      !state;
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
