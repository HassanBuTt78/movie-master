const express = require('express')
const database = require('../../database.js')
const router = express.Router()
const movies = require('./movies.js')



router.get('/', (req, res)=>{
    res.send({message: 'api is working'})
})

router.get('/movie/:id', async (req, res)=>{
let id = req.params.id
let answer = database.movieById(id)
res.send(await answer)
})


router.use('/movies', movies)

module.exports = router