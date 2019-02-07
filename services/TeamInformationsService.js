import { getRandom } from "../constants/Utils";
import { TeamInformations } from "../model/team-informations";

export class TeamInformationsService {

    constructor(playersNumber) {
        this.playersNumber = playersNumber;
    }

    createInformations(nResponses = null) {
        const teamInfos = [];

        if (!nResponses) {
            nResponses = getRandom(15, 30);
        }

        for (let i = 0; i < nResponses; i++) {
            const infos = new TeamInformations();
            // infos.goodResponses = Math.random() >= 0.5;
            infos.responseTime = getRandom(30, 110) / 10;

            for (let j = 1; j <= this.playersNumber; j++) {
                const random = Math.random() >= 0.5;
                infos.responses[j] = random;
            }

            for (const player in infos.responses) {
                if (infos.responses.hasOwnProperty(player)) {
                    infos.responses[player] ? infos.nGoodResponses++ : infos.nBadResponses++;
                }
            }

            teamInfos.push(infos);
        }

        return teamInfos;
    }
}