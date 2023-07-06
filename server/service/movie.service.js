const movie = require("../model/movie.model") ;
const filter = require("../helper/filter")
const createmovie = async (obj) => {
    try {
      let data = new movie(obj);
      await data.save();
      return data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const findAll = async (query) => {
    try {
      var page = parseInt(query.page);
      var limit = parseInt(query.limit);
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const result = {};
      var searchFiled = query.search || false;
      const total = await movie.countDocuments().exec();
   
      result.total = total;
      if (endIndex < total) {
        result.next = {
          page: page + 1,
          limit: limit,
        };
      }
      if (startIndex > 0) {
        result.previous = {
          page: page - 1,
          limit: limit,
        };
      }
      var aggregateQuery = [];
      aggregateQuery.push(filter.sortHelper(query.columnName, query.orderBy));
      if (limit) {
        aggregateQuery.push(filter.faceHelper(startIndex, limit));
      } else {
        aggregateQuery.push(filter.faceHelper(startIndex, limit));
      }
      if (searchFiled) {
        // console.log("searchFiled",searchFiled)
        aggregateQuery.push(
          filter.searchHelper(searchFiled, ["title", "createdAt", "_id"])
        );
      }
      var allList = await movie.aggregate(aggregateQuery).collation({
        locale: "en",
      });
      result.content = allList[0].list;
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const GetById = async (id) => {
    try {
      const data = await movie.findById({ _id: id });
      return data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  module.exports={
    createmovie,
    findAll,
    GetById,
  }