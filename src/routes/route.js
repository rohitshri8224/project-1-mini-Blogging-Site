const express = require('express');
const router = express.Router()
const authorController = require("../controllers/authorController")
const blogController = require("../controllers/blogController")
const mid = require("../middeleware/auth")
const validation = require('../validation/validation')




//create author API===========================================================================================================
router.post("/authors",  validation.authorValidation, authorController.createAuthor)

//login API===================================================================================================================
router.post("/login", authorController.login)

//create blog API===============================================================================================================
router.post("/blogs", mid.verifyAuthor, validation.blogCreateValidataion, blogController.createBlog)

//update blog Api=========================================================================================================
router.put("/blogs/:blogId", mid.verifyAuthor, mid.authorization, validation.blogUpdateValidation, blogController.updateBlog)


// get all the blogs with condition API=================================================================================================
router.get("/blogs", mid.verifyAuthor, blogController.getBlogs)


//delete blog using query params API=================================================================================================
router.delete("/blogs", mid.verifyAuthor, mid.authDeleteByQuery, blogController.deleteBlogs)

//delete blog using path params API=================================================================================================
router.delete("/blogs/:blogId", mid.verifyAuthor, mid.authorization, blogController.removeBlog)



//for demo purposes=================================================================================================
router.get("/demo",authorController.demoAuthorAll)

router.get("/demoblog",authorController.demoBlogAll)

module.exports = router
  