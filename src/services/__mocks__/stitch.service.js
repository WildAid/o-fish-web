import { fieldOfficer } from "../../__fixtures__/users";

const mockConfig = {
    realmAppId: 'wildaid-ui-test',
}

const mockDatabase = {
    collection: () => ({
        findOne: () => Promise.resolve(fieldOfficer)
    })
}

export default class StitchService {
    static serviceInstance = null;

    static getInstance() {
        if (StitchService.serviceInstance == null) {
          StitchService.serviceInstance = new StitchService();
        }
        return StitchService.serviceInstance;
    }

    get appId() {
        return mockConfig.realmAppId;
    }

    get database() {
        return this._database
    }

    constructor() {
        this._database = mockDatabase;
    }

    authenticateStitch() {
        return Promise.resolve({
            customData: {
                _id: "logged-in-user"
            }
        })
    }

    getPhoto() {
        return Promise.resolve(null)
    }
}