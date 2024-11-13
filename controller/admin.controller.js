const adminModel=require('../models/index').admin;
const Op = require('sequelize').Op;

exports.getAllMember = async (request,response)=>{
    let admin = await adminModel.findAll();
    return response.json({
        success: true,
        data: admin,
        message: "All members have been loaded"
    })
}

exports.findMember = async (request,response)=>{
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

exports.addMember = async (request,response)=> {
    let newAdmin = {
        name: request.body.name,
        address: request.body.address,
        username: request.body.username,
        password: request.body.password,
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

exports.updateMember = async (request,response)=> {
    
    let dataMember = {
        name: request.body.name,
        address: request.body.address,
        username: request.body.username,
        password: request.body.password,
        contact: request.body.contact
    }

    let idMember = request.params.id;

    adminModel.update(dataMember, {where: {memberID: idMember}})
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

exports.deleteMember = async (request,response)=> {
    
    let idAdmin=request.params.id;
    adminModel.destroy({where: {adminID: idAdmin}})
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

