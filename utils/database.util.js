const { Sequelize, DataTypes } = require('sequelize')

const db = new Sequelize({
	dialect: 'postgres',
	host: 'localhost',
	username: 'postgres',
	password: `mu:fcHS;a@rj0%+'6uV9 wN`,
	port: 5432,
	database: 'work-checking',
	logging: false
})

module.exports = { db, DataTypes }
