import { agency1 } from '../../__fixtures__/agencies'

export default class AgencyService {
    static serviceInstance = null;

    static getInstance() {
        if (AgencyService.serviceInstance == null) {
          AgencyService.serviceInstance = new AgencyService();
        }
        return AgencyService.serviceInstance;
    }

    getAgencyByName() {
        return Promise.resolve(agency1)
    }
}
