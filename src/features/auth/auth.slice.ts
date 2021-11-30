import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user: {
    id: string;
    email: string;
  } | null;
  token: string | null;
  isAuthModalOpen: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthModalOpen: false,
};

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
});

export const { openModal, closeModal, toggleModal, setCredentials } =
  authSlice.actions;
export const { reducer: authReducer } = authSlice;
