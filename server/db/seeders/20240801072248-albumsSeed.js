'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('Albums', [
        {
        title: 'Cars',
        cover: "",
        userId: 1
      },
      {
        title: 'Horses',
        cover: "",
        userId: 2
      },
      
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
   
      await queryInterface.bulkDelete('Albums', null, {});
     
  }
};
