
const memberModel = require('../models/index').member;
const Op = require('sequelize').Op;
const path = require('path');
const fs = require('fs');
const upload = require('../profilePIct/up-profilePict').single('profilePict');

exports.getAllMember = async (request, response) => {
    let members = await memberModel.findAll();
    return response.json({
        success: true,
        data: members,
        message: "All members have been loaded"
    });
};

exports.findMember = async (request, response) => {
    let keyword = request.body.keyword;

    let members = await memberModel.findAll({
        where: {
            [Op.or]: [
                { name: { [Op.like]: `%${keyword}%` } },
                { gender: { [Op.like]: `%${keyword}%` } },
                { address: { [Op.like]: `%${keyword}%` } }
            ]
        }
    });
    return response.json({
        success: true,
        data: members,
        message: "Members have been loaded"
    });
};

exports.addMember = [
    upload, // Middleware untuk menangani unggahan gambar
    async (request, response) => {
        try {
            let newMember = {
                name: request.body.name,
                gender: request.body.gender,
                address: request.body.address,
                contact: request.body.contact,
                profilePict: request.file ? request.file.filename : 'profilePict/default.png', // Simpan nama file jika ada, jika tidak gunakan default.png
            };

            let result = await memberModel.create(newMember);
            return response.json({
                success: true,
                data: result,
                message: "Member has been added",
            });
        } catch (error) {
            return response.json({
                success: false,
                data: error.message,
                message: "Member cannot be added",
            });
        }
    }
];

exports.updateMember = [
    upload, // Middleware untuk menangani unggahan file
    async (request, response) => {
        try {
            let memberID = request.params.memberID;

            // Ambil data member berdasarkan ID
            let member = await memberModel.findOne({ where: { memberID: memberID } });
            if (!member) {
                return response.status(404).json({
                    success: false,
                    message: "Member not found",
                });
            }

            // Data yang akan diperbarui
            let updatedMember = {
                name: request.body.name,
                address: request.body.address,
                gender: request.body.gender,
                contact: request.body.contact,
            };

            // Jika ada file baru, hapus file lama (jika ada) dan simpan file baru
            if (request.file) {
                if (member.profilePict) {
                    let oldFilePath = path.join(__dirname, '../public/uploads/', member.profilePict);
                    if (fs.existsSync(oldFilePath)) {
                        fs.unlinkSync(oldFilePath); // Hapus file lama
                    }
                }
                updatedMember.profilePict = request.file.filename; // Simpan nama file baru
            }

            // Update data di database
            await memberModel.update(updatedMember, { where: { memberID: memberID } });

            return response.json({
                success: true,
                data: updatedMember,
                message: "Member has been updated",
            });
        } catch (error) {
            return response.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
];

exports.deleteMember = async (request, response) => {
    let memberID = request.params.memberID;
    memberModel.destroy({ where: { memberID: memberID } })
        .then(result => {
            return response.json({
                success: true,
                data: result,
                message: "Data has been deleted"
            });
        })
        .catch(error => {
            return response.json({
                success: false,
                data: error,
                message: "Data cannot be deleted"
            });
        });
};
