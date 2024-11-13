'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.bulkInsert('members', [
    {
      name: 'John Doe',
      gender: 'Male',
      address: 'Manila',
      contact: '09123456789',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Watesigma',
      gender: 'SigmaMale',
      address: 'Ohio',
      contact: '10101010101',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ])

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
