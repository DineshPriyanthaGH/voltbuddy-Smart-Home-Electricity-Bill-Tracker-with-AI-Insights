const User = require('../models/User');

// Add a new appliance
exports.addAppliance = async (req, res) => {
  try {
    const userId = req.user._id; 
    const { name, type, usedHoursPerDay, powerRating, monthlyUsage } = req.body;

    if (!name || !type || usedHoursPerDay == null || powerRating == null || monthlyUsage == null) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.appliances.push({ name, type, usedHoursPerDay, powerRating, monthlyUsage });
    await user.save();

    res.status(201).json({ message: 'Appliance added successfully', appliances: user.appliances });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update an existing appliance
exports.updateAppliance = async (req, res) => {
  try {
    const userId = req.user._id;
    const applianceId = req.params.id;
    const { name, type, usedHoursPerDay, powerRating, monthlyUsage } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const appliance = user.appliances.id(applianceId);
    if (!appliance) return res.status(404).json({ message: 'Appliance not found' });

    appliance.name = name ?? appliance.name;
    appliance.type = type ?? appliance.type;
    appliance.usedHoursPerDay = usedHoursPerDay ?? appliance.usedHoursPerDay;
    appliance.powerRating = powerRating ?? appliance.powerRating;
    appliance.monthlyUsage = monthlyUsage ?? appliance.monthlyUsage;

    await user.save();
    res.json({ message: 'Appliance updated successfully', appliances: user.appliances });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete an appliance
exports.deleteAppliance = async (req, res) => {
  try {
    const userId = req.user._id; // Ensure this comes from the authentication middleware
    const applianceId = req.params.id; // The appliance ID from the request parameter

    // Log the user ID and appliance ID to confirm the request
    console.log(`User ID: ${userId}`);
    console.log(`Attempting to delete appliance with ID: ${applianceId}`);

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      console.error('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the appliance in the user's appliances array
    const appliance = user.appliances.id(applianceId);
    if (!appliance) {
      console.error('Appliance not found');
      return res.status(404).json({ message: 'Appliance not found' });
    }

    // Log the appliance before removal
    console.log('Found appliance to delete:', appliance);

    // Remove the appliance using the splice method on the appliances array
    user.appliances.pull(applianceId);  // This will remove the appliance from the array

    // Save the updated user object
    await user.save();

    // Log the success of the operation
    console.log('Appliance deleted successfully');

    // Send a successful response
    res.json({
      message: 'Appliance deleted successfully',
      appliances: user.appliances, // Return the updated appliances list
    });

  } catch (err) {
    // Log the error to the console
    console.error('Error deleting appliance:', err);

    // Return a server error response
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all appliances for user
exports.getAppliances = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select('appliances');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ appliances: user.appliances });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
