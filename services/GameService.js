import { AsyncStorage } from "react-native"

export default class GameService {
    constructor() {
    }

    async isInGame() {
        try {
            return await AsyncStorage.getItem('isInGame');
        } catch (exception) {
            console.log(exception);
        }
    }

    async setIsInGame(isInGame) {
        await AsyncStorage.setItem('isInGame', isInGame);
    }
}