const borrowModel = require('../models/index').borrow;

const detailOfBorrowModel = require('../models/index').detailOfBorrow;

const Op = require('sequelize').Op;

exports.addBorrowing =async (request,response)=>{
    let newData={
        memberID:request.body.memberID,
        adminID:request.body.adminID,
        borrowDate:request.body.borrowDate,
        returnDate:request.body.returnDate,
        status:request.body.status
    }

    borrowModel.create(newData)
    .then(result => {
        let borrowID = result.borrowID;
        let detailsOfBorrow = request.body.detailsOfBorrow;

        for (let i = 0; i < detailsOfBorrow.length; i++) {
            detailsOfBorrow[i].borrowID = borrowID;
        }
        detailsOfBorrowModel.bulkCreate(detailsOfBorrow)
        .then(result => {
            return response.json({
                success: true,
                data: result,
                message: "A Book has borrowed"
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                data: error,
                message: "Book cannot be borrowed"
            })
        })
    })
    .catch(error => {
        return response.json({
            success: false,
            data: error,
            message: "Book cannot be borrowed"
        })
    })
}

exports.updateBorrowing = async (request,response)=>{
    let borrowID = request.params.borrowID;
    let updateData = {
        memberID:request.body.memberID,
        adminID:request.body.adminID,
        borrowDate:request.body.borrowDate,
        returnDate:request.body.returnDate,
        status:request.body.status
    }

    borrowModel.update(updateData,{
        where:{
            borrowID:borrowID
        }
    })
    .then(async result => {
        await detailOfBorrowModel.destroy({where:{borrowID:borrowID}});
        let detailsOfBorrow = request.body.detailsOfBorrow;
        for (let i = 0; i < detailsOfBorrow.length; i++) {
            detailsOfBorrow[i].borrowID = borrowID;
        }
        detailsOfBorrowModel.bulkCreate(detailsOfBorrow)
        .then(result => {
            return response.json({
                success: true,
                data: result,
                message: "Borrow has been updated"
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                data: error,
                message: "Borrow cannot be updated",
                errorMessage: error.message
            })
        })
    })
    .catch(error => {
        return response.json({
            success: false,
            data: error,
            message: "Borrow cannot be updated",
            errorMessage: error.message
        })
    })
    
}

exports.deleteBorrowing = async (request,response)=>{
    let borrowID = request.params.borrowID;
    detailsOfBorrowModel.destroy({where:{borrowID:borrowID}})
    .then(result => {
            borrowModel.destroy({where:{borrowID:borrowID}})
            .then(result => {
            return response.json({
                success: true,
                data: result,
                message: "Borrow has been deleted"
            })
            })
        .catch(error => {
            return response.json({
                success: false,
                data: error,
                message: "Borrow cannot be deleted"
            })
        })
    })
}

exports.returnBook = async (request,response)=>{
    let borrowID = request.params.borrowID;

    let today = new Date();
    let currentDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

    borrowModel.update(
        {returnDate:currentDate,
        status:true
    },
    {where:{borrowID:borrowID}})
    .then(result => {
        return response.json({
            success: true,
            data: result,
            message: "Book has been returned"
        })
    })
    .catch(error => {
        return response.json({
            success: false,
            data: error,
            message: "Book cannot be returned",
            errorMessage: error.message
        })
    })
}

exports.getBorrow = async (request,response)=>{
    let data = await borrowModel.findAll({
        include: [{
            model:detailOfBorrowModel,
            as:'detailsOfBorrow',
            include:['book']
        }]
    })
    return response.json({
        success:true,
        data:data,
        message:"Data has been loaded"
    })
}