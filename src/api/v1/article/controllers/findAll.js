const articleService = require("../../../../lib/article");


// -------------helper function-------------------


const queryContractor = (query) => {


  const queryString = new URLSearchParams(query).toString();
  
  // Combine base, path, and query (if query exists)
  return queryString ? queryString : '';
};


// -------------Controller-----------------------
const findAll = async (req, res, next) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const sortType = req.query.sort_type || "dsc";
  const sortBy = req.query.sort_by || "updatedAt";
  const searchQuery = req.query.search || "";

  try {

    // result
    const articles = await articleService.findAll({
      page,
      limit,
      sortType,
      sortBy,
      searchQuery,
    });

    const totalItems = await articleService.countDocuments({searchQuery});


    // response

    //data
    const data = articles.map(article => {
      return {...article,
        link: `/article/${article._id}` 
      }
    })

    //pagination
    const totalPage = Math.ceil(totalItems / limit)
    const pagination = {
      page,
      limit,
      totalItems,
      totalPage
    }

    if(page > 1){
      pagination.prev = page -1;
    }

    if(page < totalPage){
      pagination.next = page + 1;
    }

    // HATEOS links

    const url = req.baseUrl + req.path;
    const links = {
      self : url + queryContractor({...req.query})
    }

    if(pagination.next){
      links.next = url + queryContractor({...req.query, page: page + 1});
    }
    if(pagination.prev){
      links.prev = url + queryContractor({...req.query, page: page - 1});
    }

    res.status(200).json({
      data,
      pagination,
      links

    });


   
  } catch (error) {
    next(error);
  }
};

module.exports = findAll;
