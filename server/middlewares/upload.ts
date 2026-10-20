import multer from "multer";

// use memory storage to avoid saving files on disk
const storage = multer.memoryStorage();

const updload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
})
export default updload;