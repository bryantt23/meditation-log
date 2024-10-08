import React, { useEffect, useState } from 'react'
import { getSessions } from '../service/sessions'
import MeditationForm from './MeditationForm'

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
            <div>
                <MeditationForm />

                <table border="1">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>YouTube Title</th>
                            <th>Finish Time</th>
                            <th>Length</th>
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