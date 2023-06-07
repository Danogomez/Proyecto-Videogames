const {getAllGames} = require('./getGamesAll'); 

const getGameQuery = async (req, res) => {
    try {
        const {name} = req.query
        const allGamesQuery = await getAllGames()

        if(name) {
           const gameFound = allGamesQuery.filter(game => game.name.toLowerCase().includes(name.toLowerCase())).slice(0,15);
            return res.status(200).json(gameFound);
        } else {
            return res.status(200).json(allGamesQuery);
        }

    } catch (error) {
        return res.status(404).json({message: 'Game not found'})
    }
};

module.exports = getGameQuery;