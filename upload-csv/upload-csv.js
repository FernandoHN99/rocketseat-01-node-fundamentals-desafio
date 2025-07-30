import fs from 'node:fs';
import { parse } from 'csv-parse';

const fileCSVPath = new URL('./tasks.csv', import.meta.url)

const readStream = fs.createReadStream(fileCSVPath);

const waitSeg = (timeSeg) => {
   return new Promise(resolve => setTimeout(resolve, timeSeg*1000))
}

async function sendCSV() {

   const lines = readStream.pipe(parse({ columns: true }))

   for await (const line of lines) {
      const { title, description } = line
      await fetch('http://localhost:8888/tasks', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            title,
            description,
         })
      })
      console.log(`${title}, ${description}`)
      await waitSeg(0.5) // Não podemos encapsular o sendCSV dentro de um setTimeout pois ele nao eh awaitable
   }
}

sendCSV()