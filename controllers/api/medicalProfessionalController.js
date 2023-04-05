const MedicalProfessional = require("../../models/medicalProfessional");
const Customer  = require("../../models/medicalPractice");
const mongoose = require("mongoose");

/**
 * GET /
 * Homepage
 */

exports.about = async (req, res) => {
    const locals = {
      title: 'About',
      description: 'Free NodeJs User Management System'
    }

    try {
      res.render('about', locals );
    } catch (error) {
      console.log(error);
    }
}


exports.addMedicalprofessional = async (req, res) => {
  const locals = {
    title: "Add New Customer - NodeJs",
    description: "Free NodeJs User Management System",
  };

  res.render("/medicalprofessional", locals);
};

/**
 * GET /
 * New MedicalProfessional Form
 */
exports.addMedicalProfessional = async (req, res) => {
  const locals = {
    title: "Add New Customer - NodeJs",
    description: "Free NodeJs User Management System",
  };

  res.render("medicalprofessional/add", locals);
};

/**
 * POST /
 * Create New MedicalProfessional
 */
exports.postMedicalProfessional = async (req, res) => {
  console.log(req.body);

  const newMedicalProfessional = new MedicalProfessional({
      name: req.body.name,
      lastName:req.body.lastName,
      medProType: req.body.medProType,
      MedicalPractice:req.body.medicalpractic,
      phone:req.body.medicalphone,
      fax:req.body.medicalfax,
      email: req.body.email,
      lastRef: req.body.lastRef,
      status: req.body.status,
      updatedAt: Date.now()
    });
    
  try {
    await MedicalProfessional.create(newMedicalProfessional);
    await req.flash("info", "New medical professional has been added.");

    res.redirect("/medicalprofessional/add/:id");
  } catch (error) {
    console.log(error);
  }
};


/**
 * GET /
 * Customer Data 
*/
exports.view = async (req, res) => {

  try {
    const professional = await MedicalProfessional.findOne({ _id: req.params.id })

    res.render('medicalprofessional/view', {
      locals,
      professional
    })

  } catch (error) {
    console.log(error);
  }

}



/**
 * GET /
 * Edit Customer Data 
*/
exports.edit = async (req, res) => {

  try {
    const professional = await MedicalProfessional.findOne({ _id: req.params.id })

    const locals = {
      title: "Edit Customer Data",
      description: "Free NodeJs User Management System",
    };

    res.render('medicalprofessional/edit', {
      locals,
      professional
    })

  } catch (error) {
    console.log(error);
  }

}




/**
 * GET /
 * Update Customer Data 
*/
exports.editPost = async (req, res) => {
  try {
    await MedicalProfessional.findByIdAndUpdate(req.params.id,{
      name: req.body.name,
      lastName:req.body.lastName,
      medProType: req.body.medProType,
      email: req.body.email,
      lastRef: req.body.lastRef,
      status: req.body.status,
      updatedAt: Date.now()
    });
    await res.redirect(`/edit/${req.params.id}`);
    
    console.log('redirected');
  } catch (error) {
    console.log(error);
  }
}


/**
 * Delete /
 * Delete Customer Data 
*/
exports.deleteProfessional = async (req, res) => {
  try {
    await MedicalProfessional.deleteOne({ _id: req.params.id });
    res.redirect("/")
  } catch (error) {
    console.log(error);
  }
}
