import Package from '../models/Package.js';

// @desc    Get all packages
// @route   GET /api/packages
// @access  Public
export const getPackages = async (req, res, next) => {
  try {
    const packages = await Package.find();
    res.status(200).json({ success: true, count: packages.length, data: packages });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get single package
// @route   GET /api/packages/:id
// @access  Public
export const getPackage = async (req, res, next) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) {
      return res.status(404).json({ success: false, error: 'Package not found' });
    }
    res.status(200).json({ success: true, data: pkg });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const createPackage = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.createdBy = req.user.id;

    // If file uploaded, add it to body
    if (req.files) {
      if (req.files.image && req.files.image[0]) {
        req.body.image = req.files.image[0].path;
      }
      if (req.files.galleryFiles) {
        // Collect URLs from newly uploaded gallery files
        const galleryUrls = req.files.galleryFiles.map(file => file.path);
        
        // If there are existing gallery URLs (from JSON field), merge them
        let existingGallery = [];
        if (req.body.gallery) {
           try {
             existingGallery = typeof req.body.gallery === 'string' ? JSON.parse(req.body.gallery) : req.body.gallery;
           } catch (e) { existingGallery = []; }
        }
        req.body.gallery = [...existingGallery, ...galleryUrls];
      }
    }

    // Parse JSON stringified fields if they exist
    ['itinerary', 'inclusions', 'exclusions', 'gallery', 'pricingStructure', 'pricingTiers'].forEach(field => {
      if (typeof req.body[field] === 'string') {
        try {
          req.body[field] = JSON.parse(req.body[field]);
        } catch (e) {
          // Keep as string if parsing fails
        }
      }
    });

    const pkg = await Package.create(req.body);
    res.status(201).json({ success: true, data: pkg });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Update package
// @route   PUT /api/packages/:id
// @access  Private/Admin
export const updatePackage = async (req, res, next) => {
  try {
    let pkg = await Package.findById(req.params.id);

    if (!pkg) {
      return res.status(404).json({ success: false, error: 'Package not found' });
    }

    // If files uploaded, update image/gallery
    if (req.files) {
      if (req.files.image && req.files.image[0]) {
        req.body.image = req.files.image[0].path;
      }
      if (req.files.galleryFiles) {
        const galleryUrls = req.files.galleryFiles.map(file => file.path);
        
        // Merge with existing OR replace (for simplicity in update, we often just add or replace)
        // Let's assume the frontend sends the "kept" gallery images as a JSON string in req.body.gallery
        let keptGallery = [];
        if (req.body.gallery) {
           try {
             keptGallery = typeof req.body.gallery === 'string' ? JSON.parse(req.body.gallery) : req.body.gallery;
           } catch (e) { keptGallery = []; }
        }
        req.body.gallery = [...keptGallery, ...galleryUrls];
      }
    }

    // Parse JSON stringified fields if they exist
    ['itinerary', 'inclusions', 'exclusions', 'gallery', 'pricingStructure', 'pricingTiers'].forEach(field => {
      if (typeof req.body[field] === 'string') {
        try {
          req.body[field] = JSON.parse(req.body[field]);
        } catch (e) {
          // Keep as string if parsing fails
        }
      }
    });

    pkg = await Package.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: pkg });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Delete package
// @route   DELETE /api/packages/:id
// @access  Private/Admin
export const deletePackage = async (req, res, next) => {
  try {
    const pkg = await Package.findById(req.params.id);

    if (!pkg) {
      return res.status(404).json({ success: false, error: 'Package not found' });
    }

    await pkg.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get dashboard stats
// @route   GET /api/dashboard/stats
// @access  Private/Admin
export const getDashboardStats = async (req, res, next) => {
  try {
    const packages = await Package.find();
    
    const totalPackages = packages.length;
    const totalDestinations = new Set(packages.map(p => p.locations)).size;
    const avgRating = totalPackages > 0 
      ? (packages.reduce((acc, p) => acc + p.rating, 0) / totalPackages).toFixed(1)
      : 0;

    res.status(200).json({
      success: true,
      data: {
        totalPackages,
        totalDestinations,
        avgRating,
      }
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
