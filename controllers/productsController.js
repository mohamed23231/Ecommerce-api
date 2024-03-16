const Product = require("./../module/ProductModule");
const APIFeatures=require('./../utilities/apiFeatures')
/// Get All Products///
exports.getAllProduct = async (req, res) => {
  try {
    //Improve Filter options with req.query
    // const queryObj = { ...req.query };
    // const exclutiveWords = ["sort", "page", "limit", "fields"];
    // exclutiveWords.forEach((el) => delete queryObj[el]);

    // // Advanced Filter options with gte|gt|lte|lt

    // let strQueryObj = JSON.stringify(queryObj);
    // strQueryObj = strQueryObj.replace(/\b(gte|gt|lte|lt)\b/g, (el) => `$${el}`);
    // strQueryObj = JSON.parse(strQueryObj);
    // let queryProd = Product.find(strQueryObj);

    // // Sorting Filter
    // if (req.query.sort) {
    //   const sortBy = req.query.sort.split(",").join(" ");
    //   queryProd = queryProd.sort(sortBy);
    // }

    // // Limited Fields Filter
    // if (req.query.fields) {
    //   console.log("hello");
    //   const limitedFields = req.query.fields.split(",").join(" ");
    //   console.log(limitedFields);
    //   queryProd = queryProd.select(limitedFields);
    // }

    // // Pagination Option
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100;
    // const skipField = (page - 1) * limit;
    // queryProd = queryProd.skip(skipField).limit(limit);
    ////// Need to make Validation with CountDocument
    const features = new APIFeatures(Product.find(), req.query);
    const queryProd = features.filter().sort().fields().pagination(); 
    const products = await queryProd.mongooseSide;
    res.status(200).json({
      status: "success",
      data: {
        status: "Sucess",
        products,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "couldn't get products",
      error,
    });
  }
};

/// get one Product
exports.getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    console.log(req.params)
    res.status(200).json({
      status: "success",
      data: {
        status: "Sucess",
        product,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "couldn't find product",
      error,
    });
  }
};

// Post Method
exports.postProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        status: "Sucess",
        newProduct,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "invalid data sent nothing added",
      error,
    });
  }
};

// patch method
exports.editeProduct = async (req, res) => {
  try {
    const patchedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        status: "Sucess",
        product: patchedProduct,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "invalid data sent nothing edited",
      error,
    });
  }
};

/// DeleteProduct
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.productId);
    res.status(200).json({
      status: "success",
      data: {
        message: "Product deleted successfully",
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Failed to delete product",
      error: error.message,
    });
  }
};

/// Alias first  Products///

// exports.aliasingFirstTemProducts = async (req, res) => {

//   try {
//     const products = await Product.find();
//     res.status(200).json({
//       status: "success",
//       data: {
//         status: "Sucess",
//         products,
//       },
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: "fail",
//       message: "couldn't find products",
//       error,
//     });
//   }
// };
exports.aliasTopProduct = (req,res,next)=>{
  console.log(req.params)

  req.query.limit=5;
  req.query.sort='price,description'
  req.query.fields='name,description,price'
  next()

}

exports.productStats = async (req, res) => {
  try {
    const stats = await Product.aggregate([
      { $match: { price: { $gte: 1000 } } },
      {
        $group: {
          _id: null,
          numOfProduct: { $sum: 1 },
          avgPrice: { $avg: '$price' },
          maxPrice: { $max: '$price' },
          minPrice: { $min: '$price' },
        }
      }
    ]);

    res.status(200).json({
      status: "success",
      data: {
        status: "Success",
        stats
      },
    });

  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "couldn't find products",
      error,
    });
  }
};
