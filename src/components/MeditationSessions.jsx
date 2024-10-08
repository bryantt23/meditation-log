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
            <div>

                <table>
                    <thead>
                        <th>Description</th>
                        <th>YouTube Title</th>
                        <th>Finish Time</th>
                        <th>Length</th>
                    </thead>
                    <tbody>
                        {sessions.map(session => {
                            const { _id, description, finishTime, youtubeTitle, length } = session
                            return (<tr key={_id}>
                                <td>{description}</td>
                                <td>{youtubeTitle}</td>
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