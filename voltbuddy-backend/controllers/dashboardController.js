exports.getUserDashboard = async (req, res) => {
  try {
    const user = req.user;

    // Get the latest bill (assumes bills ordered by date descending)
    const latestBill = user.billHistory.length
      ? user.billHistory[user.billHistory.length - 1]
      : null;

    // If no bills, optionally create one for current month here or return empty
    // (You can implement a cron job for monthly bill creation)

    res.json({
      currentBill: latestBill,
      insights: user.insights,
      reminders: user.reminders,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.payBill = async (req, res) => {
  try {
    const user = req.user;
    const { billId } = req.body;

    const bill = user.billHistory.id(billId);
    if (!bill) return res.status(404).json({ message: 'Bill not found' });

    if (bill.status === 'Paid') {
      return res.status(400).json({ message: 'Bill already paid' });
    }

    bill.status = 'Paid';
    await user.save();

    res.json({ message: 'Bill marked as paid' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
