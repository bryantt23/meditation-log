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

    const copyMeditationSession = async (description, youTubeUrl, length) => {
        try {
            await copySession(description, youTubeUrl, length)
            fetchData()
        } catch (error) {
            console.error("Error adding session:", error)
        }
    }

    const getFormattedLength = (time) => {
        const minutes = Math.floor(time / 60);
        const minutesString = minutes === 0 ? '' : `${minutes} minute${minutes === 1 ? "" : "s"}`
        const seconds = time % 60
        const secondsString = seconds === 0 ? '' : `${seconds} second${seconds === 1 ? "" : "s"}`
        return `${minutesString} ${secondsString}`
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
                            <th>YouTube URL</th>
                            <th>Finish Time</th>
                            <th>Length</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sessions.map(session => {
                            const { id, description, finishTime, youTubeUrl, length, thumbnailUrl } = session
                            const date = new Date(finishTime)

                            // Specify options for the date
                            const dateOptions = {
                                month: 'long', // Full name of the month
                                day: 'numeric' // Numeric day
                            };

                            // Specify options for the time
                            const timeOptions = {
                                hour: 'numeric',   // Numeric hour
                                minute: '2-digit', // Two digit minute
                                hour12: true       // 12-hour time with AM/PM
                            };
                            return (<tr key={id}>
                                <td>{description}</td>
                                <td>{youTubeUrl &&
                                    <a href={`${youTubeUrl}`} target='_blank'>
                                        <img src={thumbnailUrl} />
                                    </a>}</td>
                                <td>{`${date.toDateString('en-US', dateOptions)} ${date.toLocaleTimeString('en-US', timeOptions)}`}</td>
                                <td>{getFormattedLength(length)}</td>
                                <td><button onClick={() => copyMeditationSession(description, youTubeUrl, length)}>Copy Session</button></td>
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