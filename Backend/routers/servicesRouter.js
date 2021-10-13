import express from "express";
import expressAsyncHandler from "express-async-handler";
import { data } from "../mainServicesData.js";
import Service from "../models/serviceModel.js";

const ServiceRouter = express.Router()
ServiceRouter.get('/', expressAsyncHandler(async (req, res) => {
    const services = await Service.find({})
    res.send(services)
}))


ServiceRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    await Service.remove()
    const createdService = await Service.insertMany(data.services)
    res.send({ createdService })
}))
ServiceRouter.get('/:group/:subgroup', expressAsyncHandler(async (req, res) => {
    const data = await Service.find({})
    const groupFilter = await data.find((x) => x.title === req.params.group);
    const subGroupFilter = await groupFilter.options.find((x) => x.item === req.params.subgroup);
    const servicesFiltered = await subGroupFilter.services
    if (servicesFiltered) {
        res.send(servicesFiltered);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }
}))
ServiceRouter.get('/:group/:subgroup/:service', expressAsyncHandler(async (req, res) => {
    const data = await Service.findOne({ title: req.params.group })
    // const groupFilter = await data.find((x) => x.title === req.params.group);
    const subGroupFilter = await data.options.find((x) => x.item === req.params.subgroup);
    const servicesFiltered = await subGroupFilter.services.find((x) => x.name === req.params.service);
    if (servicesFiltered) {
        res.send(servicesFiltered);
    } else {
        res.status(404).send({ message: 'Product Not Found' });
    }

}))
// app.get('/api/services/:group/:subgroup/:service', (req, res) => {
// });
export default ServiceRouter