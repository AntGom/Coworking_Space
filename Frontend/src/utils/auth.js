import { jwtDecode } from "jwt-decode";

class Auth {
  login(token) {
    localStorage.setItem("token", token);
  }

  logout() {
    localStorage.removeItem("token");
  }

  getProfile() {
    return jwtDecode(this.getToken());
  }

  getToken() {
    return localStorage.getItem("token");
  }

  isLoggedIn() {
    const token = this.getToken();
    return !!token;
  }

  isAdmin() {
    const profile = this.getProfile();
    return profile && profile.role === "admin";
  }
}

export default new Auth();
