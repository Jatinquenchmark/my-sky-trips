import multer from 'multer';

// Store files in memory buffer instead of disk/cloudinary directly
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

export default upload;
