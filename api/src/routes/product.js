const server = require('express').Router();
const { Product } = require('../db.js');
const {Sequelize:{Op}} = require('sequelize')

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

server.get('/category/:categoryId',(req,res) => {
	let {categoryId} = req.params
	Product.findAll({where: categoryId})
	.then(products => res.status(200).json(products))
	.catch(error => res.status(404).json({
		message: 'No se encontraron productos',
		error: error
	}))
})

server.get('/search',(req,res) => {
	let {text} = req.query
	Product.findAll({
		where:{
			[Op.or]:[
				{name:{
					[Op.like]:`%${text}%`
				}},
				{description:{
					[Op.substring]: `${text}`
				}}
			]
		}
	})
	.then(products => res.status(200).json(products))
	.catch(error => res.status(404).json({
		message: 'No se encontraron productos',
		error: error
	}))
})

server.post('/create',(req,res) => {
	let data = req.body
	Product.create(data)
	.then(newProduct => res.status(201).json({
		message: 'Producto creado exitosamente!',
		newProduct
	}))
	.catch(error => res.status(400).json({
		message: 'El producto ya existe',
		error: error
	}))
})

module.exports = server;
