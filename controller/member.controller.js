const memberModel=require('../models/index').member;
const Op = require('sequelize').Op;
const path = require('path');
const fs = require('fs');

const uploadpfp = require('../profilePict/up-profilePict').single('profilePict');


exports.getAllMember = async (request,response)=>{
    let members = await memberModel.findAll();
    return response.json({
        success: true,
        data: members,
        message: "All members have been loaded"
    })
}

exports.findMember = async (request,response)=>{
    let keyword = request.body.keyword;

    let members = await memberModel.findAll({
        where: {
                [Op.or]: [
                    {name: {[Op.like]: `%${keyword}%`}},
                    {gender: {[Op.like]: `%${keyword}%`}},
                    {address: {[Op.like]: `%${keyword}%`}}
                ]
        }
    });
    return response.json({
        success: true,
        data: members,
        message: "Members have been loaded"
    })
}

exports.addMember = async (request,response)=> {
    uploadpfp(request, response, async (error) => {
        if(!request.file){
            return profilePict= "default.jpg";
        }
    
        let newMember = {
            name: request.body.name,
            gender: request.body.gender,
            address: request.body.address,
            contact: request.body.contact,
            profilePict: request.file.filename
        }
        memberModel.create(newMember)
        .then(result => {
            return response.json({
                success: true,
                data: result,
                message: "Member has been added"
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                data: error,
                message: "Member cannot be added"
            })
        })
    })
    
}

exports.updateMember = async (request,response)=> {
    
    let dataMember = {
        name: request.body.name,
        address: request.body.address,
        gender: request.body.gender,
        contact: request.body.contact
    }

    let idMember = request.params.id;
    if (req.file) {
        const newPict = await bookModel.findOne({ where: { bookID: bookID } });
        const oldPict = newPict.cover;
        const pathCover = path.join(__dirname, `../cover/${oldPict}`);

        if (fs.existsSync(pathCover)) {
            fs.unlinkSync(pathCover, err => console.log(err));
        }

        // Update the book cover if a new file is uploaded
        book.cover = req.file.filename;
    }

    memberModel.update(dataMember, {where: {memberID: idMember}})
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
    
    let idMember=request.params.id;
    memberModel.destroy({where: {memberID: idMember}})
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

