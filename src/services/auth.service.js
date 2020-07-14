import StitchService from "./stitch.service";
import EventEmitter from "events";
import storage from '../helpers/localStorageData';
import {checkUserRole} from '../helpers/get-data';

const stitchService = StitchService.getInstance();

export default class AuthService extends EventEmitter {
  static serviceInstance = null;

  static getInstance() {
    if (AuthService.serviceInstance == null) {
      AuthService.serviceInstance = new AuthService();
    }
    return AuthService.serviceInstance;
  }

  get userRole(){
    return this.user ? checkUserRole(this.user) : "unauthenticated"
  }

  get isStitchAuthenticated() {
    return storage.getItem("__stitch.client." + stitchService.appId + ".auth_info");
  }

  get isAuthenticated() {
    return this._user != null;
  }

  get user(){
    return this._user ? this._user.customData : this._user;
  }

  authenticate(login, pass) {
    return stitchService.authenticateStitch(login, pass).then(user => {
      this._user = user;
      delete (user.auth);
      storage.setAuthInfo(user);
      this.emit("authorized", user);
    });
  }

  getUserFromLocalStorage(user) {
    stitchService.reinitializeClient();
    return this._user = storage.getAuthInfo();
  }
}
