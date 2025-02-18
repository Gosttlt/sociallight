import { create } from "zustand";

interface User {
  id: number;
  userName: string;
}

interface UserState {
  users: User[];
  isLoading: boolean;
  errors: string[];
  addUser: (userName: string) => void;
}

export const useUsersStore = create<UserState>((set) => ({
  users: [],
  currentUser: null,
  isLoading: false,
  errors: [],
  addUser: (userName: string) =>
    set((state) => ({
      users: [...state.users, { id: Date.now(), userName }],
    })),
  fetchUsers: async () => {
    const result = (await (
      await fetch("https://jsonplaceholder.typicode.com/users")
    ).json()) as User[];
    set({ users: result });
  },
}));
