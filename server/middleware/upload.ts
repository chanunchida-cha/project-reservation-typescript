import { Request } from "express";
import multer, { FileFilterCallback } from "multer";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ) => {
    callback(null, "./uploads/");
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: FileNameCallback
  ) => {
    callback(null, Date.now() + file.originalname);
  },
});

const filerFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) => {
  callback(null, true);
};

let upload = multer({
  storage: storage,
  fileFilter: filerFilter,
});

module.exports = upload.single("image");
