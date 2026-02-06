const defaults = require('../config/defaults')
const generateQueryString = (query) => {


  const queryString = new URLSearchParams(query).toString();
  
  // Combine base, path, and query (if query exists)
  return queryString ? `?${queryString}` : '';
};





module.exports = {
    generateQueryString
}