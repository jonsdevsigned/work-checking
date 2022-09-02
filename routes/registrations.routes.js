const express = require('express')

const {
	getAllRegistrations,
	getRegistration,
	createRegistration,
	updateRegistration,
	deleteRegistration
} = require('../controllers/registrations.controller')

const registrationsRouter = express.Router()

registrationsRouter.post('/', createRegistration)
registrationsRouter.get('/', getAllRegistrations)
registrationsRouter.get('/:id', getRegistration)
registrationsRouter.patch('/:id', updateRegistration)
registrationsRouter.delete('/:id', deleteRegistration)

module.exports = { registrationsRouter }
