export interface ShellState {
  isNavBarOpen: boolean;
}

export interface ShellActions {
  toggleNavbar: (value?: boolean) => void;
  closeNavbar: () => void;
}

export interface ShellStore extends ShellState, ShellActions {}
