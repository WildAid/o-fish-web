import StitchService from "./stitch.service";

const stitchService = StitchService.getInstance();


export default class CaptainService {
    static serviceInstance = null;

    static getInstance() {
        if (CaptainService.serviceInstance == null) {
            CaptainService.serviceInstance = new CaptainService();
        }

        return CaptainService.serviceInstance;
    }


    async getCaptains() {
        const captains = await stitchService.database.collection("BoardingReports").aggregate([
            {
                $match: {
                    "captain.name": { $nin: [null, ""] }
                }
            },
            {
                $project: {
                    captain: 1,
                    _id: 0
                },
            }
        ]).toArray();

        const names = [];
        for (let a of captains) {
            if (!names.includes(a.captain.name.trim())) {
                names.push(a.captain.name.trim())
            }
        }

        return names;
    }
}