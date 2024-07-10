const fs = require("fs");
const path = require("path");

async function deleteOldImages(imagePaths) {
  for (const filePath of imagePaths) {
    try {
      await fs.promises.unlink(path.join(__basedir, `uploads/${filePath}`));
    } catch (err) {
      console.error(`Failed to delete image at ${filePath}:`, err);
    }
  }
}

async function deleteImages(doc) {
  const imagePaths = doc.images.map((image) => image.url);
  for (const filePath of imagePaths) {
    try {
      await fs.promises.unlink(path.join(__basedir, `uploads/${filePath}`));
    } catch (err) {
      console.error(`Failed to delete image at ${filePath}:`, err);
    }
  }
}

async function uploadImages(type, req) {
  if (req.files && req.files[type]) {
    const filenames = req.files[type].map((file) => ({ url: file.filename }));
    req.body[type] = filenames;
  } else {
    console.log(`No files uploaded for type: ${type}`);
  }
}

async function updateAndSet(doc, type, req) {
  // Collect old image paths
  const oldImagePaths = doc[type] ? doc[type].map((image) => image.url) : [];

  // Upload new images and set them to req.body
  await uploadImages(type, req);
console.log("ffffffffffffffffffffffffffffffffff",req.body);
  // Update the document with new images
  doc[type] = req.body[type];

  // Collect new image paths
  const newImagePaths = req.body[type]
    ? req.body[type].map((image) => image.url)
    : [];

  // Determine which old images are no longer used and delete them
  const imagesToDelete = oldImagePaths.filter(
    (path) => !newImagePaths.includes(path)
  );
  await deleteOldImages(imagesToDelete);
}

module.exports = {
  deleteOldImages,
  deleteImages,
  uploadImages,
  updateAndSet,
};
