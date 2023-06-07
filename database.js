const mongoose = require('mongoose')

let Movie;

const connectDB = async () => {
    let db = mongoose.connect('mongodb+srv://Hassan:hassan@cluster0.wmrmexl.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => { console.log("db connected successfully") }).catch(e => console.log(e))
    const movieSchema = new mongoose.Schema({
        title: String,
        teaser: String,
        img: String,
        genre: Array,
        links: Object,
        devL: String
    }, { versionKey: false })
    Movie = new mongoose.model('Movie', movieSchema)

}

const movieById = async (id) => {
    let found = await Movie.findOne({ _id: id })
    return await found
}

const moviesByGenre = async (genre, amount) => {
    if (typeof amount == undefined) {

        let found = await Movie.find({ genre: { $regex: genre, $options: 'i' } })
        return await found
    }
    else {

        let found = await Movie.find({ genre: { $regex: genre, $options: 'i' } }).limit(amount)
        return await found
    }
}


const genreQuery = async (query, genre, amount) => {
    if (typeof amount == undefined) {
        let found = await Movie.find({ genre: { $regex: genre, $options: 'i' }, title: { $regex: query, $options: 'i' } })
        return await found
    }
    else {
        let found = await Movie.find({ genre: { $regex: genre, $options: 'i' }, title: { $regex: query, $options: 'i' } }).limit(amount)
        return await found
    }
}



const query = async (query, amount) => {
    query = await processString(query)

    if (typeof amount == undefined) {
        let found = await Movie.find({ title: { $regex: query } })
        return await found
    }
    else {
        let found = await Movie.find({ title: { $regex: query } }).limit(amount)
        return await found
    }
}



const processString = async (string) => {
    let arr = string.split(" ")
    let arr2 = await arr.map((x) => { return `(?=^.*?${x}.*$)` })
    arr2.push("^.*$")
    let st = arr2.join("")
    let r = new RegExp(st, 'gi')
    return r
}

const getRandom = async () => {
    let found = Movie.aggregate().sample(4)
    return await found
}



module.exports = {
    connectDB,
    query,
    moviesByGenre,
    genreQuery,
    getRandom,
    movieById
}