const contractCtrl = require("../Controllers/ContractController");

const routes = [
    {
        url: '/getContract/:id',
        method: 'GET',
        handler: contractCtrl.getContract
    },
    {
        url: '/getLocalidad/:cp',
        method: 'GET',
        handler: contractCtrl.getLocalidad
    },
    {
        url: '/listContracts',
        method: 'GET',
        handler: contractCtrl.listContacts
    },
    {
        url: '/addContract',
        method: 'POST',
        handler: contractCtrl.addContract,
    },
    {
        url: '/modifyContract',
        method: 'PUT',
        handler: contractCtrl.modifyContract
    },
    {
        url: '/deleteContract/:id',
        method: 'DELETE',
        handler: contractCtrl.deleteContract
    }
]

module.exports = routes;