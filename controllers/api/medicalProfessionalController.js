const MedicalProfessional = require("../../models/medicalProfessional");
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


exports.addMedicalprofessional = async (req, res) => {
  const locals = {
    title: "Add New",
    description: "Order Tracker Management System",
  };

  res.render("/medicalprofessional", locals);
};

/**
 * GET /
 * New MedicalProfessional Form
 */
exports.addMedicalProfessional = async (req, res) => {
  const locals = {
    title: "Add New",
    description: "Order Tracker Management System",
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
      MedicalPractice:req.body.medicalpractice,
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
    res.redirect(`/secure/home`);
  } catch (error) {
    console.log(error);
  }
};


/**
 * GET /
 * View Data 
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
 * Edit  Data 
*/
exports.edit = async (req, res) => {

  try {
    const professional = await MedicalProfessional.findOne({ _id: req.params.id })

    const locals = {
      title: "Edit Data",
      description: "Order Tracker Management System",
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
 * Update  Data 
*/
exports.editPost = async (req, res) => {
  try {
    await MedicalProfessional.findByIdAndUpdate(req.params.id,{
      name: req.body.name,
      lastName:req.body.lastName,
      medProType: req.body.medProType,
      phone:req.body.medicalphone,
      fax:req.body.medicalfax,
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
 * Delete  Data 
*/
exports.deleteProfessional = async (req, res) => {
  try {
    await MedicalProfessional.deleteOne({ _id: req.params.id });
    res.redirect("/")
  } catch (error) {
    console.log(error);
  }
}

/**
 * Get /
 * Search Professional Data 
*/

exports.searchProfessional = async (req, res) => {

  const locals = {
    title: "Search Professional Data",
    description: "Order Tracker Management System",
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const professionals = await MedicalProfessional.find({
      $or: [
        { name: { $regex: new RegExp(searchNoSpecialChar, "i") }},
        { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") }},
        { email: { $regex: new RegExp(searchNoSpecialChar, "i") }},
        { phone: { $regex: new RegExp(searchNoSpecialChar, "i") }},
      ]
    });

    res.render("search", {
      professionals,
      locals
    })
    
  } catch (error) {
    console.log(error);
  }

}