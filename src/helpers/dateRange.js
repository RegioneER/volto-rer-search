const getFilterDateRangeValue = (v, calc, moment) => {
  switch (v.range) {
    case 'min:max':
      return { startDate: moment(v.query[0]), endDate: moment(v.query[1]) };
    case 'min':
      return { ...calc, startDate: moment(v.query) };
    case 'max':
      return { ...calc, endDate: moment(v.query) };
    default:
      return calc;
  }
};

export const getDateRangeFilterValue = (filters, f, moment) => {
  let v = { startDate: null, endDate: null };
  //se vengono passati due indici diversi per i campi di start e di end
  if (f.index_start || f.index_end) {
    if (filters?.[f.index_start]) {
      v = getFilterDateRangeValue(filters[f.index_start], v, moment);
    }
    if (filters?.[f.index_end]) {
      v = getFilterDateRangeValue(filters[f.index_end], v, moment);
    }
  }
  //se viene passato un solo indice su cui fare la ricerca
  else if (f.index) {
    if (filters?.[f.index]) {
      v = getFilterDateRangeValue(filters[f.index], v, moment);
    }
  }
  return v;
};
