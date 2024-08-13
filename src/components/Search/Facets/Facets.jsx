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

const Facets = ({ filters = {}, setFilters, path, moment: momentlib }) => {
  const intl = useIntl();
  const facets = useSelector((state) => state.rer_search?.result?.facets ?? []);
  const moment = momentlib.default;
  moment.locale(intl.locale);

  const onChangeField = (field, value) => {
    const newFilters = SearchUtils.clearAdvancedFilters(facets, filters);
    setFilters({ ...newFilters, [field]: value });
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
