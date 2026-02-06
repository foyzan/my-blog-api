const { generateQueryString } = require("./queryStringHelper");

const getPagination = ({page = defaults.page, limit = defaults.limit,  totalItems = defaults.totalItem}) => {
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

    return pagination
}


const getHateOASForAll = ({url = '/', query = {}, page ,hasNext = false, hasPrev = false})=>{
  
    const links = {
      self : url + generateQueryString({...query})
    }

    if(hasNext){
      links.next = url + generateQueryString({...query, page: page + 1});
    }
    if(hasPrev){
      links.prev = url + generateQueryString({...query, page: page - 1});
    }


    return links
}

module.exports = {
  getPagination, 
  getHateOASForAll
}