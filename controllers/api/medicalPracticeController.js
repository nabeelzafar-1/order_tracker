const MedicalPractice = require("../../models/medicalPractice");
const mongoose = require("mongoose");

/**
 * GET /
 * Homepage
 */
// exports.homepage = async (req, res) => {

//     const messages = await req.consumeFlash('info');
//     const locals = {
//       title: 'NodeJs',
//       description: 'Free NodeJs User Management System'
//     }

//     let perPage = 12;
//     let page = req.query.page || 1;

//     try {
//       const medicalPractices = await MedicalPractice.aggregate([ { $sort: { createdAt: -1 } } ])
//         .skip(perPage * page - perPage)
//         .limit(perPage)
//         .exec(); 
//       const count = await MedicalPractice.count();

//       res.render('', {
//         locals,
//         medicalPractices,
//         current: page,
//         pages: Math.ceil(count / perPage),
//         messages
//       });

//     } catch (error) {
//       console.log(error);
//     }
// }
// exports.homepage = async (req, res) => {
//     const messages = await req.consumeFlash('info');
//     const locals = {
//       title: 'NodeJs',
//       description: 'Free NodeJs User Management System'
//     }

//     try {
//       const MedicalPractices = await MedicalPractice.find({}).limit(22);
//       res.render('index', { locals, messages, MedicalPractices } );
//     } catch (error) {
//       console.log(error);
//     }
// }

/**
 * GET /
 * About
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






/**
 * GET /
 * New MedicalPractice Form
 */
exports.addMedicalPractice = async (req, res) => {
  const locals = {
    title: "Add New MedicalPractice - NodeJs",
    description: "Free NodeJs User Management System",
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
      description: "Free NodeJs User Management System",
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
      description: "Free NodeJs User Management System",
    };

    res.render('MedicalPractice/edit', {
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
    res.redirect("/")
  } catch (error) {
    console.log(error);
  }
}


