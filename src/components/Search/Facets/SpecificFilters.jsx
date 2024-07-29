import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useIntl, defineMessages } from 'react-intl';
import { Row, Col } from 'design-react-kit';
import { DateFilter as DateRangeFilter } from 'design-comuni-plone-theme/components/ItaliaTheme/Blocks/Common/SearchFilters';

import {
  SelectWidget,
  DatetimeWidget,
} from 'volto-rer-search/components/Search';

const messages = defineMessages({
  advanced_filters: {
    id: 'searchsite_advanced_filters',
    defaultMessage: 'Filtra i contenuti con filtri specifici per questo gruppo',
  },
});
const SpecificFilters = ({ filters = {}, setFilters }) => {
  const intl = useIntl();
  const _advanced_filters = useSelector(
    (state) => state.rer_search?.result?.advanced_filters ?? {},
  );

  const [advanced_filters, setAdvanced_filters] = useState({});

  useEffect(() => {
    const isEventRangeDates =
      _advancedFilters.start &&
      _advancedFilters.start.type === 'date' &&
      _advancedFilters.end &&
      _advancedFilters.end.type === 'date';

    if (isEventRangeDates) {
      const dateRangeFilter = Object.keys(_advancedFilters).reduce(
        (acc, val) => {
          if (val === 'start' || val === 'end') {
            return {
              ...acc,
              date: {
                ...(acc.date ? acc.date : {}),
                [val]: _advancedFilters[val],
                type: 'date_range',
              },
            };
          }

          return {
            ...acc,
            [val]: _advancedFilters[val],
          };
        },
        {},
      );

      setAdvanced_filters(dateRangeFilter);
    } else {
      setAdvanced_filters(advanced_filters);
    }
  }, [_advanced_filters]);

  console.log({ advanced_filters });

  const onChangeField = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  return Object.keys(advanced_filters).length > 0 ? (
    <div className="advanced-filters">
      <div className="title">
        {intl.formatMessage(messages.advanced_filters)}
      </div>
      <Row>
        {Object.keys(advanced_filters)?.map((fkey) => {
          const f = advanced_filters[fkey];

          return (
            <Col xs={12} key={fkey} className="mb-5">
              {f.type === 'date' && (
                <>
                  TODO: testare
                  <DatetimeWidget
                    id={fkey}
                    value={filters[fkey]}
                    onChange={onChangeField}
                  />
                </>
              )}
              {(f.type === 'array' || f.type === 'select') && (
                <>
                  TODO: da testare
                  <SelectWidget
                    {...f}
                    index={fkey}
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
                    value={filters[fkey]}
                  />
                </>
              )}
              {f.type === 'date_range' && (
                <>
                  TODO:gestire bene la query. vedi
                  https://github.com/RegioneER/rer.sitesearch/blob/db23b4e4840c60bfc032a61c1b623688aacdbb62/src/rer/sitesearch/browser/static/js/SpecificFilters/SpecificFilter.js#L156
                  <DateRangeFilter
                    id={fkey}
                    value={filters[fkey]}
                    onChange={onChangeField}
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
