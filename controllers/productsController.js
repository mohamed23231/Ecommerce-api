const Product = require("./../module/ProductModule");

/// Get All Products///
exports.getAllProduct = async (req, res) => {
  // console.log(req.query);
  try {
    //Improve Filter options with req.query
    const queryObj = { ...req.query };
    const exclutiveWords = ["sort", "page", "limit", "fields"];
    exclutiveWords.forEach((el) => delete queryObj[el]);
    // console.log(queryObj);

    // Advanced Filter options with gte|gt|lte|lt

    let strQueryObj = JSON.stringify(queryObj);
    strQueryObj = strQueryObj.replace(/\b(gte|gt|lte|lt)\b/g, (el) => `$${el}`);
    strQueryObj = JSON.parse(strQueryObj);
    console.log(strQueryObj);

    // Sorting Filter
    console.log(req.query.sort);
    let queryProd = Product.find(strQueryObj);
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queryProd = queryProd.sort(sortBy);
    }

    // Limited Fields Filter
    if (req.query.fields) {
      console.log("hello");
      const limitedFields = req.query.fields.split(",").join(" ");
      console.log(limitedFields);
      queryProd = queryProd.select(limitedFields);
    }

    // Pagination Option
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skipField = (page - 1) * limit;
    queryProd = queryProd.skip(skipField).limit(limit);
    ////// Need to make Validation with CountDocument
    /////
    const products = await queryProd;
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
    const product = await Product.findById(req.params.id);
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
      req.params.id,
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
    await Product.findByIdAndDelete(req.params.id);
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
