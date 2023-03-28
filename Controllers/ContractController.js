const MongoClient = require('mongodb').MongoClient;

// Conectar con el servidor

const uri = 'mongodb://127.0.0.1:27017';

const client = new MongoClient(uri);

client.connect();

const db = client.db('prueba');

const municipios = db.collection("municipios");
const contratos = db.collection("contratos");

const getContract = async function (request, reply) {
    const id = Number(request.params.id);
    const res = await contratos.findOne({ _id: id });
    reply.send(res);
}

const getLocalidad = async function (request, reply) {
    const cp = Number(request.params.cp);
    const res = await municipios.find({ codigo_postal: cp }).toArray();
    return res;
};

const listContacts = async function (request, reply) {
    const res = await contratos.find({}).toArray();
    return res;
};

const addContract = async (request, reply) => {
    const cont = await contratos.countDocuments();
    request.body._id = cont + 1;
    const res =  await contratos.insertOne(request.body);
    reply.send(res);
};


const deleteContract = async (request, reply) => {
    const id = Number(request.params.id);
    console.log(id);
    const res = await contratos.deleteOne({ _id: id });
    reply.send(res);
};



const modifyContract = async (request, reply) => {
    console.log(request.body);
    const {_id, nombre, apellido1, apellido2, documento, cp, localidad, direccion, telefono} = request.body;
    const res = await contratos.updateOne({ "_id": _id}, { $set: {"nombre": nombre,"apellido1": apellido1, "apellido2": apellido2, "documento": documento, "cp": cp, "localidad": localidad, "direccion": direccion, "telefono": telefono}});
    reply.send(res);
};


module.exports = {
    getContract,
    getLocalidad,
    listContacts,
    addContract, 
    modifyContract, 
    deleteContract
};