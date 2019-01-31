import { AsyncStorage } from "react-native"

export default class PseudoService {
    constructor() {
    }

    async getPseudo() {
        try {
            return await AsyncStorage.getItem('pseudo');
        } catch (exception) {
            console.log(exception);
        }
    }

    async setPseudo(pseudo) {
        await AsyncStorage.setItem('pseudo', pseudo);
    }
}