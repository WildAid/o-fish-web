import StitchService from "./stitch.service";
import EventEmitter from "events";

const stitchService = StitchService.getInstance();

export default class AuthService extends EventEmitter {
  static serviceInstance = null;

  static getInstance() {
    if (AuthService.serviceInstance == null) {
      AuthService.serviceInstance = new AuthService();
    }
    return AuthService.serviceInstance;
  }

  get user() {
    return stitchService.client.auth.isLoggedIn
      ? stitchService.client.auth.user
      : null;
  }

  get isAuthenticated() {
    return stitchService.client.auth.isLoggedIn;
  }

  logout() {
    return stitchService.client.auth.logout();
  }

  authenticate(login, pass) {
    return stitchService.authenticateStitch(login, pass).then((user) => {
      this.emit("authorized", user);
      return user;
    });
  }
}
