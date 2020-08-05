import StitchService from "./stitch.service";

const stitchService = StitchService.getInstance();

export default class CustomMenuService {
  static serviceInstance: CustomMenuService = null;

  static getInstance() {
    if (CustomMenuService.serviceInstance == null) {
      CustomMenuService.serviceInstance = new CustomMenuService();
    }
    return CustomMenuService.serviceInstance;
  }

  getMenus(agencyName) {
    return stitchService.database.collection("MenuData").findOne({agency: agencyName});
  }

  updateMenus(data) {
    return stitchService.database.collection("Agency").updateOne(data);
  }
}
