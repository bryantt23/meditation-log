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

export const addSession = async (description, length) => {
    try {
        let postBody = { description, length, finishTime: Date.now() }
        if (description.includes("youtube.com")) {
            const videoId = description.split("v=")[1]
            const youTubeUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=AIzaSyBRrQmXEXUOOYkXW_sa7Gd5dGJJkEbiT_Q&part=snippet`

            const response = await axios.get(youTubeUrl)
            const youTubeTitle = response.data.items[0].snippet.title
            postBody.youTubeTitle = youTubeTitle
        }

        await axios.post(`${BASE_URL}/sessions`, postBody)
    } catch (error) {
        console.error(error)
    }
}