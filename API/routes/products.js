const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAuthorization,
  verifyTokenAdmin,
} = require("./verifyToken");
const cloudinary = require("../utils/cloudinary");
const { isAdmin } = require("../middleware/auth");

const router = require("express").Router();

//CREATE

console.log("is admin: ", isAdmin);

router.post("/", isAdmin, async (req, res) => {
  const {
    name,
    categories,
    subCategories,
    gender,
    desc,
    price,
    image,
    color,
    size,
    inStock,
  } = req.body;

  try {
    if (image) {
      console.log(image);
      const uploadedResponse = await cloudinary.uploader.upload(image, {
        upload_preset: "acuarela",
      });

      if (uploadedResponse) {
        const product = new Product({
          name,
          categories,
          subCategories,
          gender,
          desc,
          price,
          image: uploadedResponse,
          size,
          color: color,
          inStock,
        });

        const savedProduct = await product.save();
        console.log("Saved Product: ", savedProduct);
        res.status(200).send(savedProduct);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//UPDATE
router.put("/:id", verifyTokenAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      products = await Product.find({
        cat: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
