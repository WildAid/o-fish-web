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

  getUsers(limit, offset, searchQuery, currentFilter) {    
    return stitchService.client.callFunction("searchFacetByUsers", [limit, offset, searchQuery, currentFilter]);
  }

  searchUsers(emailSearch) {
    return stitchService.client.callFunction("searchUsers", [emailSearch]);
  }
}
