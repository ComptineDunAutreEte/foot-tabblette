import { AsyncStorage } from "react-native"

export default class UserService {
    constructor() {
        this.user = null;
    }

    async getUser() {
        try {
            const retrievedItem = await AsyncStorage.getItem('user');
            return JSON.parse(retrievedItem);
        } catch (exception) {
            console.log(exception);
        }
    }

    async setUser(user) {
        const userString = JSON.stringify(user);
        await AsyncStorage.setItem('user', userString);
    }
}