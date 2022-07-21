const Hero = require ('../models/hero.model');
//TIP: If you're stuck, comment out routes and test one at a time. 
//"req" is shorthand for request
//"res" is shorthand for response

module.exports.createNewHero = (req, res) => {
    Hero.create(req.body)
        .then(createNewResult => {
            console.log(createNewResult);
            res.json(createNewResult);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ err });
        });
};

module.exports.findAllHeroes = (req, res) => {
    Hero.find()
        .then((findAllResult) => {
            console.log(findAllResult);
            res.json(findAllResult);
            //The {} in res.json({findAllResult}) cause the object to be nested, increasing dot notation in the client files
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ err });
        });
};

module.exports.findOneHero = (req, res) => {
    Hero.findOne({ _id: req.params.id })
        .then(findOneResult => {
            console.log(findOneResult);
            res.json(findOneResult);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ err });
        });
};

module.exports.updateHero = (req, res) => {
    //"new: true" ensures the document contains all the new info request
    Hero.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true, 
        runValidators: true 
    })
    .then(updatedResult => {
        console.log(updatedResult);
        res.json(updatedResult);
    })
    .catch((err) => {
        console.log(err);
        res.status(400).json({ err });
    });
};

module.exports.deleteHero = (req, res) => {
    Hero.deleteOne({ _id: req.params.id })
        .then(deleteResult => {
            console.log(deleteResult);
            res.json(deleteResult);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ err });
        });
};