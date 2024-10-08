import React, { useEffect, useState } from 'react'
import { getSessions } from '../service/sessions'

function MeditationSessions() {
    const [sessions, setSessions] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getSessions()
            setSessions(data)
        }
        fetchData()
    }, [])

    return (
        <div>
            <h1>Meditation Sessions</h1>
            {JSON.stringify(sessions)}
        </div>
    )
}

export default MeditationSessions