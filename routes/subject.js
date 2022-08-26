const express = require("express");
const router = express.Router();
const maktabController = require("../controller/subject");
router.route("/").get(maktabController.getAll).post(maktabController.add);

router
  .route("/:id")
  .get(maktabController.getOne)
  .patch(maktabController.updateOne)
  .delete(maktabController.deleteOne);

module.exports = router;
