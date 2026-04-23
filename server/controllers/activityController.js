import Activity from '../models/Activity.js';

// @desc  Create a new activity (admin)
// @route POST /api/activities/create
// @access Private/Admin
export const createActivity = async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json({ success: true, data: activity });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc  Delete an activity (admin)
// @route DELETE /api/activities/:id
// @access Private/Admin
export const deleteActivity = async (req, res) => {
  try {
    await Activity.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Activity deleted.' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc  Get all active activities with seat info
// @route GET /api/activities
// @access Public
export const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ isActive: true });
    res.status(200).json({ success: true, data: activities });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc  Get all activities (admin - includes inactive)
// @route GET /api/activities/admin
// @access Private/Admin
export const getAllActivitiesAdmin = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.status(200).json({ success: true, data: activities });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc  Book seats for activities (cart booking)
// @route POST /api/activities/book
// @access Public
export const bookActivities = async (req, res) => {
  try {
    // cartItems: [{ activityId, persons, durationLabel (optional) }]
    const { cartItems } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ success: false, error: 'No activities in cart' });
    }

    // Validate all items first (atomic check before deducting)
    for (const item of cartItems) {
      const activity = await Activity.findById(item.activityId);
      if (!activity) {
        return res.status(404).json({ success: false, error: `Activity not found: ${item.activityId}` });
      }
      if (!activity.isActive) {
        return res.status(400).json({ success: false, error: `Activity "${activity.name}" is currently unavailable` });
      }
      const available = activity.totalSeats - activity.bookedSeats;
      if (item.persons > available) {
        return res.status(400).json({
          success: false,
          error: `Only ${available} seat(s) left for "${activity.name}". Please reduce your count.`
        });
      }
    }

    // All valid — deduct seats
    for (const item of cartItems) {
      await Activity.findByIdAndUpdate(item.activityId, {
        $inc: { bookedSeats: item.persons }
      });
    }

    res.status(200).json({ success: true, message: 'Seats reserved successfully. Proceed to payment.' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc  Reset seats for ALL activities at once (admin)
// @route PUT /api/activities/reset-all
// @access Private/Admin
export const resetAllSeats = async (req, res) => {
  try {
    await Activity.updateMany({}, { bookedSeats: 0 });
    res.status(200).json({ success: true, message: 'All activity seats have been reset to 0.' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc  Reset seats for an activity (admin - after ride completes)
// @route PUT /api/activities/:id/reset
// @access Private/Admin
export const resetActivitySeats = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      { bookedSeats: 0 },
      { new: true }
    );
    if (!activity) {
      return res.status(404).json({ success: false, error: 'Activity not found' });
    }
    res.status(200).json({ success: true, data: activity, message: `Seats reset for "${activity.name}"` });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc  Update activity (toggle active, edit seats/price)
// @route PUT /api/activities/:id
// @access Private/Admin
export const updateActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!activity) {
      return res.status(404).json({ success: false, error: 'Activity not found' });
    }
    res.status(200).json({ success: true, data: activity });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc  Seed default activities (run once)
// @route POST /api/activities/seed
// @access Private/Admin
export const seedActivities = async (req, res) => {
  try {
    const existing = await Activity.countDocuments();
    if (existing > 0) {
      return res.status(400).json({ success: false, error: 'Activities already seeded. Delete them first.' });
    }

    const defaultActivities = [
      { 
        name: 'Fly Boarding',      
        emoji: '🏄', 
        price: 3500, 
        totalSeats: 50,
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
        description: 'Defy gravity and fly above the crystal clear waters of Tehri Lake.'
      },
      { 
        name: 'Jet Ski',           
        emoji: '🚤', 
        price: 1000, 
        totalSeats: 50,
        image: 'https://images.unsplash.com/photo-1544551763-71a747970908?auto=format&fit=crop&q=80&w=800',
        description: 'Feel the rush of speed as you zip across the turquoise waves.'
      },
      { 
        name: 'Para Sailing',      
        emoji: '🪂', 
        price: 2500, 
        totalSeats: 50,
        image: 'https://images.unsplash.com/photo-1520114878142-1e2900cbe511?auto=format&fit=crop&q=80&w=800',
        description: 'Soar high like a bird and enjoy a panoramic view of the majestic Himalayas.'
      },
      { 
        name: 'High Speed Boat',   
        emoji: '⚡', 
        price: 1500, 
        totalSeats: 50,
        image: 'https://images.unsplash.com/photo-1517000515150-7171d99676c5?auto=format&fit=crop&q=80&w=800',
        description: 'A thrilling high-speed adventure for the ultimate adrenaline junkies.'
      },
      {
        name: 'Banana Ride',
        emoji: '🍌',
        price: 0,
        totalSeats: 50,
        image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=800',
        description: 'The perfect group activity! Hold on tight as you bounce over the water.',
        durations: [
          { label: '30 Min', price: 500 },
          { label: '1 Hour', price: 800 },
        ],
      },
      { 
        name: 'Bumper Ride',       
        emoji: '💥', 
        price: 500,  
        totalSeats: 50,
        image: 'https://images.unsplash.com/photo-1616422285623-13ff0167295c?auto=format&fit=crop&q=80&w=800',
        description: 'Twist and turn in this fun-filled chaotic ride on the lake surface.'
      },
      {
        name: 'Speed Boat',
        emoji: '🚀',
        price: 0,
        totalSeats: 50,
        image: 'https://images.unsplash.com/photo-1582297116812-70b97950c66b?auto=format&fit=crop&q=80&w=800',
        description: 'Relax and take in the breeze on a comfortable yet fast lake tour.',
        durations: [
          { label: '15 Min', price: 500  },
          { label: '30 Min', price: 1000 },
        ],
      },
      { 
        name: 'Shikara',           
        emoji: '🛶', 
        price: 250,  
        totalSeats: 50,
        image: 'https://images.unsplash.com/photo-1566833925222-29ad43e2e996?auto=format&fit=crop&q=80&w=800',
        description: 'Experience the soul of Tehri Lake on a peaceful, traditional boat ride.'
      },
      { 
        name: 'Test Ride',           
        emoji: '🧪', 
        price: 1,  
        totalSeats: 100,
        image: 'https://images.unsplash.com/photo-1517000515150-7171d99676c5?auto=format&fit=crop&q=80&w=800',
        description: 'Testing activity for payment gateway verification.'
      },
    ];

    await Activity.insertMany(defaultActivities);
    res.status(201).json({ success: true, message: '8 activities seeded successfully!' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
