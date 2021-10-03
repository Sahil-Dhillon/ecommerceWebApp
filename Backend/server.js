import express from 'express';
import { data } from './mainServicesData.js';
const app = express()

app.get('/', (req, res) => {
    res.send('Server started successfully!')
})
app.get('/api/services/:group/:subgroup', (req, res) => {
    const groupFilter = data.services.find((x) => x.title === req.params.group);
    const subGroupFilter = groupFilter.options.find((x) => x.item === req.params.subgroup);
    const servicesFiltered = subGroupFilter.services
    if (servicesFiltered) {
        res.send(servicesFiltered);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});
app.get('/api/services/:group/:subgroup/:service', (req, res) => {
    const groupFilter = data.services.find((x) => x.title === req.params.group);
    const subGroupFilter = groupFilter.options.find((x) => x.item === req.params.subgroup);
    const servicesFiltered = subGroupFilter.services.find((x) => x.name === req.params.service);
    if (servicesFiltered) {
        res.send(servicesFiltered);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
});
app.use(express.static('assets/images'))
app.get('/api/services', (req, res) => {
    res.send(data.services)
})
app.listen(5000, () => {
    console.log("server started at localhost:5000")
})