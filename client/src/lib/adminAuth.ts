// Simple fixed-credential admin auth.
// Change these to whatever you want your admin login to be.
const ADMIN_USERNAME = "illamparthi";
const ADMIN_PASSWORD = "illamparthi@9287";

const SESSION_KEY = "ssh_admin_authed";

export function loginAdmin(username: string, password: string): boolean {
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    sessionStorage.setItem(SESSION_KEY, "true");
    return true;
  }
  return false;
}

export function logoutAdmin() {
  sessionStorage.removeItem(SESSION_KEY);
}

export function isAdminAuthed(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === "true";
}