const User = require('../models/User');

// Add a new appliance
exports.addAppliance = async (req, res) => {
  try {
    const userId = req.user._id; // assume req.user is set by auth middleware
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
    const userId = req.user._id;
    const applianceId = req.params.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.appliances.id(applianceId).remove();
    await user.save();

    res.json({ message: 'Appliance deleted successfully', appliances: user.appliances });
  } catch (err) {
    console.error(err);
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
