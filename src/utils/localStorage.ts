const STORAGE_UPDATED_EVENT = "storage-updated"

const notifyStorageUpdated = () => window.dispatchEvent(new Event(STORAGE_UPDATED_EVENT))

export const setItem = <T>(key: string, value: T) => {
    try {
        window.localStorage.setItem(key, JSON.stringify(value))
        notifyStorageUpdated()
    } catch (error) {
        console.error(error)
    }
}

export const getItem = <T>(key: string): T | undefined => {
    try {
        const item = window.localStorage.getItem(key)
        return item ? JSON.parse(item) : undefined
    } catch (error) {
        console.error(error)
    }
}

export const removeItem = (key: string) => {
    try {
        window.localStorage.removeItem(key)
        notifyStorageUpdated()
    } catch (error) {
        console.error(error)
    }
}

export { STORAGE_UPDATED_EVENT }