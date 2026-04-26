import Activity from '../models/Activity.js';
import DailyActivityStats from '../models/DailyActivityStats.js';

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

// @desc  Get all active activities with seat info for a specific date
// @route GET /api/activities
// @access Public
export const getActivities = async (req, res) => {
  try {
    const { date } = req.query; // Format: YYYY-MM-DD
    
    const activities = await Activity.find({ isActive: true });
    
    if (!date) {
      // If no date provided, return with 0 booked seats or default behavior
      return res.status(200).json({ success: true, data: activities });
    }

    // Enhance activities with date-specific booking data
    const enhancedActivities = await Promise.all(activities.map(async (activity) => {
      const stats = await DailyActivityStats.findOne({ 
        activityId: activity._id, 
        date: date 
      });
      
      const activityObj = activity.toObject();
      activityObj.bookedSeats = stats ? stats.bookedSeats : 0;
      // Recalculate virtual-like values
      activityObj.availableSeats = activityObj.totalSeats - activityObj.bookedSeats;
      activityObj.isFull = activityObj.bookedSeats >= activityObj.totalSeats;
      
      return activityObj;
    }));

    res.status(200).json({ success: true, data: enhancedActivities });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc  Get all activities (admin - includes inactive) for a specific date
// @route GET /api/activities/admin
// @access Private/Admin
export const getAllActivitiesAdmin = async (req, res) => {
  try {
    const { date } = req.query; // Format: YYYY-MM-DD
    const activities = await Activity.find();

    if (!date) {
      // If no date, return base activities (bookedSeats might be 0)
      return res.status(200).json({ success: true, data: activities });
    }

    // Enhance activities with date-specific booking data
    const enhancedActivities = await Promise.all(activities.map(async (activity) => {
      const stats = await DailyActivityStats.findOne({ 
        activityId: activity._id, 
        date: date 
      });
      
      const activityObj = activity.toObject();
      activityObj.bookedSeats = stats ? stats.bookedSeats : 0;
      activityObj.availableSeats = activityObj.totalSeats - activityObj.bookedSeats;
      activityObj.isFull = activityObj.bookedSeats >= activityObj.totalSeats;
      
      return activityObj;
    }));

    res.status(200).json({ success: true, data: enhancedActivities });
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
    // bookingDate: YYYY-MM-DD
    const { cartItems, bookingDate } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ success: false, error: 'No activities in cart' });
    }

    if (!bookingDate) {
      return res.status(400).json({ success: false, error: 'Booking date is required' });
    }

    // Validate all items first
    for (const item of cartItems) {
      const activity = await Activity.findById(item.activityId);
      if (!activity) {
        return res.status(404).json({ success: false, error: `Activity not found: ${item.activityId}` });
      }
      if (!activity.isActive) {
        return res.status(400).json({ success: false, error: `Activity "${activity.name}" is currently unavailable` });
      }

      // Check date-specific availability
      const stats = await DailyActivityStats.findOne({ 
        activityId: item.activityId, 
        date: bookingDate 
      });
      
      const currentBooked = stats ? stats.bookedSeats : 0;
      const available = activity.totalSeats - currentBooked;
      
      if (item.persons > available) {
        return res.status(400).json({
          success: false,
          error: `Only ${available} seat(s) left for "${activity.name}" on ${bookingDate}. Please reduce your count.`
        });
      }
    }

    // All valid — update daily stats
    for (const item of cartItems) {
      await DailyActivityStats.findOneAndUpdate(
        { activityId: item.activityId, date: bookingDate },
        { $inc: { bookedSeats: item.persons } },
        { upsert: true, new: true }
      );
    }

    res.status(200).json({ success: true, message: 'Seats reserved successfully. Proceed to payment.' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc  Reset seats for ALL activities at once (admin) for a specific date
// @route PUT /api/activities/reset-all
// @access Private/Admin
export const resetAllSeats = async (req, res) => {
  try {
    const { date } = req.query;
    if (date) {
      await DailyActivityStats.deleteMany({ date });
    } else {
      await Activity.updateMany({}, { bookedSeats: 0 });
    }
    res.status(200).json({ success: true, message: `All activity seats have been reset${date ? ` for ${date}` : ''}.` });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc  Reset seats for an activity (admin - after ride completes) for a specific date
// @route PUT /api/activities/:id/reset
// @access Private/Admin
export const resetActivitySeats = async (req, res) => {
  try {
    const { date } = req.query;
    if (date) {
      await DailyActivityStats.deleteOne({ activityId: req.params.id, date });
    } else {
      await Activity.findByIdAndUpdate(req.params.id, { bookedSeats: 0 });
    }
    
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      return res.status(404).json({ success: false, error: 'Activity not found' });
    }
    res.status(200).json({ success: true, data: activity, message: `Seats reset for "${activity.name}"${date ? ` on ${date}` : ''}` });
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
        name: 'Flyboarding',      
        emoji: '🏄', 
        price: 3500, 
        totalSeats: 50,
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
        description: 'Strap on a water-powered jet board and soar above the surface like a superhero — the ultimate water sports experience.'
      },
      { 
        name: 'Parasailing',      
        emoji: '🪂', 
        price: 2500, 
        totalSeats: 50,
        image: 'https://images.unsplash.com/photo-1520114878142-1e2900cbe511?auto=format&fit=crop&q=80&w=800',
        description: 'Glide high above the water harnessed to a colourful parachute, enjoying breathtaking aerial views towed by a speedboat.'
      },
      { 
        name: 'Jet Ski',           
        emoji: '🚤', 
        price: 1000, 
        totalSeats: 50,
        image: 'https://images.unsplash.com/photo-1544551763-71a747970908?auto=format&fit=crop&q=80&w=800',
        description: 'Hop on a personal watercraft and zip across the waves solo or with a partner for a fast and fun aquatic adventure.'
      },
      { 
        name: 'Speed Boat',   
        emoji: '⚡', 
        price: 1500, 
        totalSeats: 50,
        image: 'https://images.unsplash.com/photo-1517000515150-7171d99676c5?auto=format&fit=crop&q=80&w=800',
        description: 'Hold on tight as a powerful boat races across the water, giving you a thrilling, high-speed ride you won\'t forget.'
      },
      {
        name: 'Motor Boat',
        emoji: '🚀',
        price: 0,
        totalSeats: 50,
        image: 'https://images.unsplash.com/photo-1582297116812-70b97950c66b?auto=format&fit=crop&q=80&w=800',
        description: 'A relaxed, scenic cruise on a motorised boat — perfect for sightseeing and soaking in the views at a comfortable pace.',
        durations: [
          { label: '15 Min', price: 500  },
          { label: '30 Min', price: 1000 },
        ],
      },
      {
        name: 'Banana Ride',
        emoji: '🍌',
        price: 0,
        totalSeats: 50,
        image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=800',
        description: 'Straddle a giant inflatable banana with your crew and try to hold on as a speedboat pulls you through the waves!',
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
        description: 'Bounce, spin, and splash on an inflatable ring towed by a speedboat — a hilarious ride guaranteed to get everyone wet.'
      },
      { 
        name: 'Shikara Ride',           
        emoji: '🛶', 
        price: 250,  
        totalSeats: 50,
        image: 'https://images.unsplash.com/photo-1566833925222-29ad43e2e996?auto=format&fit=crop&q=80&w=800',
        description: 'Drift peacefully across calm waters on a traditional wooden boat — a serene and scenic experience ideal for all ages'
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
