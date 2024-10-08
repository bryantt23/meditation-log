import React, { useEffect, useState } from 'react'
import { getSessions, addSession, copySession } from '../service/sessions'
import MeditationForm from './MeditationForm'

function MeditationSessions() {
    const [sessions, setSessions] = useState([])

    const fetchData = async () => {
        const data = await getSessions()
        setSessions(data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleAddSession = async (e, description, length) => {
        e.preventDefault()
        try {
            await addSession(description, length)
            fetchData()
        } catch (error) {
            console.error("Error adding session:", error)
        }
    }

    const copyMeditationSession = async (description, youTubeTitle, length) => {
        try {
            await copySession(description, youTubeTitle, length)
            fetchData()
        } catch (error) {
            console.error("Error adding session:", error)
        }
    }

    return (
        <div>
            <h1>Meditation Sessions</h1>
            <div>
                <MeditationForm handleAddSession={handleAddSession} />

                <table border="1">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>YouTube Title</th>
                            <th>Finish Time</th>
                            <th>Length</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sessions.map(session => {
                            const { id, description, finishTime, youTubeTitle, length } = session
                            return (<tr key={id}>
                                <td>{description}</td>
                                <td>{youTubeTitle}</td>
                                <td>{finishTime}</td>
                                <td>{length}</td>
                                <td><button onClick={() => copyMeditationSession(description, youTubeTitle, length)}>Copy Session</button></td>
                            </tr>)
                        }
                        )}
                    </tbody>
                </table>


            </div>
        </div>
    )
}

export default MeditationSessions