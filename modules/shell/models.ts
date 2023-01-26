export interface ShellState {
  isNavBarOpen: boolean;
}

export interface ShellActions {
  toggleNavbar: () => void;
}

export interface ShellStore extends ShellState, ShellActions {}
