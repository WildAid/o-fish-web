import StitchService from "./stitch.service";
import { UserPasswordAuthProviderClient } from "mongodb-stitch-browser-sdk";

import { BSON } from "mongodb-stitch-browser-sdk";
const stitchService = StitchService.getInstance();

export default class UserService {
  static serviceInstance: UserService = null;

  static getInstance() {
    if (UserService.serviceInstance == null) {
      UserService.serviceInstance = new UserService();
    }
    return UserService.serviceInstance;
  }

  getUserById(id) {
    return stitchService.database.collection("User").findOne({_id: new BSON.ObjectId(id)});
  }

  getUser(critheria) {
    return stitchService.database.collection("User").findOne(critheria);
  }

  getUsers(limit, offset, searchQuery, currentFilter) {
    return stitchService.client.callFunction("searchFacetByUsers", [
      limit,
      offset,
      searchQuery,
      currentFilter,
    ]);
  }

  createUser(password, data) {
    return stitchService.client.auth
      .getProviderClient(UserPasswordAuthProviderClient.factory)
      .registerWithEmail(data.email, password)
      .then((value) => {
        return stitchService.database.collection("User").insertOne(data);
      })
  }

  updateUser(id, data) {
    id = new BSON.ObjectId(id);
    return stitchService.database.collection("User").updateOne({
      _id : id
    }, data);
  }

  resetPasswordRequest(user, password) {
    return stitchService.client.auth
      .getProviderClient(UserPasswordAuthProviderClient.factory)
      .callResetPasswordFunction(user.email, password, []);
  }

  resetPassword(token, tokenId, newPassword) {
    return stitchService.client.auth
      .getProviderClient(UserPasswordAuthProviderClient.factory)
      .resetPassword(token, tokenId, newPassword);
  }
}
