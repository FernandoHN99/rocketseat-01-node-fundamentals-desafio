import fs from 'node:fs/promises'
import { criarStrData } from './utils/util.js'
const databasePath = new URL('../db.json', import.meta.url)

export class Database {
   #database = {tasks:[]}

   constructor() {
      fs.readFile(databasePath, 'utf8')
         .then(data => {
            this.#database = JSON.parse(data)
         })
         .catch(() => {
            this.#persist()
         })
   }

   #persist() {
      fs.writeFile(databasePath, JSON.stringify(this.#database))
   }

   select(table, search) {
      let data = this.#database[table] ?? []
      if (search) {
         data = data.filter(row => {
            return Object.entries(search).some(([key, value]) => {
               return row[key].toLowerCase().includes(value.toLowerCase())
            })
         })
      }
      return data
   }

   insert(table, data) {
      if (Array.isArray(this.#database[table])) {
         this.#database[table].push(data)
      } else {
         this.#database[table] = [data]
      }

      this.#persist()

      return data
   }

   delete(table, id) {
      const rowIndex = this.#database[table].findIndex(row => row.id === id)
      if (rowIndex > -1) {
         this.#database[table].splice(rowIndex, 1)
         this.#persist()
      }
      return rowIndex
   }

   update(table, id, data) {
      const rowIndex = this.#database[table].findIndex(row => row.id === id)
      if (rowIndex > -1) {
         this.#database[table][rowIndex] = { ...this.#database[table][rowIndex], ...data }
         this.#persist()
         return this.#database[table][rowIndex]
      }
      return null
   }

   complete(table, id) {
      const row = this.#database[table].find(row => row.id === id)
      if (row) {
         row.completed_at = row.completed_at ? null : criarStrData();
         this.#persist()
      }
      return row
   }
}