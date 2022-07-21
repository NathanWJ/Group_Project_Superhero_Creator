const HeroController = require('../controllers/hero.controllers');

//Order of routes matters:
// - General paths go before specific (i.e. ones that require an id are second)
// - Specific path routes ("/products") go before a single document path ("products/:id")
module.exports = app => {
    app.get('/api/heroes', HeroController.findAllHeroes); //GET request for Dashboard route
    app.get('/api/heroes/:id', HeroController.findOneHero); //GET request for View route
    app.post('/api/heroes', HeroController.createNewHero); //POST request for Create route
    app.put('/api/heroes/:id', HeroController.updateHero); //PUT request for Update route
    app.delete('/api/heroes/:id', HeroController.deleteHero); //DELETE request for Delete route
}