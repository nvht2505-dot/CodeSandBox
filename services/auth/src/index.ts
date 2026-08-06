export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

let currentUser: User | null = null;

export function signIn(user: User) {
  currentUser = user;
}

export function signOut() {
  currentUser = null;
}

export function getCurrentUser() {
  return currentUser;
}

export function isAuthenticated() {
  return currentUser !== null;
}
