import imagekit from '../config/imagekit.js';

const uploadToImageKit = (fileBuffer, fileName) => {
  return new Promise((resolve, reject) => {
    imagekit.upload(
      {
        file: fileBuffer,
        fileName: fileName,
        folder: 'sky-trip/packages',
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

export const imagekitUpload = async (req, res, next) => {
  if (!req.files) {
    return next();
  }

  try {
    const uploadPromises = [];

    // Process all fields containing files
    for (const field in req.files) {
      const filesArray = req.files[field];
      for (let i = 0; i < filesArray.length; i++) {
        const file = filesArray[i];
        const promise = uploadToImageKit(file.buffer, file.originalname).then((result) => {
          // Set the path property to the ImageKit URL so controllers work unmodified
          file.path = result.url;
        });
        uploadPromises.push(promise);
      }
    }

    await Promise.all(uploadPromises);
    next();
  } catch (error) {
    console.error('ImageKit upload error:', error);
    res.status(500).json({ success: false, error: 'Failed to upload images' });
  }
};
