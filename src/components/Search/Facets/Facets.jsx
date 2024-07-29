import React from 'react';
import { useSelector } from 'react-redux';
import {
  GroupsWidget,
  SelectWidget,
  LocationWidget,
} from 'volto-rer-search/components/Search';

import './facets.scss';

const Facets = ({ filters = {}, setFilters, path }) => {
  const facets = useSelector((state) => state.rer_search?.result?.facets ?? []);

  const onChangeField = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  return (
    <div className="facets">
      <LocationWidget filters={filters} setFilters={setFilters} />
      {facets?.map((f) => (
        <div key={f.index} className="mb-5">
          {f.type === 'Groups' && (
            <GroupsWidget
              {...f}
              onChange={onChangeField}
              value={filters[f.index]}
            />
          )}
          {f.type === 'KeywordIndex' && (
            <SelectWidget
              {...f}
              onChange={onChangeField}
              value={filters[f.index]}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Facets;
