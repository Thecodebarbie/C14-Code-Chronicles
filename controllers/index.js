const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const profileRoutes = require('./profileRoutes'); // Import profileRoutes
const dashboardRoutes = require('./dashboardRoutes')

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/profile', profileRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;