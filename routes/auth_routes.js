const express = require('express');
const Controller = require('../controller/auth_controller');
const router = express.Router();


router.post("/api/login",Controller.loginController);
router.get("/api/register", Controller.registerPage);
router.get("/api/loginn", Controller.loginPage);
router.post("/api/registration",Controller.registrationController);
router.get("/api/logout",Controller.logoutController);
router.get("/api/setting",Controller.settingController);
router.get("/api/verification",Controller.emailverification);
router.get("/api/whoami",Controller.whoamiController);
router.patch("/api/update",Controller.updateProfileController);

module.exports =router;