import { Identity } from "@/src/types/user";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IUserState {
  id: string;
  username: string;
  user_type: "regular_user" | "medical_staff" | "civil_registar";
  identity: Identity;
}

export const userSlice = createSlice({
  name: "user",
  initialState: {} as IUserState,
  reducers: {
    setUserState: (state, action: PayloadAction<IUserState>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setUserState } = userSlice.actions;
export const userReducer = userSlice.reducer;
