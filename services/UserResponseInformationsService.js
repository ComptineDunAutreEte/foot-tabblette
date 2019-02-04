import { UserResponseInformations } from "../model/user-response-informations";
import { categories } from "../model/categories";

export class UserResponseInformationsService {
    createResponses(nResponses = null) {
        if (!nResponses) {
            nResponses = this.getRandom(15, 40);
        }

        const userResponses = [];

        for (let i = 0; i < nResponses - 1; i++) {
            const response = new UserResponseInformations();
            response.category = categories[this.getRandom(0, categories.length)].key;
            response.isGoodResponse = Math.random() >= 0.5;
            response.responseTime = this.getRandom(30, 150) / 10;

            userResponses.push(response);
        }

        return userResponses;
    }

    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}
