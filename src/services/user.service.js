import { BSON } from "mongodb-stitch-browser-sdk";
import StitchService from "./stitch.service";

const stitchService = StitchService.getInstance();

export default class UserService {
  static serviceInstance: UserService = null;

  static getInstance() {
    if (UserService.serviceInstance == null) {
      UserService.serviceInstance = new UserService();
    }
    return UserService.serviceInstance;
  }

  getUser(critheria) {
    return stitchService.database.collection("User").findOne(critheria);
  }

  getUsers(critheria) {
    return stitchService.database.collection("User").find(critheria).toArray();
  }

  searchUsers(emailSearch) {
    return stitchService.client.callFunction("searchUsers", [emailSearch]);
  }

  createUser(login, password, agency) {
    return stitchService.client.auth
      .getProviderClient(UserPasswordAuthProviderClient.factory)
      .registerWithEmail(login, password)
      .then((result) => {
        return stitchService.database
          .collection("User")
          .findOne({ email: login })
          .then((user) => {
            if (user) {
              return this._database.collection("User").updateOne({
                email: login,
                agency: { name: agency },
                global: { admin: false },
              });
            } else {
              console.error("User does not exists!");
              throw new Error(
                "A user " + login + " registered but not found on DB!"
              );
            }
          });
      });
  }
}
