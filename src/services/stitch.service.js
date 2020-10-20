import {
  Stitch,
  StitchAppClientConfiguration,
  UserPasswordCredential,
  RemoteMongoClient,
  AnonymousCredential,
} from "mongodb-stitch-browser-sdk";
import { BSON } from "mongodb-stitch-browser-sdk";

import config from "../config";

export default class StitchService {
  static serviceInstance: StitchService = null;

  static getInstance() {
    if (StitchService.serviceInstance == null) {
      StitchService.serviceInstance = new StitchService();
    }
    return StitchService.serviceInstance;
  }

  get chartsConfig() {
    return config.chartsConfig || {};
  }

  get appId() {
    return config.realmAppId;
  }

  get client() {
    return this._localStitchClient; //For use the stitch client from another services
  }

  get database() {
    if (!this._database) {
      throw new Error("You are not logged in! Please, login first."); //Show correct error, if token expired, or something wrong with Auth.
    }
    return this._database; //For use the database from another services
  }

  constructor() {
    //Basic stitch client initializing
    if ("realmBaseUrl" in config) {
      //Check if URL is correctly filled
      const stitchConfig = config.realmBaseUrl
        ? new StitchAppClientConfiguration({
            baseUrl: config.realmBaseUrl,
          })
        : new StitchAppClientConfiguration();
      this._localStitchClient = Stitch.initializeDefaultAppClient(
        config.realmAppId,
        stitchConfig
      );
    } else {
      this._localStitchClient = Stitch.initializeDefaultAppClient(
        config.realmAppId
      );
    }
    //database object will be available only after stitch authenticated
    this._database = null;
  }

  //This method should be called from Login form with realm User credentials
  authenticateStitch(login, pass) {
    return this._localStitchClient.auth
      .loginWithCredential(new UserPasswordCredential(login, pass))
      .then((authData) => {
        //Connecting to database
        this.reinitializeClient();
        return authData;
      });
  }

  authenticateAnonymousStitch() {
    return this._localStitchClient.auth
      .loginWithCredential(new AnonymousCredential())
      .then((authData) => {
        this.reinitializeClient();
        return authData;
      });
  }

  //After stitch authenticated, you could connect to database
  reinitializeClient() {
    return (this._database = this._localStitchClient
      .getServiceClient(RemoteMongoClient.factory, config.realmServiceName)
      .db(config.database));
  }

  getVesselsWithFacet(limit, offset, search, filter, agenciesToShareData) {
    return this._localStitchClient.callFunction("searchFacetByVessels", [
      limit,
      offset,
      search,
      filter,
      agenciesToShareData
    ]);
  }

  getCrewsWithFacet(limit, offset, search, filter, agenciesToShareData) {
    return this._localStitchClient.callFunction("searchFacetByCrews", [
      limit,
      offset,
      search,
      filter,
      agenciesToShareData
    ]);
  }

  getData(limit, offset, funcName) {
    return this._localStitchClient.callFunction(funcName, [limit, offset]);
  }

  getPhoto(id) {
    if (!id) return;

    return this.database
      .collection("Photo")
      .findOne({ _id: new BSON.ObjectId(id) });
  }

  uploadImage(data, agency, recordId) {
    const img = new BSON.Binary(new Uint8Array(data));
    return this.database.collection("Photo").insertOne({
      date: new Date(),
      agency: agency,
      picture: img,
      referencingReportID: recordId ? recordId : "",
      pictureURL: "",
      thumbNail: img,
    });
  }
}
