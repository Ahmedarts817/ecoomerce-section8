const multer = require("multer");
const ApiError = require("../utils/apiError");

const multerOptions = () => {
  const multerFilter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError("only images allowed", 400), false);
    }
  };
  const multerStorage = multer.memoryStorage();
  // diskStorage({
  //   destination: function (req, file, cb) {
  //     cb(null, "uploads/");
  //   },
  //   filename: function (req, file, cb) {
  //     const uniqueSuffix = Date.now() + "-";
  //     cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  //   },
  // });

  const upload = multer({
    // dest: "uploads",
    storage: multerStorage,
    fileFilter: multerFilter,
  });
  return upload;
};

exports.uploadSingleImage = (fieldName) => multerOptions().single(fieldName);
exports.uploadMixOfImages = (arrayOfFields) =>
  multerOptions().fields(arrayOfFields);
