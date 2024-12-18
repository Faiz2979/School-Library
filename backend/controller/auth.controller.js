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

const authorize = (request, response, next) => {
    const header = request.headers.authorization;
    const tokenKey = header && header.split(' ')[1];
    console.log("it works");
    
    if (!tokenKey) {
        return response.status(401).json({
            success: false,
            message: 'Unauthorized User!',
        });
    }
    else{
        const secret = 'Mokleters';

        jwt.verify(tokenKey, secret, (error, user) => {
            if (error) {
                return response.status(403).json({
                    success: false,
                    message: 'Invalid token!',
                });
            }

            // Attach user data to the request if needed
            request.user = user;
            next();
            
        });
    }
};
module.exports={ autenticate,authorize };