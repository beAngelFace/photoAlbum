const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     
     
    await queryInterface.bulkInsert('Users', [
      {
        name: "Benya",
        email: "benya@benya",
        password :  await bcrypt.hash('123', 10),
      },
      {
        name: "Lika",
        email: "lika_ne@meow",
        password :  await bcrypt.hash('123', 10),
      }
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
   
    
     await queryInterface.bulkDelete('Users', null, {});
     
  }
};
