const express = require('express');
const { getArrangements, createArrangement } = require('../controllers/arrangements');

const router = express.Router();
let arrangements = []; //memory database

// GET all arrangements
router.get('/',(req,res) => {
    res.json(arrangements);
    }
)

// POST a new arrangement
router.post('/', (req,res) =>{
    const{title, data,description} = req.body;
    if(!title || !data){
        return res.statur(400).json({message: "Title and data are required."})
    }
    const newArrangement = { id: arrangements.length + 1, title, date, description };
    arrangements.push(newArrangement);

    res.status(201).json(newArrangement); // Return the created arrangement
});

export default router;
