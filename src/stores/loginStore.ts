import { create } from 'zustand';

interface LoginState {
  email: string;
  password: string;
  showError: boolean;
  emailHandler: (email: string) => void;
  passwordHandler: (password: string) => void;
  setShowError: (showError: boolean) => void;
}

export const useLoginState = create<LoginState>()((set) => ({
  email: '',
  password: '',
  showError: false,
  emailHandler: (email: string) => set((state) => ({ email, password: state.password })),
  passwordHandler: (password: string) => set((state) => ({ email: state.email, password })),
  setShowError: (showError: boolean) => set((state) => ({ ...state, showError })),
}));
