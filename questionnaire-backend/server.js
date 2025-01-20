const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

const sequelize = new Sequelize('questionnaire', 'user', 'Testquiz1@', {
    host: 'localhost',
    dialect: 'mysql'
});

const Response = sequelize.define('Response', {
    interviewerName: {
        type: DataTypes.STRING,
        allowNull: true, // replace with false or required: true
    },
    dataSheetNumber: {
        type: DataTypes.STRING,
        allowNull: true // replace with false or required: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    data: {
        type: DataTypes.JSON,
        allowNull: true // replace with false or required: true
    },
    // Add more fields as needed
});

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database & tables updated!');
    })
    .catch(error => {
        console.error('Error updating database:', error);
    });

app.post('/responses', async (req, res) => {
    try {
        const response = await Response.create(req.body);
        res.status(201).send({ message: 'Réponse enregistrée avec succès' });
    } catch (error) {
        res.status(500).send({ message: 'Erreur lors de l\'enregistrement de la réponse', error });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});