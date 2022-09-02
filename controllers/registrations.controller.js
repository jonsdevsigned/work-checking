const { Registration } = require('../models/registration.model')

const createRegistration = async (req, res) => {
	try {
		const { entranceTime, exitTime } = req.body

		const registration = await Registration.create({
			entranceTime,
			exitTime
		})

		/*Esta condicional es para que al crear el registro la persona pueda anotar de una vez la hora de salida,
		y el estatus se actualice automaticamente. Es una opción que pueda interesar al cliente.*/
		if (registration.exitTime !== null) {
			await registration.update({
				status: 'out'
			})
		}

		res.status(201).json({
			status: 'success',
			data: { registration }
		})
	} catch (error) {
		console.log(error)
	}
}

const getAllRegistrations = async (req, res) => {
	try {
		const registrations = await Registration.findAll()

		res.status(200).json({
			status: 'success',
			data: { registrations }
		})
	} catch (error) {
		console.log(error)
	}
}

const getRegistration = async (req, res) => {
	try {
		const { id } = req.params

		const registration = await Registration.findOne({ where: { id } })

		if (!registration) {
			return res.status(404).json({
				status: 'error',
				message: 'Registration no found'
			})
		}

		res.status(200).json({
			status: 'success',
			data: { registration }
		})
	} catch (error) {
		console.log(error)
	}
}

const updateRegistration = async (req, res) => {
	try {
		const { exitTime } = req.body
		const { id } = req.params

		const registration = await Registration.findOne({ where: { id } })

		if (!registration) {
			return res.status(404).json({
				status: 'error',
				message: 'Registration no found'
			})
		}

		await registration.update({
			exitTime,
			status: 'out'
		})

		res.status(200).json({
			status: 'success',
			data: { registration }
		})
	} catch (error) {
		console.log(error)
	}
}

const deleteRegistration = async (req, res) => {
	try {
		const { id } = req.params

		const registration = await Registration.findOne({ where: { id } })

		if (!registration) {
			return res.status(404).json({
				status: 'error',
				message: 'Registration no found'
			})
		}

		await registration.update({
			status: 'cancelled'
		})

		res.status(200).json({
			status: 'success',
			data: { registration }
		})
	} catch (error) {
		console.log(error)
	}
}

module.exports = {
	getAllRegistrations,
	getRegistration,
	createRegistration,
	updateRegistration,
	deleteRegistration
}
