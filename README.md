# 📋 Task Manager API - Node.js Puro

## 📝 Descrição

Este projeto é uma API RESTful simples para gerenciamento de tarefas (tasks), desenvolvida em Node.js puro (sem frameworks como Express).  
Ela permite criar, listar, atualizar, deletar e marcar tarefas como concluídas, além de importar tarefas via arquivo CSV.
> 💡 [Desafio](https://efficient-sloth-d85.notion.site/Desafio-01-2d48608f47644519a408b438b52d913f#a84cd8faa00c4e98b168da4cc21e69d2) proposto pela Rocketseat


## ⚙️ Pré-requisitos

- Node.js 18 ou superior instalado

## 🚀 Como rodar o projeto

1. **Inicie o servidor:**

   ```sh
   npm run dev
   ```
   O servidor estará disponível em `http://localhost:8888`.

2. **Testes de API:**

   Utilize o arquivo `api-requests/api-tests-node-fundamentals-desafio.postman.json` no Postman para testar os endpoints.


## 📌 Endpoints

| Método | Rota                  | Descrição                                    |
| ------ | --------------------- | -------------------------------------------- |
| GET    | `/tasks`              | Lista todas as tarefas (pode usar `?search`) |
| POST   | `/tasks`              | Cria uma nova tarefa                         |
| PUT    | `/tasks/:id`          | Atualiza uma tarefa existente                |
| DELETE | `/tasks/:id`          | Remove uma tarefa                            |
| PATCH  | `/tasks/:id/complete` | Marca ou desmarca como concluída             |

## 📥 Funcionalidade Extra: Importação de tarefas via CSV

1. Edite o arquivo `tasks.csv` com as tarefas desejadas.
2. Execute o script para importar:

   ```sh
   node upload-csv/upload-csv.js
   ```


## 🗒️ Observações

* Os dados são persistidos no arquivo `db.json`.
* O projeto utiliza **apenas Node.js puro** e bibliotecas auxiliares para manipulação de arquivos CSV.
