// utils.js
export function getCurrentUserName() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.firstname ? user.firstname : null;
}

export function getCurrentUserId() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.id ? user.id : null;
}

export function isUserLoggedIn() {
  const user = JSON.parse(localStorage.getItem("user"));
  return user !== null; // returns true if a user object exists in localStorage
}
