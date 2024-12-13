import React from 'react';
import { useSelector } from 'react-redux';
import { useIntl, defineMessages } from 'react-intl';
import { Row, Col } from 'design-react-kit';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

import {
  SelectWidget,
  DatetimeWidget,
  DateRangeWidget,
  BooleanWidget,
} from 'volto-rer-search/components/Search';
import { getDateRangeFilterValue } from 'volto-rer-search/helpers';

const messages = defineMessages({
  advanced_filters: {
    id: 'searchsite_advanced_filters',
    defaultMessage: 'Filtri specifici per {group}',
  },
});
const SpecificFilters = ({ filters = {}, setFilters, moment: momentlib }) => {
  const intl = useIntl();
  const moment = momentlib.default;
  moment.locale(intl.locale);

  const advanced_filters_settings = useSelector((state) => {
    if (filters.group) {
      return state.rer_search?.result?.facets
        ?.filter((f) => f.index === 'group')?.[0]
        ?.items?.filter((i) => i.id == filters.group)?.[0];
    }
    return [];
  });
  const currentLang = useSelector((state) => state.intl.locale);

  const advanced_filters = advanced_filters_settings?.advanced_filters;
  let advancedFiltersLabel = advanced_filters_settings?.label
    ? advanced_filters_settings?.label[currentLang]
    : '';
  advancedFiltersLabel = advancedFiltersLabel.replace(/\(\d+\)/g, '');
  const onChangeField = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };
  return advanced_filters?.length > 0 ? (
    <Row className="mb-5">
      <Col>
        <div className="advanced-filters p-3 bg-light">
          <div className="title mb-5">
            {intl.formatMessage(messages.advanced_filters, {
              group: advancedFiltersLabel,
            })}
          </div>
          <Row>
            {advanced_filters.map((f) => {
              return (
                <Col xs={12} md={6} key={f.index} className="mb-5">
                  {f.type === 'DateIndex' && (
                    <>
                      <DatetimeWidget
                        {...f}
                        value={filters[f.index]}
                        onChange={onChangeField}
                        dateOnly={true}
                      />
                    </>
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

                  {(f.type === 'array' ||
                    f.type === 'select' ||
                    f.type === 'KeywordIndex' ||
                    f.type === 'FieldIndex' ||
                    f.type === 'BooleanIndex') && (
                    <>
                      <SelectWidget
                        {...f}
                        multivalued={
                          f.type === 'FieldIndex' || f.type === 'BooleanIndex'
                            ? false
                            : f.multivalued
                        }
                        onChange={(id, value, option) => {
                          let newFilters = { ...filters };
                          if (!value || value.length == 0) {
                            if (id in newFilters) {
                              delete newFilters[id];
                            }
                          } else {
                            if (f.multivalued) {
                              newFilters = {
                                ...newFilters,
                                [id]: option.map(({ value }) => value),
                              };
                            } else {
                              newFilters = {
                                ...newFilters,
                                [id]: value,
                              };
                            }
                          }
                          // cleanup empty values
                          Object.entries(newFilters).forEach(([key, value]) => {
                            if (
                              value === null ||
                              value === undefined ||
                              value === '' ||
                              value === 0 ||
                              Number.isNaN(value)
                            ) {
                              delete newFilters[key];
                            }
                          });
                          setFilters(newFilters);
                        }}
                        value={filters[f.index]}
                      />
                    </>
                  )}
                </Col>
              );
            })}
          </Row>
        </div>
      </Col>
    </Row>
  ) : (
    <></>
  );
};

export default injectLazyLibs(['moment'])(SpecificFilters);
