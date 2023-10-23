import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
    changeTheme: (state, action: PayloadAction<boolean>) => {
      return {
        isDark: action.payload,
      };
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
