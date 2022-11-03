const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const swaggerRoute = require('./swagger.route');
const config = require('../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/account',
    route: userRoute,
  },
];

const devRoutes = [
  {
    path: '/swagger',
    route: swaggerRoute
  }
]

defaultRoutes.forEach(route => {
  router.use(route.path, route.route);
});

if (config.env === 'development') {
  devRoutes.forEach(route => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
