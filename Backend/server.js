import express from 'express';
import { data } from './mainServicesData.js';
const app = express()

app.get('/', (req, res) => {
    res.send('Server started successfully!')
})
app.use(express.static('assets/images'))
app.get('/api/services', (req, res) => {
    res.send(data.services)
})
app.listen(5000, () => {
    console.log("server started at localhost:5000")
})