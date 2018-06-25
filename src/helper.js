import moment from "moment";

export function getToken() {
  return sessionStorage.getItem("api_token");
}
export function saveToken(data) {
  sessionStorage.setItem("api_token", data.api_token);
  sessionStorage.setItem("expiration", data.api_token_expired_at);
}
export function removeToken() {
  sessionStorage.removeItem("api_token");
  sessionStorage.removeItem("expiration");
}
export function isAuthed() {
  var expiration = sessionStorage.getItem("expiration");
  return expiration !== null && Date.now() < moment(expiration).valueOf();
}
