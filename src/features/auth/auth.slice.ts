import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";

export interface AuthState {
  user: {
    customerId: string;
    email: string;
  } | null;
  token: string | null;
  isAuthModalOpen: boolean;
}

const token = localStorage.getItem("token");
const initialState: AuthState = {
  user: token ? jwtDecode(token) : null,
  token,
  isAuthModalOpen: false,
};

export const fetchUserById = createAsyncThunk(
  "users/fetchByIdStatus",
  async (userId: string, thunkApi) => {
    const state: any = thunkApi.getState();
    const response = await axios.get(
      `${process.env.REACT_APP_CORE_API_URL}/customers/${userId}`,
      { headers: { 'Authorization': `Bearer ${state.auth.token}`}}
    );

    return response.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isAuthModalOpen = true;
    },
    closeModal: (state) => {
      state.isAuthModalOpen = false;
    },
    toggleModal: (state) => {
      state.isAuthModalOpen = !state.isAuthModalOpen;
    },
    setCredentials: (
      state,
      { payload }: PayloadAction<Pick<AuthState, "token" | "user">>
    ) => {
      state.token = payload.token;
      state.user = payload.user;
      state.isAuthModalOpen = false;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      console.log(action);
      state.user = action.payload;
    }),
});

export const { openModal, closeModal, toggleModal, setCredentials } =
  authSlice.actions;
export const { reducer: authReducer } = authSlice;
