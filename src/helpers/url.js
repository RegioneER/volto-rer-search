import qs from 'query-string';
import DataObjectParser from 'dataobject-parser';

export const dotify = (params) => {
  var res = {};
  function recurse(obj, current) {
    for (var key in obj) {
      var value = obj[key];
      var newKey = current ? current + '.' + key : key; // joined key with dot
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        recurse(value, newKey); // it's a nested object, so do it again. Skip if is an array
      } else {
        res[newKey] = value; // it's not an object, so set the property
      }
    }
  }

  recurse(params);
  return res;
};

export const getParams = (location) => {
  const requestQuery = qs.parse(location.search);
  let query = requestQuery
    ? DataObjectParser.transpose(requestQuery).data()
    : {};

  return query;
};
