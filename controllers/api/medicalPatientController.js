const MedicalPatient  = require("../../models/medicalPatient");
const mongoose = require("mongoose");

/**
 * GET /
 * Homepage
 */

exports.about = async (req, res) => {
    const locals = {
      title: 'About',
      description: 'Order Tracker Management System'
    }

    try {
      res.render('about', locals );
    } catch (error) {
      console.log(error);
    }
}


exports.addMedicalPatient = async (req, res) => {
  const locals = {
    title: "Add New  - NodeJs",
    description: "Order Tracker Management System",
  };

  res.render("/medicalPatient", locals);
};

/**
 * GET /
 * New MedicalPatient Form
 */
exports.addMedicalPatient = async (req, res) => {
  const locals = {
    title: "Add New  - NodeJs",
    description: "Order Tracker Management System",
  };

  res.render("medicalPatient/add", locals);
};

/**
 * POST /
 * Create New MedicalPatient
 */
exports.postMedicalPatient = async (req, res) => {
  console.log(req.body);

  const newMedicalPatient = new MedicalPatient({
      patientype: req.body.patientype,
      referredBy:req.body.name,
      rxApproval: req.body.rxApproval,
      MedicalProfessional:req.body.medicalprofessional,
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      dateOfBirth:req.body.dateOfBirth,
      nummd: req.body.nummd,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      email: req.body.email,
      phone: req.body.phone,
      status: req.body.status,
      coordinatorFirstName: req.body.coordinatorFirstName,
      coordinatorLastName: req.body.coordinatorLastName,
      coordinatorPhone: req.body.coordinatorPhone,
      coordinatorEmail: req.body.coordinatorEmail,
      updatedAt: Date.now()
    });
    
  try {
    await MedicalPatient.create(newMedicalPatient);
    await req.flash("info", "New medical Patient has been added.");

    res.redirect("/secure/home");
  } catch (error) {
    console.log(error);
  }
};


/**
 * GET /
 *  Data 
*/
exports.view = async (req, res) => {

  try {
    const patient = await MedicalPatient.findOne({ _id: req.params.id })

    res.render('medicalPatient/view', {
      locals,
      patient
    })

  } catch (error) {
    console.log(error);
  }

}



/**
 * GET /
 * Edit  Data 
*/
exports.edit = async (req, res) => {

  try {
    const patient = await MedicalPatient.findOne({ _id: req.params.id })

    const locals = {
      title: "Edit  Data",
      description: "Order Tracker Management System",
    };

    res.render('medicalPatient/edit', {
      locals,
      patient
    })

  } catch (error) {
    console.log(error);
  }

}




/**
 * GET /
 * Update  Data 
*/
exports.editPost = async (req, res) => {
  try {
    await MedicalPatient.findByIdAndUpdate(req.params.id,{
      patientype: req.body.patientype,
      rxApproval: req.body.rxApproval,
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      dateOfBirth:req.body.dateOfBirth,
      nummd: req.body.nummd,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      email: req.body.email,
      phone: req.body.phone,
      status: req.body.status,
      coordinatorFirstName: req.body.coordinatorFirstName,
      coordinatorLastName: req.body.coordinatorLastName,
      coordinatorPhone: req.body.coordinatorPhone,
      coordinatorEmail: req.body.coordinatorEmail,
      updatedAt: Date.now()
    });
    res.redirect(`/medicalpatient/edit/${req.params.id}`);
    
    console.log('redirected');
  } catch (error) {
    console.log(error);
  }
}


/**
 * Delete /
 * Delete  Data 
*/
exports.deletePatient = async (req, res) => {
  try {
    await MedicalPatient.deleteOne({ _id: req.params.id });
    res.redirect("/")
  } catch (error) {
    console.log(error);
  }
}

/**
 * Get /
 * Search Patient Data 
*/

exports.searchPatients = async (req, res) => {

  const locals = {
    title: "Search  Data",
    description: "Order Tracker Management System",
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const s = await MedicalPatient.find({
      $or: [
        { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") }},
        { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") }},
      ]
    });

    res.render("search", {
      s,
      locals
    })
    
  } catch (error) {
    console.log(error);
  }

}
