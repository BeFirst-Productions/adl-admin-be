import { blog } from "../../models/blogModel.js";


export const createBlog = async (req, res) => {
  try {
    const {
      title,
      excerpt,
      description,
      metaTitle,
      metaKeywords,
      metaDescription,
      status
    } = req.body;

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: "Title and description are required fields.",
      });
    }

    // Cloudinary image URL (if uploaded)
    const image = req.file ? req.file.path : null;

    const newBlog = await blog.create({
      title,
      excerpt,
      description,
      image,
      metaTitle,
      metaKeywords,
      metaDescription,
      status,
    });

    return res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Blog created successfully.",
      data: newBlog,
    });

  } catch (error) {
    console.error("Create Blog Error:", error);

    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "An unexpected server error occurred while creating the blog.",
      error: error.message,
    });
  }
};


export const getBlogs = async (req, res) => {
  try {
    const blogs = await blog.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Blogs retrieved successfully.",
      count: blogs.length,
      data: blogs,
    });

  } catch (error) {
    console.error("Error fetching blogs:", error);

    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "An unexpected server error occurred while fetching blogs.",
      error: error.message,
    });
  }
};


export const getBlog = async (req, res) => {
  try {
    const blogs = await blog.findById(req.params.id);
    if (!blogs) return res.status(404).json({ success: false, error: "Not Found" });

    res.json({ success: true, data: blogs });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const updates = req.body;

    // Fetch existing blog
    const existingBlog = await blog.findById(req.params.id);
    if (!existingBlog) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Blog not found."
      });
    }

    // If image is replaced, delete old Cloudinary image
    if (req.file) {
      if (existingBlog.image) {
        try {
          const oldUrl = existingBlog.image;

          // Extract public_id safely
          const publicId = oldUrl
            .split("/")
            .slice(-2)
            .join("/")
            .replace(/\.[^/.]+$/, ""); // remove extension

          await cloudinary.uploader.destroy(publicId);
        } catch (err) {
          console.warn("Cloudinary delete failed:", err.message);
        }
      }

      // Save new Cloudinary URL
      updates.image = req.file.path;
    }

    const updatedBlog = await blog.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Blog updated successfully.",
      data: updatedBlog
    });

  } catch (err) {
    console.error("Update Error:", err);

    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "An unexpected server error occurred while updating the blog.",
      error: err.message
    });
  }
};


export const deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await blog.findByIdAndDelete(req.params.id);

    if (!deletedBlog) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Blog not found."
      });
    }

    // Delete image from Cloudinary
    if (deletedBlog.image) {
      try {
        const oldUrl = deletedBlog.image;

        const publicId = oldUrl
          .split("/")
          .slice(-2)
          .join("/")
          .replace(/\.[^/.]+$/, "");

        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.warn("Cloudinary delete failed:", err.message);
      }
    }

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Blog deleted successfully."
    });

  } catch (err) {
    console.error("Delete Error:", err);

    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "An unexpected server error occurred while deleting the blog.",
      error: err.message
    });
  }
};
