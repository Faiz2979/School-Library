const adminModel=require('../models/index').admin;
const Op = require('sequelize').Op;
const hash = require('md5');

exports.showAdmins = async (request,response)=>{
    let admin = await adminModel.findAll();
    return response.json({
        success: true,
        data: admin,
        message: "All members have been loaded"
    })
}

exports.findAdmin = async (request,response)=>{
    let keyword = request.body.keyword;

    let admin = await adminModel.findAll({
        where: {
                [Op.or]: [
                    {name: {[Op.like]: `%${keyword}%`}},
                    {username: {[Op.like]: `%${keyword}%`}},
                    {address: {[Op.like]: `%${keyword}%`}}
                ]
        }
    });
    return response.json({
        success: true,
        data: admin,
        message: "admin have been loaded"
    })
}

exports.addAdmin = async (request,response)=> {
    let newAdmin = {
        name: request.body.name,
        address: request.body.address,
        username: request.body.username,
        password: hash(request.body.password),
        contact: request.body.contact
    }
    adminModel.create(newAdmin)
    .then(result => {
        return response.json({
            success: true,
            data: result,
            message: "Admin has been added"
        })
    })
    .catch(error => {
        return response.json({
            success: false,
            data: error,
            message: "Admin cannot be added"
        })
    })
}

exports.updateAdmin = async (request,response)=> {
    
    let dataAdmin = {
        name: request.body.name,
        address: request.body.address,
        username: request.body.username,
        password: hash(request.body.password),
        contact: request.body.contact
    }

    let adminID = request.params.adminID;

    adminModel.update(dataAdmin, {where: {adminID: adminID}})
    .then(result => {
        return response.json({
            success: true,
            data: result,
            message: "Data has been updated"
        })
    })
    .catch(error => {
        return response.json({
            success: false,
            data: error,
            message: "Data cannot be updated"
        })
    })
}

exports.removeAdmin = async (request,response)=> {
    
    let adminID=request.params.adminID;
    adminModel.destroy({where: {adminID: adminID}})
    .then(result => {
        return response.json({
            success: true,
            data: result,
            message: "Data has been deleted"
        })
    })
    .catch(error => {
        return response.json({
            success: false,
            data: error,
            message: "Data cannot be deleted"
        })
    })
}

