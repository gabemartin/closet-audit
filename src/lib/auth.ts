const ACCOUNTS_KEY = "ca_accounts";
const SESSION_KEY = "ca_session";
const AUTH_EVENT = "auth-change";

export interface AuthUser {
  name: string;
  email: string;
}

interface StoredAccount extends AuthUser {
  password: string;
}

function getAccounts(): StoredAccount[] {
  try {
    return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveAccount(account: StoredAccount): void {
  const accounts = getAccounts().filter((a) => a.email !== account.email);
  accounts.push(account);
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function setSession(user: AuthUser): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function getUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const { name, email } = JSON.parse(raw) as AuthUser;
    return { name, email };
  } catch {
    return null;
  }
}

export function isLoggedIn(): boolean {
  return getUser() !== null;
}

export function signUp(name: string, email: string, password: string): AuthUser {
  const existing = getAccounts().find((a) => a.email === email);
  if (existing) throw new Error("An account with that email already exists.");

  saveAccount({ name, email, password });
  const user: AuthUser = { name, email };
  setSession(user);
  window.dispatchEvent(new CustomEvent(AUTH_EVENT));
  return user;
}

export function signIn(email: string, password: string): AuthUser {
  const account = getAccounts().find((a) => a.email === email);
  if (!account) throw new Error("No account found. Please sign up first.");
  if (account.password !== password) throw new Error("Invalid email or password.");

  const user: AuthUser = { name: account.name, email: account.email };
  setSession(user);
  window.dispatchEvent(new CustomEvent(AUTH_EVENT));
  return user;
}

export function signOut(): void {
  localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new CustomEvent(AUTH_EVENT));
}

export function onAuthChange(callback: () => void): () => void {
  window.addEventListener(AUTH_EVENT, callback);
  return () => window.removeEventListener(AUTH_EVENT, callback);
}
