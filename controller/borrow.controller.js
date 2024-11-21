const borrowMOdel = require('../model/borrow.model').borrow;

const detailOfBorrowModel = require('../model/borrow.model').detailOfBorrow;

const Op = require('sequelize').Op;

exports.addBorrowing =async (request,response)=>{
    let newData={
        memberID:request.body.memberID,
        adminID:request.body.adminID,
        borrowDate:request.body.borrowDate,
        returnDate:request.body.returnDate,
        status:request.body.status
    }

    borrowMOdel.create(newData)
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

    borrowMOdel.update(updateData,{
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

