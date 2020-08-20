const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

router.use('/api', userRoutes);
router.use('/api', thoughtRoutes);

module.exports = router;