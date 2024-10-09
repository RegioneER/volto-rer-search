import React from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

import {
  GroupsWidget,
  SelectWidget,
  LocationWidget,
  DatetimeWidget,
  BooleanWidget,
  DateRangeWidget,
} from 'volto-rer-search/components/Search';
import { getDateRangeFilterValue } from 'volto-rer-search/helpers';
import SearchUtils from 'volto-rer-search/components/Search/utils';
import './facets.scss';

const Facets = ({
  filters = {},
  setFilters,
  setCurrentPage,
  path,
  moment: momentlib,
}) => {
  const intl = useIntl();
  const facets = useSelector((state) => state.rer_search?.result?.facets ?? []);
  const moment = momentlib.default;
  moment.locale(intl.locale);

  const onChangeField = (field, value) => {
    const newFilters = SearchUtils.clearAdvancedFilters(facets, filters);
    if ('b_start' in newFilters) {
      delete newFilters.b_size;
    }
    setFilters({ ...newFilters, [field]: value });
    setCurrentPage(0);
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
          {/*INDEXES*/}
          {(f.type === 'KeywordIndex' || f.type === 'array') && (
            <SelectWidget
              {...f}
              onChange={onChangeField}
              value={filters[f.index]}
            />
          )}
          {(f.type === 'FieldIndex' || f.type === 'select') && (
            <SelectWidget
              {...f}
              multivalued={false}
              onChange={onChangeField}
              value={filters[f.index]}
            />
          )}
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
              value={getDateRangeFilterValue(filters, f, moment)}
              dateOnly={true}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default injectLazyLibs(['moment'])(Facets);
