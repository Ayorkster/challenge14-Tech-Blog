const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoute = require('./postRoutes');

router.use('/users', userRoutes);
router.use('/posts', postRoute);

module.exports = router;
