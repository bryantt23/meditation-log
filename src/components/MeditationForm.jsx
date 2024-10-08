import React, { useState } from 'react'
import { addSession } from '../service/sessions'

function MeditationForm() {
    const [description, setDescription] = useState("")
    const [length, setLength] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await addSession(description, length)
        console.log("🚀 ~ handleSubmit ~ res:", res)

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='description'>Description</label>
                <input
                    type="text"
                    value={description}
                    name="description"
                    onChange={e => setDescription(e.target.value)}
                ></input>
                <label htmlFor='length'>Length</label>
                <input
                    type="number"
                    placeholder='Seconds'
                    value={length}
                    name="length"
                    onChange={e => setLength(e.target.value)}
                ></input>
                <button type="submit">Add session</button>
            </form>
        </div>
    )
}

export default MeditationForm