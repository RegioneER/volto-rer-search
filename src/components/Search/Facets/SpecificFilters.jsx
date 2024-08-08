import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useIntl, defineMessages } from 'react-intl';
import { Row, Col } from 'design-react-kit';

import {
  SelectWidget,
  DatetimeWidget,
  DateRangeWidget,
} from 'volto-rer-search/components/Search';
import { getDateRangeFilterValue } from 'volto-rer-search/helpers';

const messages = defineMessages({
  advanced_filters: {
    id: 'searchsite_advanced_filters',
    defaultMessage: 'Filtra i contenuti con filtri specifici per questo gruppo',
  },
});
const SpecificFilters = ({ filters = {}, setFilters }) => {
  const intl = useIntl();
  const advanced_filters = useSelector((state) => {
    if (filters.group) {
      return state.rer_search?.result?.facets
        .filter((f) => f.index === 'group')?.[0]
        .items.filter((i) => i.id == filters.group)?.[0].advanced_filters;
    }
    return {};
  });

  console.log(advanced_filters);

  const onChangeField = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  return advanced_filters.length > 0 ? (
    <div className="advanced-filters">
      <div className="title">
        {intl.formatMessage(messages.advanced_filters)}
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
                    console.log('onchange', f);
                    setFilters({ ...filters, ...f });
                  }}
                  value={getDateRangeFilterValue(filters, f)}
                  dateOnly={true}
                />
              )}
              {(f.type === 'array' ||
                f.type === 'select' ||
                f.type === 'KeywordIndex') && (
                <>
                  <SelectWidget
                    {...f}
                    index={f.index}
                    items={f.options}
                    onChange={(id, value) => {
                      if (!value || value.length == 0) {
                        if (id === 'stato_bandi') {
                          setFilters({
                            chiusura_procedimento_bando: null,
                            scadenza_bando: null,
                            [id]: '',
                          });
                        } else {
                          setFilters({ [id]: '' });
                        }
                      } else if (id === 'stato_bandi') {
                        setFilters({
                          [id]: {
                            query: option.label,
                          },
                          chiusura_procedimento_bando: null,
                          scadenza_bando: null,
                          ...option.value,
                        });
                      } else if (f.multivalued) {
                        setFilters({
                          [id]: {
                            query: option.map(({ value }) => value),
                            operator: 'and',
                          },
                        });
                      } else {
                        setFilters({
                          [id]: {
                            query: option.value,
                          },
                        });
                      }
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
  ) : (
    <></>
  );
};

export default SpecificFilters;
