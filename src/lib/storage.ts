import AsyncStorage from '@react-native-async-storage/async-storage'

export async function save(key: string, value: string) {
    try {
        await AsyncStorage.setItem(`@appDelivery:${key}`, value)
        // console.log(`@appDelivery:${key}`, value)
    } catch (error) {
        throw new Error(error)
    }
}

export async function get(key: string) {
    try {
        const response = await AsyncStorage.getItem(`@appDelivery:${key}`)
        return response
    } catch (error) {
        throw new Error(error)
    }
}