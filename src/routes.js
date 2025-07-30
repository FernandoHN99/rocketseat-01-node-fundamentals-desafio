import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath, criarStrData } from './utils/util.js'

const database = new Database()

export const routes = [
   {
      method: 'GET',
      path: buildRoutePath('/tasks'),
      handler: (req, res) => {
      const { search } = req.query

      const users = database.select('tasks', search ? {
         title: search,
         description: search
      } : null)

         return res.end(JSON.stringify(users)) //.end(<mensagem>)
      }
   },
   {
      method: 'POST',
      path: buildRoutePath('/tasks'),
      handler: (req, res) => {
         const { title, description } = req.body

         if (!title || !description ){
            return res.writeHead(400).end('Properties not informed')
         }
         const dataAtual = criarStrData()

         const task = {
            id: randomUUID(),
            title: title,
            description: description,
            completed_at: null,
            created_at: dataAtual,
            updated_at: dataAtual,
         }

         database.insert('tasks', task)
         return res.writeHead(201).end(JSON.stringify(task))
      }
   },
   {
      method: 'DELETE',
      path: buildRoutePath('/tasks/:id'),
      handler: (req, res) => {

         const { id } = req.params
         const deletedTask =  database.delete('tasks', id)
         return deletedTask != -1 ? res.writeHead(204).end() : res.writeHead(404).end('Task Not Found') 
      }
   },
   {
      method: 'PUT',
      path: buildRoutePath('/tasks/:id'),
      handler: (req, res) => {
         const { id } = req.params
         const { title, description } = req.body

         if (!title || !description ){
            return res.writeHead(400).end('Properties not informed')
         }

         const taskUpdated = database.update('tasks', id, {
            title,
            description,
            updated_at: criarStrData()
         })
         return taskUpdated ? res.writeHead(200).end(JSON.stringify(taskUpdated)) : res.writeHead(404).end('Task Not Found') 
      }
   },
   {
      method: 'PATCH',
      path: buildRoutePath('/tasks/:id/complete'),
      handler: (req, res) => {
         const { id } = req.params

         const taskUpdated = database.complete('tasks', id)
         
         return taskUpdated ? res.writeHead(200).end(JSON.stringify(taskUpdated)) : res.writeHead(404).end('Task Not Found') 
      }
   },
]