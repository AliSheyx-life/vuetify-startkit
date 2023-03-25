export function setToLocaleStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocaleStorage(key) {
  if (!key) return;
  const data = localStorage.getItem(key);
  return JSON.parse(data);
}

export function getAccessToken() {
  const token = localStorage.getItem("access_token");
  if (token) {
    return JSON.parse(token);
  } else {
    return "";
  }
}

export function getRefreshToken() {
  const token = localStorage.getItem("refresh_token");
  if (token) {
    return token;
  } else {
    return "";
  }
}
