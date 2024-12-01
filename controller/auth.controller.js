const express=require('express');
const md5=require('md5');

const jwt=require('jsonwebtoken');
const adminModel=require('../models/index').admin;

const autenticate=async(request,response,next)=>{
    let dataLogin={
        username:request.body.username,
        password:md5(request.body.password)
    }

    let dataAdmin=await adminModel.findOne({where:dataLogin});

    if(dataAdmin){
        let payload=JSON.stringify(dataAdmin);
        let secret='Mokleters'
        let token=jwt.sign(payload,secret);
        response.json({
            success: true,
            message: 'Welcome back!',
            token:token,
            data:dataAdmin
        });
    }

    return response.json({
        success:false,
        logged:false,
        message:'Invalid login!'
    });
}
module.exports={autenticate};