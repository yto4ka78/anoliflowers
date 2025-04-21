const { uploader } = require("cloudinary").v2;
const { extractPublicId } = require("../middleware/cloudinary"); // если у тебя уже есть эта функция

/**
 * Проверяет итоговое количество фото и удаляет загруженные, если лимит превышен
 * @param {Array} uploadedFiles - req.files
 * @param {Number} currentCount - текущее количество фото в букетe
 * @param {Number} imagesToDeleteCount - количество фото, помеченных на удаление
 * @param {Number} limit - максимум разрешённых фото
 * @param {Response} res - express res
 * @returns {Boolean} - true если лимит превышен и уже обработан, false если всё ок
 */
async function autoCleanupUploadIfLimitExceeded({
  uploadedFiles,
  currentCount = 0,
  imagesToDeleteCount = 0,
  limit = 5,
  res,
}) {
  const newCount = uploadedFiles?.length || 0;
  const finalCount = currentCount - imagesToDeleteCount + newCount;

  if (finalCount > limit) {
    // Удаляем только что загруженные фото
    const deleteUploaded = uploadedFiles.map(async (file) => {
      const publicId = extractPublicId(file.path);
      if (publicId) {
        await uploader.destroy(publicId);
      }
    });
    await Promise.all(deleteUploaded);

    res.status(400).json({
      message: `Общее количество фотографий не должно превышать ${limit}`,
    });
    return true;
  }

  return false;
}

module.exports = { autoCleanupUploadIfLimitExceeded };
