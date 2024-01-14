const routes = require('express').Router();
const path = require('../controllers/lesson1');

routes.get('/', path.efitaRoute);
routes.get('/lafulji', path.lafuljiRoute);
routes.get('/muli', path.muliiRoute);

module.exports = routes;