const authorModel = require("../models/authorModel")




//================validation for author=============================================================================================


const authorValidation = async function(req, res , next){
try{  let data = req.body
  let title = ["Mr", "Mrs", "Miss"]

    const comp = ["fname", "lname", "email","title","password"]
    if (!Object.keys(data).every(elem => comp.includes(elem)))
    return res.status(400).send({ status: false, msg: " DAMN !! NO EXTRA KEY FIELD" });
 
  //If no data in body
  if(Object.keys(data).length==0)
  return res.status(400).send({status:false, msg:'All fields are Required'})
  
  //for fnameaz
  if(!data.fname)
  return res.status(400).send({status:false, msg:'fname required'})
 
  //for lname
  if(!data.lname)
  return res.status(400).send({status:false, msg:'lname required'})
  
  // for title
  if(!data.title)
  return res.status(400).send({status:false, msg:'title required'})
  if(!title.includes(data.title))
  return res.status(400).send({status:false, msg:'Select one of this: [Mr, Mrs, Miss] '})
  
  //for email
  if(!data.email)
  return res.status(400).send({status:false, msg:'email required'})
  let emailId =req.body.email

  if (await authorModel.findOne({ email:emailId }))
  return res.status(400).send({  status: false, msg: "Email Id already exist" })
  
  //for password
  if(!data.password)
  return res.status(400).send({status:false, msg:'password required'})

      //email validation
    if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)))
    return res.status(400).send({status:false, msg:'Invalid Email Id'})

    //First name validation
    if (!(/^[a-zA-Z.]{3,}$/).test(data.fname))
    return res.status(400).send({status:false, msg:'Only alphabets in fname!!'})
    
    //Last name validation
    if (!(/^[a-zA-Z. ]{3,}$/).test(data.lname))
    return res.status(400).send({status:false, msg:'Only alphabets in lname !!'})

    //password validation
    if(!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).test(data.password))
return res.status(400).send({status:false, msg:'Atleat 1 capital, 1 small, numbers and Length should be 8 or more in password!'})
     
  
  next()
}
catch(err){
    return res.status(500).send({status:false, msg:err.message})
}
}

//==================blog create validation==================================================================================

const blogCreateValidataion = async function(req,res,next){
try{    
    let data = req.body
    let authorId = data.authorId;

    const comp = ["subcategory", "category", "tags", "authorId","title","body","isPublished"]
    if (!Object.keys(data).every(elem => comp.includes(elem)))
    return res.status(400).send({ status: false, msg: " OH MAN !! wrong field !" });

    //authorId invalid format--------------------

    if (!authorId)
    return res.status(400).send({ status: false, msg: "Required Author Id !" });

    if (!data.authorId.match(/^[0-9a-fA-F]{24}$/))
      return res.status(400).send({ status: false, msg: "invalid authorId given" });

    let author_id = await authorModel.findById(authorId);
    
    if (!author_id)
    return res.status(400).send({ status: false, msg: "Invalid Author Id !" });

    //validation for title
    if(!data.title)
    return res.status(400).send({status:false, msg:'title required'})

    //validation for body
    if(!data.body)
    return res.status(400).send({status:false, msg:'body required'})

    //validation for tags
    if(!/^[a-zA-Z ,]+$/.test(data.tags))
    return res.status(400).send({status:false, msg:'Invalid tags format !! ONLY ALPHABETS ALLOWED'})

    //validation for category
    if(!data.category) 
    return res.status(400).send({status:false, msg:'category required'})
    if(!/^[a-zA-Z ]+$/.test(data.category))
    return res.status(400).send({status:false, msg:'Invalid Category format ! ONLY ALPHABETS ALLOWED'})

    //validation for subcategory
    
    if(!/^[a-zA-Z ,]+$/.test(data.subcategory))
    return res.status(400).send({status:false, msg:'Invalid subcategory format! ONLY ALPHABETS ALLOWED'})

    // validation for title and body
   if (!/^[a-zA-Z0-9 :-]+$/.test(data.title) || (!/^[a-zA-Z0-9.,'"!? :-]+$/.test(data.body))) {
    return res.status(400).send({ status: false, msg: 'Special character not allowed ! Except : -' })
  }
  

    next()
    }
    catch(err){
        return res.status(500).send({status:false, msg:err.message})
    }
}

//=================update blog validation==========================================================================================

const blogUpdateValidation = function(req, res, next){
 try{
  let data = req.body

  const comp = ["subcategory", "category", "tags", "authorId","title","body","isPublished"]
  if (!Object.keys(data).every(elem => comp.includes(elem)))
  return res.status(400).send({ status: false, msg: " OH MAN !! wrong field !" });

  if(Object.keys(data).length == 0)
  return res.status(400).send({status:false, msg:'Empty field not allowed'})

  if(data.title == '' || !/^[a-zA-Z0-9 :-]+$/.test(data.title))
  return res.status(400).send({status:false, msg:'Invalid title format !! ONLY ALPHA-NUMERIC ALLOWED'})

  if(data.body == '' || !/^[a-zA-Z0-9.!"'? :-]+$/.test(data.body))
  return res.status(400).send({status:false, msg:'Invalid body format !! ONLY ALPHA-NUMERIC, (. ! " ? : -) ALLOWED'})
  // 
  if(data.tags == '' || !/^[a-zA-Z ,]+$/.test(data.tags))
  return res.status(400).send({status:false, msg:'Invalid tags format !! ONLY ALPHABETS ALLOWED'})
  //|| !/^[a-zA-Z ,]+$/.test(data.subcategory)
  if(data.category == '' || !/^[a-zA-Z ]+$/.test(data.category))
  return res.status(400).send({status:false, msg:'Invalid Category format !! ONLY ALPHABETS ALLOWED'})

  if(data.subcategory == '' || !/^[a-zA-Z ,]+$/.test(data.subcategory))
  return res.status(400).send({status:false, msg:'Invalid subcategory format !! ONLY ALPHABETS ALLOWED'})

  next()
}
catch(err){
    return res.status(500).send({status:false, msg:err.message})
}
}

module.exports.authorValidation=authorValidation
module.exports.blogCreateValidataion=blogCreateValidataion
module.exports.blogUpdateValidation=blogUpdateValidation