

const express = require('express');
const router = express.Router();
const Project = require('../models/Project'); 
const { body, validationResult } = require('express-validator');
const moment = require('moment');

// Data validation middleware
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Get all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Create a new project
router.post(
    '/', 
    [
        // validate request body fields
        body('name').isString().notEmpty(),
        body('dateOfBirth').custom((value) => {
            if (!moment(value, 'DD-MM-YYYY').isValid()) {
                throw new Error('Invalid date format for dateOfBirth. Please provide the date in DD-MM-YYYY format.');
            }
            return true;
        }),
        body('favoriteColor').isString().notEmpty(),
        body('email').isEmail(),
        body('gender').isString().notEmpty(),
        body('student').isString().notEmpty(),
        body('working').isString().notEmpty(),
        body('hobbies').isString().notEmpty(),
        validate, // middleware for data validation
    ],
    async (req, res) => {
        const project = new Project({
            name: req.body.name,
            dateOfBirth: moment(req.body.dateOfBirth, 'DD-MM-YYYY').toDate(),
            favoriteColor: req.body.favoriteColor,
            email: req.body.email,
            gender: req.body.gender,
            student: req.body.student,
            working: req.body.working,
            hobbies: req.body.hobbies
        });

        try {
            const newProject = await project.save();
            res.status(201).json(newProject);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
);

// Get a specific project by ID
router.get('/:projectId', async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a project by ID
router.patch(
    '/:projectId',
    // [
    //     // Validate request body fields
    //     body('name').isString().notEmpty(),
    //     body('dateOfBirth').isDate(),
    //     body('favoriteColor').isString().notEmpty(),
    //     body('email').isEmail(),
    //     body('gender').isString().notEmpty(),
    //     body('student').isString().notEmpty(),
    //     body('working').isString().notEmpty(),
    //     body('hobbies').isString().notEmpty(),
    //     validate, // Middleware for data validation
    // ], 
    async (req, res) => {
        try {
            const updatedProject = await Project.findByIdAndUpdate(req.params.projectId, req.body, { new: true });
            if (!updatedProject) {
                return res.status(404).json({ message: 'Project not found' });
            }
            res.json(updatedProject);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
);

// Delete a project by ID
router.delete('/:projectId', async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.projectId);
        if (!deletedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json({ message: 'Project deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
