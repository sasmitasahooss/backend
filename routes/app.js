const express = require('express');
const router = express.Router();
const Employee = require('../models/userModel');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    try {
         const {name, email, password} = req.body;
         const hashedPassword = await bcrypt.hash(password, 10);
         const employee = await Employee.create({name, email, password: hashedPassword});
         res.status(200).json({message: "User registered successfully", employee});
         console.log(employee);
    } catch (error) {
        console.error("Error in registration:", error);
        res.status(500).json({ message: "Email already exists", error: error.message });
        console.log(error)
    }
});

module.exports = router;