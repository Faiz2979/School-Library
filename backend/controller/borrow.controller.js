const borrowModel = require('../models/index').borrow;
const bookModel = require('../models/index').book;
const memberModel = require('../models/index').member;
const adminModel = require('../models/index').admin;
const detailsOfBorrowModel = require('../models/index').details_of_borrow;
const Op = require('sequelize').Op;

exports.addBorrowing = async (request, response) => {
    let newData = {
        memberID: request.body.memberID,
        adminID: request.body.adminID,
        date_of_borrow: request.body.date_of_borrow,
        date_of_return: request.body.date_of_return,
        status: request.body.status,
    };

    borrowModel.create(newData)
        .then(result => {
            let borrowID = result.borrowID;
            let detailsOfBorrow = request.body.details_of_borrow;

            for (let i = 0; i < detailsOfBorrow.length; i++) {
                detailsOfBorrow[i].borrowID = borrowID;
            }

            detailsOfBorrowModel.bulkCreate(detailsOfBorrow)
                .then(() => response.json({ success: true, message: 'New Book Borrowed has been inserted' }))
                .catch(error => response.json({ success: false, message: error.message }));
        })
        .catch(error => response.json({ success: false, message: error.message }));
};


exports.updateBorrowing = async (request, response) => {
    let newData = {
        memberID: request.body.memberID,
        adminID: request.body.adminID,
        date_of_borrow: request.body.date_of_borrow,
        date_of_return: request.body.date_of_return,
        status: request.body.status,
    }; // Data yang sama seperti `addBorrowing`
    let borrowID = request.params.borrowID;

    borrowModel.update(newData, { where: { borrowID: borrowID } })
        .then(async () => {
            await detailsOfBorrowModel.destroy({ where: { borrowID: borrowID } });
            let detailsOfBorrow = request.body.details_of_borrow;

            for (let i = 0; i < detailsOfBorrow.length; i++) {
                detailsOfBorrow[i].borrowID = borrowID;
            }

            detailsOfBorrowModel.bulkCreate(detailsOfBorrow)
                .then(() => response.json({ success: true, message: 'Book Borrowed has been updated' }))
                .catch(error => response.json({ success: false, message: error.message }));
        })
        .catch(error => response.json({ success: false, message: error.message }));
};

exports.deleteBorrowing = async (request, response) => {
    let borrowID = request.params.borrowID;

    detailsOfBorrowModel.destroy({ where: { borrowID: borrowID } })
        .then(() => {
            borrowModel.destroy({ where: { borrowID: borrowID } })
                .then(() => response.json({ success: true, message: 'Borrowing Book has been deleted' }))
                .catch(error => response.json({ success: false, message: error.message }));
        })
        .catch(error => response.json({ success: false, message: error.message }));
};


exports.returnBook = async (request, response) => {
    let borrowID = request.params.id;
    let currentDate = new Date().toISOString().slice(0, 10);

    borrowModel.update(
        { date_of_return: currentDate, status: true },
        { where: { id: borrowID } }
    )
        .then(() => response.json({ success: true, message: 'Book has been returned' }))
        .catch(error => response.json({ success: false, message: error.message }));
};

exports.getBorrow = async (request, response) => {
    let data = await borrowModel.findAll({
        include: [
            {
                model: memberModel,
                as: 'member' // Relasi langsung dari borrow ke member
            },
            {
                model: adminModel,
                as: 'admin' // Relasi langsung dari borrow ke admin
            },
            {
                model: detailsOfBorrowModel,
                as: 'details_of_borrow', // Relasi borrow ke details_of_borrow
                include: [
                    {
                        model: bookModel,
                        as: 'book' // Relasi details_of_borrow ke book
                    }
                ]
            }
        ]
    });

    return response.json({
        success: true,
        data,
        message: `All borrowing book have been loaded`
    });
};

exports.getTotalBorrowedBooks = async (request, response) => {
    try {
        // Menghitung total qty dari details_of_borrow
        const totalBorrowedBooks = await detailsOfBorrowModel.sum('qty');

        response.json({
            success: true,
            total_borrowed_books: totalBorrowedBooks || 0 // Jika null, default ke 0
        });
    } catch (error) {
        console.error('Error fetching total borrowed books:', error);
        response.status(500).json({
            success: false,
            message: 'Failed to fetch total borrowed books',
        });
    }
};

exports.getOverdueBooks = async (request, response) => {
    try {
        const overdueBooks = await borrowModel.findAll({
            include: [
                {
                    model: detailsOfBorrowModel,
                    as: 'details_of_borrow', // Relasi ke detail peminjaman
                    include: [
                        {
                            model: bookModel,
                            as: 'book', // Relasi detail peminjaman ke buku
                        },
                    ],
                },
            ],
        });
        
        const overdueCount = overdueBooks.filter((borrow) => {
            const borrowDate = new Date(borrow.date_of_borrow); // Tanggal peminjaman
            const overdueThreshold = new Date(borrowDate);
            overdueThreshold.setDate(borrowDate.getDate() + 3); // Tambahkan 3 hari ke tanggal peminjaman
        
            // Jika status TRUE, gunakan date_of_return. Jika FALSE, gunakan tanggal saat ini.
            const returnDate = borrow.status
                ? new Date(borrow.date_of_return) // Jika sudah dikembalikan
                : new Date(); // Jika belum dikembalikan
        
            return returnDate > overdueThreshold; // Periksa apakah terlambat
        }).length;
        
        response.json({
            success: true,
            total_overdue: overdueCount, // Jumlah buku yang terlambat
            data: overdueBooks, // Data lengkap buku yang diperiksa (opsional)
        });
        
    } catch (error) {
        console.error('Error fetching overdue books:', error);
        response.status(500).json({
            success: false,
            message: 'Failed to fetch overdue books',
        });
    }
}