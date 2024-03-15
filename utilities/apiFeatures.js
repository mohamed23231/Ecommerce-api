class APIFeatures{
    constructor(mongooseSide,expressSide){
        this.mongooseSide = mongooseSide;
        this.expressSide = expressSide;
    }
    filter(){
            //Improve Filter options with req.query
    const queryObj = { ...this.expressSide };
    const exclutiveWords = ["sort", "page", "limit", "fields"];
    exclutiveWords.forEach((el) => delete queryObj[el]);

    // Advanced Filter options with gte|gt|lte|lt

    let strQueryObj = JSON.stringify(queryObj);
    strQueryObj = strQueryObj.replace(/\b(gte|gt|lte|lt)\b/g, (el) => `$${el}`);
    strQueryObj = JSON.parse(strQueryObj);
    this.mongooseSide=this.mongooseSide.find(strQueryObj);
        return this
    }

    /// Sorting
    sort(){
        if (this.expressSide.sort) {
            const sortBy = this.expressSide.sort.split(",").join(" ");
            this.mongooseSide = this.mongooseSide.sort(sortBy);
          }
          return this

    }

    //Filter
    fields(){
        if (this.expressSide.fields) {
            const limitedFields = this.expressSide.fields.split(",").join(" ");
            this.mongooseSide = this.mongooseSide.select(limitedFields);
          }
          return this
    }

    //pagination
    pagination(){
        const page = this.expressSide.page * 1 || 1;
        const limit = this.expressSide.limit * 1 || 100;
        const skipField = (page - 1) * limit;
        this.mongooseSide = this.mongooseSide.skip(skipField).limit(limit);
        return this    
    }
}
module.exports =APIFeatures