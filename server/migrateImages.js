import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Package from './models/Package.js';
import imagekit from './config/imagekit.js';

dotenv.config();

const uploadToImageKit = async (imageUrl) => {
  try {
    // 1. Fetch image from Cloudinary URL
    const response = await fetch(imageUrl);
    if (!response.ok) throw new Error(`Failed to fetch image from ${imageUrl}`);
    
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Extract a filename from the URL (or just generate one)
    const urlParts = imageUrl.split('/');
    let fileName = urlParts[urlParts.length - 1] || `image_${Date.now()}.jpg`;
    // Clean up query parameters if any
    fileName = fileName.split('?')[0];

    // 2. Upload to ImageKit
    return new Promise((resolve, reject) => {
      imagekit.upload({
        file: buffer,
        fileName: fileName,
        folder: 'sky-trip/packages'
      }, (error, result) => {
        if (error) reject(error);
        else resolve(result.url);
      });
    });
  } catch (err) {
    console.error('Error migrating image:', err.message);
    return null;
  }
};

const migrateData = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected!');

    const packages = await Package.find();
    console.log(`Found ${packages.length} packages to check...`);

    let updatedCount = 0;

    for (let pkg of packages) {
      let isUpdated = false;

      // Migrate Main Image
      if (pkg.image && pkg.image.includes('cloudinary.com')) {
        console.log(`Migrating main image for package: ${pkg.title}`);
        const newUrl = await uploadToImageKit(pkg.image);
        if (newUrl) {
          pkg.image = newUrl;
          isUpdated = true;
        }
      }

      // Migrate Gallery Images
      if (pkg.gallery && pkg.gallery.length > 0) {
        const newGallery = [];
        for (let i = 0; i < pkg.gallery.length; i++) {
          const gUrl = pkg.gallery[i];
          if (gUrl.includes('cloudinary.com')) {
            console.log(`Migrating gallery image ${i+1} for package: ${pkg.title}`);
            const newGUrl = await uploadToImageKit(gUrl);
            newGallery.push(newGUrl || gUrl); // Keep old if fails
            if (newGUrl) isUpdated = true;
          } else {
            newGallery.push(gUrl);
          }
        }
        pkg.gallery = newGallery;
      }

      // Save if changes were made
      if (isUpdated) {
        await pkg.save();
        updatedCount++;
        console.log(`Successfully migrated package: ${pkg.title}`);
      }
    }

    console.log(`\nMigration complete! Total packages updated: ${updatedCount}`);
    process.exit(0);

  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

migrateData();
