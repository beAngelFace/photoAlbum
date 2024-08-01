'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert('Photos', [
        {
        photo: '',
        description: "My car",
        albumId : 1
      },
      {
        photo: '',
        description: "My horse",
        albumId : 2
      }
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Photos', null, {});
     
  }
};
