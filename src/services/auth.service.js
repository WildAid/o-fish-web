import StitchService from "./stitch.service";
import EventEmitter from "events";
import storage from '../helpers/localStorageData';

const stitchService = StitchService.getInstance();

export default class AuthService extends EventEmitter {
  static serviceInstance = null;

  static getInstance() {
    if (AuthService.serviceInstance == null) {
      AuthService.serviceInstance = new AuthService();
    }
    return AuthService.serviceInstance;
  }

  get isStitchAuthenticated() {
    return storage.getItem("__stitch.client." + stitchService.appId + ".auth_info");
  }

  get isAuthenticated() {
    return this.user != null;
  }

  authenticate(login, pass) {
    return stitchService.authenticateStitch(login, pass).then(user => {
      this.user = user;
      delete (user.auth);
      storage.setAuthInfo(user);
      this.emit("authorized", user);
    });
  }

  getUserFromLocalStorage(user) {
    stitchService.reinitializeClient();
    return this.user = storage.getAuthInfo();
  }
}
