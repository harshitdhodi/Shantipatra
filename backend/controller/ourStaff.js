const OurStaff = require('../model/ourStaff')

const insertStaff = async (req, res) => {
  try {
    const { S_id, name, alt,imgTitle, status, jobTitle, details, facebook, twitter, linkedin } = req.body;
    const photo = req.files['photo'] ? req.files['photo'].map(file => file.filename) : [];

    const ourstaff = new OurStaff({
      S_id, photo, alt, imgTitle, name, status, jobTitle, details, facebook, twitter, linkedin
    });
    await ourstaff.save();
    res.send(ourstaff);
  } catch (error) {

    res.status(400).send(error)
  }
}

const getStaff = async (req, res) => {
  try {
    const { page } = req.query;
    const limit = 5;

    let ourstaff;
    let count;

    if (page) {
      count = await OurStaff.countDocuments();
      ourstaff = await OurStaff.find()
        .skip((page - 1) * limit)
        .limit(limit);
    } else {
      ourstaff = await OurStaff.find();
      count = ourstaff.length;
    }

    res.status(200).json({
      data: ourstaff,
      total: count,
      currentPage: page || 1,
      hasNextPage: page ? count > page * limit : false,
    });
  } catch (error) {
    console.error(error);
    let errorMessage = 'Error fetching staff data';
    if (error.name === 'CastError') {
      errorMessage = 'Invalid query parameter format';
    }
    res.status(500).json({ message: errorMessage });
  }
};

const getActiveStaff = async (req, res) => {
  try {
    const activeStaff = await OurStaff.find({ status: 'active' });
    const count = activeStaff.length;

    res.status(200).json({
      data: activeStaff,
      total: count,
    });
  } catch (error) {
    console.error(error);
    let errorMessage = 'Error fetching active staff data';
    if (error.name === 'CastError') {
      errorMessage = 'Invalid query parameter format';
    }
    res.status(500).json({ message: errorMessage });
  }
};



const updateStaff = async (req, res) => {
  const { id } = req.query;
  const updateFields = req.body;

  try {
    // Fetch the existing staff member to get their current photos
    const existingStaff = await OurStaff.findById(id);

    if (!existingStaff) {
      return res.status(404).json({ message: 'Staff member not found' });
    }

    // Process new uploaded photos
    if (req.files && req.files['photo'] && req.files['photo'].length > 0) {
      const newPhotoPaths = req.files['photo'].map(file => file.filename); // Using filename to get the stored file names
      updateFields.photo = [...existingStaff.photo, ...newPhotoPaths];
    } else {
      updateFields.photo = existingStaff.photo; // Keep existing photos if no new photos are uploaded
    }

    const updatedStaff = await OurStaff.findByIdAndUpdate(
      id,
      updateFields,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedStaff);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = updateStaff;


const deleteStaff = async (req, res) => {
  try {
    const { id } = req.query;

    const staff = await OurStaff.findByIdAndDelete(id);

    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    res.status(200).json({ message: "Staff deleted successfully" });
  } catch (error) {
    console.error("Error deleting staff:", error);
    res.status(500).json({ message: "Server error" });
  }
}

const getStaffById = async (req, res) => {
  try {
    const { id } = req.query;

    const staff = await OurStaff.findById(id)

    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }
    res.status(200).json({ data: staff });
  } catch (error) {

    res.status(500).json({ message: "Server error" });
  }
}

const countStaff = async (req, res) => {
  try {
    const count = await OurStaff.countDocuments();
    res.status(200).json({ total: count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error counting services' });
  }
};

const deletePhotoAndAltText = async (req, res) => {

  const { id, imageFilename, index } = req.params;

  try {

    const ourStaff = await OurStaff.findById(id);

    if (!ourStaff) {
      return res.status(404).json({ message: 'ourStaff not found' });
    }


    ourStaff.photo = ourStaff.photo.filter(photo => photo !== imageFilename);
    ourStaff.alt.splice(index, 1);
    ourStaff.imgTitle.splice(index, 1)

    await ourStaff.save();

    const filePath = path.join(__dirname, '..', 'images', imageFilename);

    // Check if the file exists and delete it
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.json({ message: 'Photo and alt text deleted successfully' });
  } catch (error) {
    console.error('Error deleting photo and alt text:', error);
    res.status(500).json({ message: error.message });
  }
};




module.exports = { insertStaff, getStaff, getActiveStaff, updateStaff, deleteStaff, getStaffById, countStaff, deletePhotoAndAltText };