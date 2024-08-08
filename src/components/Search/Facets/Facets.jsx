import React from 'react';
import { useSelector } from 'react-redux';
import {
  GroupsWidget,
  SelectWidget,
  LocationWidget,
  DatetimeWidget,
  BooleanWidget,
  DateRangeWidget,
} from 'volto-rer-search/components/Search';
import { getDateRangeFilterValue } from 'volto-rer-search/helpers';

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

          {/*INDEXES*/}
          {f.type === 'BooleanIndex' && (
            <BooleanWidget
              {...f}
              onChange={onChangeField}
              value={filters[f.index]}
            />
          )}
          {f.type === 'DateIndex' && (
            <DatetimeWidget
              {...f}
              onChange={onChangeField}
              value={filters[f.index]}
              dateOnly={true}
            />
          )}

          {f.type === 'DateRangeIndex' && (
            <DateRangeWidget
              {...f}
              onChange={(f) => {
                setFilters({ ...filters, ...f });
              }}
              value={getDateRangeFilterValue(filters, f)}
              dateOnly={true}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Facets;
