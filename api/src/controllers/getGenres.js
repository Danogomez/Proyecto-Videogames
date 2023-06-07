require("dotenv").config();
const { API_KEY } = process.env;
const axios = require('axios');
const { Genres } = require("../db");



const getGenres = async (req,res) => {
    try {
        let URL_BASE = `https://api.rawg.io/api/genres?key=d53a115df3bf4bbdb04cb002cc630585`;
        let genresApi = await axios.get(URL_BASE);
       
        const genres = genresApi.data.results.map(gen =>gen.name);

        genres.forEach(element => {
            Genres.findOrCreate({where: {name: element} });
        });

        const allGenres = await Genres.findAll();
        res.status(200).json(allGenres);

    } catch (error) {
        res.status(404).send('Not genders')
    }
};


module.exports = getGenres