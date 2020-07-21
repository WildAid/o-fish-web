import StitchService from "./stitch.service";
import storage from '../helpers/localStorageData';
import {checkUserRole} from '../helpers/get-data';
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
    return this._user ? this._user : null;
  }

  authenticate(login, pass) {
    return stitchService.authenticateStitch(login, pass).then((authData) => {
        return stitchService.database.collection("User").findOne({realmUserID: authData.id}).then((user)=>{
          if (user || authData.customData){
            this.reloadCurrentUser(user ? user: authData.customData);
            this.emit("authorized", this._user);
            return this._user
          } else {
            throw(new Error("No user in database found for " + authData.id));
          }
        });
    });
  }

  reloadCurrentUser(user) {
    this._user = user;
    storage.setAuthInfo(this._user);
    this.emit("user-object-changed", this._user);
    return this._user;
  }

  reauthenticateUser(user) {
    stitchService.reinitializeClient();
    this._user = storage.getAuthInfo();
    return this._user;
  }
}
