import { createSlice } from "@reduxjs/toolkit";

// Define the interface for the modal state
export interface ModalState {
  isSignUpOpen: boolean;
  isSignInOpen: boolean;
  isQrcodeOpen: boolean;
}

// Define the initial state
const initialState: ModalState = {
  isSignUpOpen: false,
  isSignInOpen: false,
  isQrcodeOpen: false,
};

// Create the modal slice
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openSignUpModal: (state) => {
      state.isSignUpOpen = true;
    },
    closeSignUpModal: (state) => {
      state.isSignUpOpen = false;
    },
    openSignInModal: (state) => {
      state.isSignInOpen = true;
    },
    closeSignInModal: (state) => {
      state.isSignInOpen = false;
    },
    openQrcodeModal: (state) => {
      state.isQrcodeOpen = true;
    },
    closeQrcodeModal: (state) => {
      state.isQrcodeOpen = false;
    },
  },
});

// Export the actions
export const {
  openSignUpModal,
  closeSignUpModal,
  openSignInModal,
  closeSignInModal,
  openQrcodeModal,
  closeQrcodeModal,
} = modalSlice.actions;

// Export the reducer
export default modalSlice.reducer;
