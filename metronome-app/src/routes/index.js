const express = require('express');
const router = express.Router();

// Define the route for the home page
router.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

// Export the router
module.exports = router;