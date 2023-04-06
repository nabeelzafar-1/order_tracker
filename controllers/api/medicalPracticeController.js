const MedicalPractice = require("../../models/medicalPractice");
const mongoose = require("mongoose");


/**
 * GET /
 * About
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






/**
 * GET /
 * New MedicalPractice Form
 */
exports.addMedicalPractice = async (req, res) => {
  const locals = {
    title: "Add New MedicalPractice - NodeJs",
    description: "Order Tracker Management System",
  };

  res.render("MedicalPractice/add", locals);
};

/**
 * POST /
 * Create New MedicalPractice
 */
exports.postMedicalPractice = async (req, res) => {
  console.log(req.body);

  const newMedicalPractice = new MedicalPractice({
    practiceName: req.body.practiceName,
    mailingAddress:req.body.mailingAddress,
    mailingCity:req.body.mailingCity,
    mailingeState:req.body.mailingeState,
    mailingZip:req.body.mailingZip,
    shippingAddress:req.body.shippingAddress,
    shippingCity:req.body.shippingCity,
    shippingState:req.body.shippingState,
    shippingZip: req.body.shippingZip,
    phone: req.body.phone,
    fax: req.body.fax,
    website: req.body.website,
    status: req.body.status,
  });

  try {
    await MedicalPractice.create(newMedicalPractice);
    await req.flash("info", "New MedicalPractice has been added.");

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};


/**
 * GET /
 * MedicalPractice Data 
*/
exports.view = async (req, res) => {

  try {
    const medicalPractice = await MedicalPractice.findOne({ _id: req.params.id })

    const locals = {
      title: "View MedicalPractice Data",
      description: "Order Tracker Management System",
    };

    res.render('MedicalPractice/view', {
      locals,
      medicalPractice
    })

  } catch (error) {
    console.log(error);
  }

}



/**
 * GET /
 * Edit MedicalPractice Data 
*/
exports.edit = async (req, res) => {

  try {
    const medicalPractice = await MedicalPractice.findOne({ _id: req.params.id })

    const locals = {
      title: "Edit MedicalPractice Data",
      description: "Order Tracker Management System",
    };

    res.render(`/edit/${req.params.id}`, {
      locals,
      medicalPractice
    })

  } catch (error) {
    console.log(error);
  }

}




/**
 * GET /
 * Update MedicalPractice Data 
*/
exports.editPost = async (req, res) => {
  try {
    await MedicalPractice.findByIdAndUpdate(req.params.id,{
      practiceName: req.body.practiceName,
    mailingAddress:req.body.mailingAddress,
    mailingCity:req.body.mailingCity,
    mailingState:req.body.mailingState,
    mailingZip:req.body.mailingZip,
    shippingAddress:req.body.shippingAddress,
    shippingCity:req.body.shippingCity,
    shippingState:req.body.shippingState,
    shippingZip: req.body.shippingZip,
    phone: req.body.phone,
    fax: req.body.fax,
    website: req.body.website,
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
 * Delete MedicalPractice Data 
*/
exports.deleteMedicalPractice = async (req, res) => {
  try {
    await MedicalPractice.deleteOne({ _id: req.params.id });
    res.redirect("/medicalpractic/add")
  } catch (error) {
    console.log(error);
  }
}


/**
 * Get /
 * Search Practice Data 
*/

exports.searchPractice = async (req, res) => {

  const locals = {
    title: "Search  Data",
    description: "Order Tracker Management System",
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const s = await MedicalPractice.find({
      $or: [
        { practiceName: { $regex: new RegExp(searchNoSpecialChar, "i") }},
        { mailingAddress: { $regex: new RegExp(searchNoSpecialChar, "i") }},
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