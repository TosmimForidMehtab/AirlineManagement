"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert("Airports", [
            {
                name: "BLR",
                address: "Kampegowda International Airport",
                cityId: 6,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "MYQ",
                address: "Mysuru Airport",
                cityId: 6,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "IXE",
                address: "Mangaluru International Airport",
                cityId: 6,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "GBI",
                address: "Gulbarga Airport",
                cityId: 6,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "BOM",
                address: "Chhatrapati Shivaji International Airport",
                cityId: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: "DEL",
                address: "Indira Gandhi International Airport",
                cityId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
