import axios from 'axios'

const BASE_URL = 'http://localhost:5000'

export const getSessions = async () => {
    try {
        const sessions = await axios.get(`${BASE_URL}/sessions`)
        return sessions.data
    } catch (error) {
        console.error(error)
        return []
    }
}