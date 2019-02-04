import { AsyncStorage } from "react-native"

export default class SimpleAsyncStorageService {
    constructor() {
    }

    async get(key) {
        try {
            return await AsyncStorage.getItem(key);
        } catch (exception) {
            console.log(exception);
        }
    }

    async set(key, pseudo) {
        await AsyncStorage.setItem(key, pseudo);
    }
}