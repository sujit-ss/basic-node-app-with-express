const express = require("express");
const router = express.Router();
const accountsController = require("../../controller/accountsController");

router
  .route("/")
  .get(accountsController.getAllAccounts)
  .post(accountsController.openAccount)
  .put(accountsController.updateAccount)
  .delete(accountsController.closeAccount);

router.route("/:accountNo").get(accountsController.getOnAccountByAccountNo);

module.exports = router;
