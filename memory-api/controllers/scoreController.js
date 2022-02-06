const Score = require("../models/score");

const scoreController = {
    getAll: async (req, res) => {
        try {
            const scores = await Score.findAll({
                order: ['time']
            });
            res.json(scores);
        } catch(error) {
            res.status(500).json(error.toString());
        }
    },
    create: async (req, res) => {
        try {
            const { name, time } = req.body;
            if (!name) {
                res.status(400).json("name cannot be empty");
                return;
            };
            if (!time) {
                res.status(400).json("no time supplied");
                return;
            };
            let newScore = await Score.create({ name, time });
            res.json(newScore);
        } catch(error) {
            res.status(500).json(error.toString());
        }
    }
}

module.exports = scoreController;
