const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'x.txt')

fs.readFile(filePath, 'utf8', (error, data) => {
    if (error) {
        console.error('Error reading the file:', error);
    }
    else {
        const lines = data.split(/\r?\n/)
        const res = {}

        let curKey = ''
        lines.forEach(line => {
            if (line === '') {
                return
            }
            if (line.startsWith("On")) {
                const dateString = (line.substring(3).split("Bryant T")[0]).trim().replace(/\u202F/g, ' ');

                // Clean the date string
                const cleanDateString = dateString
                    .replace(" at ", " ")               // Remove "at"
                    .replace(/[^\x00-\x7F]/g, "")      // Remove non-ASCII characters
                    .replace(/(\d+)(AM|PM)/i, "$1 $2"); // Ensure space between time and AM/PM

                const dateTime = new Date(cleanDateString).getTime()
                curKey = dateTime

                res[curKey] = []
            }
            else {
                res[curKey].push(line)
            }
        })
        console.log("🚀 ~ fs.readFile ~ res:", res, Object.keys(res).length, Object.values(res).length)

    }
})
