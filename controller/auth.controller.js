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
    else {
        return response.json({
            success:false,
            logged:false,
            message:'Invalid login!'
        });
    }
}

const authorize=(request,response,next)=>{
    let header = request.headers.authorization;
    let tokenKey = header && header.split(' ')[1];

    if(tokenKey==null){
        return response.json({
            success:false,
            message:'Unauthorized User!'
        });
    }

    let secret='Mokleters';

    jwt.verify(tokenKey, secret, (error, user) => {
        if(error){
            return response.json({
                success:false,
                message:'Invalid token!'
            });
        }
    })
    next();
}
module.exports={ autenticate,authorize };