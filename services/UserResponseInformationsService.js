import { UserResponseInformations } from "../model/user-response-informations";
import { categories } from "../model/categories";
import { getRandom } from "../constants/Utils";

export class UserResponseInformationsService {
    createResponses(nResponses = null) {
        if (!nResponses) {
            nResponses = getRandom(15, 30);
        }

        let userResponses = [];

        for (let i = 0; i < nResponses; i++) {
            const response = new UserResponseInformations();
            response.category = categories[getRandom(0, categories.length)].key;
            response.isGoodResponse = Math.random() >= 0.5;
            response.responseTime = getRandom(30, 150) / 10;

            userResponses.push(response);
        }

        return userResponses;
    }
}
