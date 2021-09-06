import EventEmitter from "events";

import { fieldOfficer } from '../../__fixtures__/users'

export default class AuthService extends EventEmitter {
  static serviceInstance = null;

  static getInstance() {
    if (AuthService.serviceInstance == null) {
      AuthService.serviceInstance = new AuthService();
    }
    return AuthService.serviceInstance;
  }

  get user() {
    return fieldOfficer
  }
}
