require('dotenv/config')
const express = require('express')
const fetch = require("node-fetch");
const cors = require('cors')


const server = express()
server.use(cors())

server.get('/', (req, res) => res.json({ message: 'rika' }))


server.get('/api/v1/movies', (req, res) => {
    const popularMovieData = {
        page: 0,
        total_results: 0,
        total_pages: 0,
        results: null

    }
    let movies;
    let status;
    fetch(`${process.env.API_URL}movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`)
        .then((res) => {
            status = res.status;
            return res.json()
        })
        .then((jsonData) => {
            popularMovieData.page = jsonData.page;
            popularMovieData.total_pages = jsonData.total_pages;
            popularMovieData.total_results = jsonData.total_results;

            movies = jsonData.results;
            popularMovieData.results = movies;

            res.status(status).json(popularMovieData)

        })
        .catch((err) => {
            console.error(err);
        });


})


server.get('/api/v1/movies/:id', (req, res) => {
    const id = req.params.id;
    let movies;
    let status;
    fetch(`${process.env.API_URL}movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`)
        .then((res) => {
            status = res.status;
            return res.json()
        })
        .then((jsonData) => {
            movies = jsonData.results;
            console.log(movies)
            console.log('Pika id', id)
            const movie = movies.find(movie => movie.id == id);
            if (!movie) {
                res.status(404).json({ message: 'Movie does not exist' });
            } else {
                res.status(200).json(movie);
            }
        })
        .catch((err) => {
            console.error(err);
        });


})



server.get('/api/v1/genre', (req, res) => {
    let movies;
    let status;
    fetch(`${process.env.GENRE_URL}movie/list?api_key=${process.env.API_KEY}&language=en-US&page=1`)
        .then((res) => {
            status = res.status;
            return res.json()
        })
        .then((jsonData) => {
            console.log(jsonData)
            res.status(200).json(jsonData)
            
        })
        .catch((err) => {
            console.error(err);
        });
})




server.listen(3001)

console.log('Server is listening on port 3001')


