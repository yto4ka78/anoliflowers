const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinaryConfig");

const storageBouquet = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ReactNode/Bouquet",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const storageCategory = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ReactNode/Category",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

function extractPublicId(url) {
  const regex = /upload\/v\d+\/(.+)\.\w+$/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

module.exports = { storageBouquet, extractPublicId, storageCategory };
