const express = require("express");
const eligibilityCheckerController = require("../controllers/user/eligibility-checker");
const router = express.Router();

const authMW = require("../jwt/isAuth");
const isAuth = require("../jwt/isAuth");
router.post(
  "/checkEligibility",
  isAuth,
  eligibilityCheckerController.checkEligibility
);
module.exports = router;
