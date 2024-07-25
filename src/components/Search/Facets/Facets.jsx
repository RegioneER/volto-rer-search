import React from 'react';
import { useSelector } from 'react-redux';
import { KeywordIndexWidget } from 'volto-rer-search/components/Search';

const Facets = ({ filters = {}, setFilters }) => {
  const facets = useSelector((state) => state.rer_search?.result.facets);
  //console.log(facets);
  const onChangeField = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };
  return (
    <>
      {facets.map((f) => (
        <>
          {f.type === 'KeywordIndex' && (
            <KeywordIndexWidget
              {...f}
              onChange={onChangeField}
              value={filters[f.index]}
            />
          )}
        </>
      ))}
    </>
  );
};

export default Facets;
