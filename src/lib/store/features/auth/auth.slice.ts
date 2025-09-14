import { Admin } from "@/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  admin : Admin | null;
}

const initialState: AuthState = {
  admin: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAdmin(state, action: PayloadAction<Admin | null>) {
      state.admin = action.payload;
    },
    clearAdmin(state) {
      state.admin = null;
    }
  },
});

export const { setAdmin , clearAdmin } = authSlice.actions;
export default authSlice.reducer;
