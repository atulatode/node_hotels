const express   = require('express');
const router    = express.Router();
const Person    = require('./../models/person');
const validator = require('./../helpers/validate');

// Create User
router.post('/savePerson', async (req, res) => {
  try{
    const validationRule = {
      "name"    : "required|string",
      "age"     : "required|numeric",
      "work"    : "required|string",
      "mobile"  : "required|string",
      "email"   : "required|string|email",
      "address" : "required|string",
      "salary"  : "required|string"
    };
    await validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
          res.status(412)
              .send({
                  success: false,
                  message: 'Validation failed',
                  data: err
              });
      }else {
        next();
      }
    }).catch( err => console.log(err))
    const data = req.body;
    const  newPerson  = new Person(data); //we can pass entire data
    const response = await newPerson.save();
    console.log('data saved');
    res.status(200).json({success:true,message:'user created successfully',data:response});
  }catch(err){
    console.log(err);
    res.status(500).json({success:false,message:'internal server error',data:err});
  }
})

// Find all User
router.get('/getPerson', async (req, res) => {
  try{
    const data = await Person.find();
    console.log('data found');
    res.status(200).json({success:true,message:'data found successfully',data:data});
  }catch(err){
    console.log(err);
    res.status(500).json({success:false,message:'internal server error',data:err});
  }
})

// Find a single User with an id
router.get('/findPersonById', async (req, res) => {
  try{
    const data = await Person.findById(req.body.id);
    res.status(200).json({success:true,message:'data found successfully',data:data});
  }catch(err){
    console.log(err);
    res.status(500).json({success:false,message:'internal server error',data:err});
  }
});

// Update a user by the id in the request
router.post('/updatePerson', async (req, res) => {
  if(!req.body) {
    res.status(400).send({
        message: "Data to update can not be empty!"
    });
  }
  const id = req.body.id;
  await Person.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
    if (!data) {
        res.status(404).send({
          message: `User not found.`
        });
    }else{
      res.status(200).json({ success:true,message: "User updated successfully." })
    }
  }).catch(err => {
    res.status(500).send({
        message: err.message
    });
  });
});

router.get('/findPersonById/:id', async (req,res) => {
  try{
    const personId = req.params.id;
    const response = await Person.findById(personId);
    if(!response){
      return res.status(400).json({success:false,message:'Person not found'});
    }
    console.log('person found successfully');
    res.status(200).json({success:true,message:'Person found successfully',data:response});
  }catch(err){
    console.log('something went wrong');
    res.status(500).json({success:false,message:'Internal server error'});
  }
});

router.put('/UpdatePersonbyId/:id',async (req, res) =>{
  try{
    const personId = req.params.id;
    const updaredPersondata = req.body;
    const response = await Person.findByIdAndUpdate(personId,updaredPersondata,{
      new:true, //Return the updated data
      runValidation:true, //mongo db validation
    })
    if(!response){
      return res.status(400).json({success:false,message:'Person not found'});
    }
    console.log('data updated successfully')
    res.status(200).json({success:true,message:'data updated successfully',data:response});
  }catch(err){
    console.log(err);
    res.status(500).json({success:false,message:'Internal server error'});
  }
});

router.delete('/deletePersonById/:id', async (req ,res) => {
  try{
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if(!response){
      return res.status(400).json({success:false,message:'Person not found'});
    }
    console.log('data deleted successfully');
    res.status(200).json({success:true,message:'Person deleted successfully'});
  }catch(err){
    console.log(err);
    res.status(500).json({success:false,message:'something went wrong!'});
  }
})

// Delete a user with the specified id in the request
router.post('/destroyPerson', async (req ,res) => {
  await Person.findByIdAndDelete(req.body.id).then(data => {
    if(!data){
      res.status(404).send({success:false,message:'user not found'})
    }else{
      res.status(200).send({success:true,message:'User deleted successfully'})
    }
  }).catch(err => {
    res.status(500).send({
      success:false,
      message:err.message
    });
  })
})

module.exports = router;