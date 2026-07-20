const express = require('express');
const cors = require('cors')
const app = express();
const swaggerui = require("swagger-ui-express");
const swaggerspecs = require("./swagger");
const port = 3000;
app.use(express.json())
app.use(cors({origin:'*'}))

const tasks = [
    {id:1,name:"Task 1",done:true},
    {id:2,name:"Task 2",done:true},
    {id:3,name:"Task 3",done:false},
]
app.use('/docs',swaggerui.serve, swaggerui.setup(swaggerspecs))

/**
 * @swagger
 * /:
 *   get:
 *     summary: API info
 *     description: Returns basic metadata about the Task API.
 *     responses:
 *       200:
 *         description: API metadata returned.
 */
app.get('/', (req, res) => {
  res.status(200).json({ "name": "Task API", "version": "1.0", "endpoints": ["/tasks"] });
});

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check
 *     description: Returns the server health status.
 *     responses:
 *       200:
 *         description: Server is healthy.
 */
app.get('/health', (req, res) => {
  res.status(200).json({ "status": "ok"});
});

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: List of all tasks
 *     description: Returns all tasks.
 *     responses:
 *       200:
 *         description: Tasks returned.
 */
app.get('/tasks', (req, res) => {
  res.status(200).send(tasks);
});

/**
 * @swagger
 * /task/{id}:
 *   get:
 *     summary: Get / Search  task
 *     description: Returns a single task by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task id
 *     responses:
 *       200:
 *         description: Task found.
 *       404:
 *         description: Task not found.
 */
app.get('/task/:id', (req, res) => {
    var task = tasks.find(t => t.id == req.params.id)
    if(task){
        res.status(200).send(task)
    }else{
        res.status(404).json({ "error": `Task ${req.params.id} not found` })
    }
})


/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create task
 *     description: Adds a new task.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *               done:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Task created.
 *       400:
 *         description: Invalid task data.
 */
app.post('/tasks', (req, res) => {
    var task = req.body
    if(task.title === ""){
        res.status(400).send({})
        return
    }else{
        tasks.push(task)
        res.status(201).send(task)
    }
})

/**
 * @swagger
 * /task/{id}:
 *   put:
 *     summary: Update task
 *     description: Updates a task by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *               done:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Task updated.
 *       400:
 *         description: Invalid task data.
 *       404:
 *         description: Task not found.
 */
app.put('/task/:id', (req, res) => {
    var newTask = req.body
    var index = tasks.findIndex(t => t.id == req.params.id)
    if(newTask.title === ""){
        res.status(400).send({})

    }else if(index === -1){
        res.status(404).json({ "error": `Task ${req.params.id} not found`})

    }else{
        tasks[index] = newTask
        res.status(201).send({"Updated": newTask })
    }
})

/**
 * @swagger
 * /task/{id}:
 *   delete:
 *     summary: Delete task
 *     description: Deletes a task by id.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task id
 *     responses:
 *       204:
 *         description: Task deleted.
 *       404:
 *         description: Task not found.
 */
app.delete('/task/:id', (req, res) => {
    var id = req.params.id
    var index = tasks.findIndex(t => t.id == id)
    if(index === -1){
        res.status(404).json({ "error": `Task ${id} not found` })

    }else{
        tasks.splice(index, 1)
        res.status(204).send()
    }
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});