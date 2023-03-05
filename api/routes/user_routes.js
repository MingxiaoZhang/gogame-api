'use strict';
const controller = require("../controllers/web_controller");
const requireAuth = require('../../middleware/auth');

module.exports = (app) => {
    app.post('/signup', controller.add_user);
    app.post('/login', controller.login_user);
    app.get('/profile', requireAuth, controller.get_profile);
};
