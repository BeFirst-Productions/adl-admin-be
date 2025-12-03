import { gallery } from "../../models/galleryModel.js";

export const addGalleryImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    const newImage = new gallery({
      image: req.file.filename, 
    });

    const saved = await newImage.save();

    res.json({
      success: true,
      message: "Image added successfully",
      data: saved,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


export const getGalleryImages = async (req, res) => {
  try {
    const images = await gallery.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: images,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await gallery.findById(id);

    if (!image) {
      return res.status(404).json({ success: false, message: "Image not found" });
    }

    res.json({ success: true, data: image });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await gallery.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Image not found" });
    }

    res.json({
      success: true,
      message: "Image deleted successfully",
      deleted,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
