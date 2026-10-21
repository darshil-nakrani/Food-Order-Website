import foodModel from "../models/foodModel.js";
import cloudinary from "../config/cloudinary.js";

// Helper to wrap stream upload in a Promise
const streamUpload = (req) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream(
      { folder: "food-website" },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    stream.end(req.file.buffer);
  });
};

// 🔥 Add food item
const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({ success: false, message: "No file uploaded" });
    }

    // Upload image to Cloudinary properly wrapped in a Promise
    const cloudResult = await streamUpload(req);

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: cloudResult.secure_url, // ✅ Save Cloudinary URL
    });

    await food.save();

    res.json({ success: true, message: "Food Added" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error adding food" });
  }
};

// 🔥 List food
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// 🔥 Update food
const updateFood = async (req, res) => {
  try {
    const { id, name, price } = req.body;

    const updatedFood = await foodModel.findByIdAndUpdate(
      id,
      { name, price },
      { new: true }
    );

    if (updatedFood) {
      res.json({
        success: true,
        message: "Food Updated Successfully",
        data: updatedFood,
      });
    } else {
      res.status(404).json({ success: false, message: "Food Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error updating food" });
  }
};

// 🔥 Remove food
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    if (!food) {
      return res.json({ success: false, message: "Food not found" });
    }

    // Extract public_id from Cloudinary URL
    const imageUrl = food.image;
    const publicId = imageUrl
      .split("/")
      .slice(-1)[0]
      .split(".")[0];

    // Fire-and-forget Cloudinary deletion so we don't block the UI!
    cloudinary.uploader.destroy(`food-website/${publicId}`).catch(err => console.log("Cloudinary destroy error:", err));

    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error removing food" });
  }
};

export { addFood, listFood, removeFood, updateFood };


// import foodModel from "../models/foodModel.js";
// import cloudinary from "../config/cloudinary.js";

// // 🔥 Add food item
// const addFood = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.json({ success: false, message: "No file uploaded" });
//     }

//     // Upload image to Cloudinary
//     const result = await cloudinary.uploader.upload_stream(
//       { folder: "food-website" },
//       async (error, cloudResult) => {
//         if (error) {
//           return res.status(500).json({ success: false, message: error.message });
//         }

//         const food = new foodModel({
//           name: req.body.name,
//           description: req.body.description,
//           price: req.body.price,
//           category: req.body.category,
//           image: cloudResult.secure_url, // ✅ Save Cloudinary URL
//         });

//         await food.save();

//         res.json({ success: true, message: "Food Added" });
//       }
//     );

//     result.end(req.file.buffer);

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Error adding food" });
//   }
// };

// // 🔥 List food
// const listFood = async (req, res) => {
//   try {
//     const foods = await foodModel.find({});
//     res.json({ success: true, data: foods });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

// // 🔥 Update food
// const updateFood = async (req, res) => {
//   try {
//     const { id, name, price } = req.body;

//     const updatedFood = await foodModel.findByIdAndUpdate(
//       id,
//       { name, price },
//       { new: true }
//     );

//     if (updatedFood) {
//       res.json({
//         success: true,
//         message: "Food Updated Successfully",
//         data: updatedFood,
//       });
//     } else {
//       res.status(404).json({ success: false, message: "Food Not Found" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Error updating food" });
//   }
// };

// // 🔥 Remove food
// const removeFood = async (req, res) => {
//   try {
//     const food = await foodModel.findById(req.body.id);

//     if (!food) {
//       return res.json({ success: false, message: "Food not found" });
//     }

//     // Extract public_id from Cloudinary URL
//     const imageUrl = food.image;
//     const publicId = imageUrl
//       .split("/")
//       .slice(-1)[0]
//       .split(".")[0];

//     await cloudinary.uploader.destroy(`food-website/${publicId}`);

//     await foodModel.findByIdAndDelete(req.body.id);

//     res.json({ success: true, message: "Food Removed" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error removing food" });
//   }
// };

// export { addFood, listFood, removeFood, updateFood };




// import foodModel from "../models/foodModel.js";
// import fs from "fs";

// // add food item
// const addFood = async (req, res) => {
//   if (!req.file) {
//     return res.json({ success: false, message: "No file uploaded" });
//   }

//   const image_filename = `${req.file.filename}`;
  
//   const food = new foodModel({
//     name: req.body.name,
//     description: req.body.description,
//     price: req.body.price,
//     category: req.body.category,
//     image: image_filename,
//   });

//   try {
//     await food.save();
//     res.json({ success: true, message: "Food Added" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

// // All Food List
// const listFood = async (req, res) => {
//   try {
//     const foods = await foodModel.find({});
//     res.json({ success: true, data: foods });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

// // update food item
// const updateFood = async (req, res) => {
//   try {
//     const { id, name, price } = req.body;

//     const updatedFood = await foodModel.findByIdAndUpdate(
//       id,
//       { name, price },
//       { new: true }
//     );

//     if (updatedFood) {
//       res.json({ success: true, message: "Food Updated Successfully", data: updatedFood });
//     } else {
//       res.status(404).json({ success: false, message: "Food Not Found" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Error updating food" });
//   }
// };

// // remove food item
// const removeFood = async (req, res) => {
//   try {
//     const food = await foodModel.findById(req.body.id);
//     fs.unlink(`uploads/${food.image}`, () => {});

//     await foodModel.findByIdAndDelete(req.body.id);
//     res.json({ success: true, message: "Food Removed" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

// export { addFood, listFood, removeFood, updateFood };


