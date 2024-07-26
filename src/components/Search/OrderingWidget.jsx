import React from 'react';
import { useIntl, defineMessages } from 'react-intl';

import { Row, Col } from 'design-react-kit';

import { SelectInput } from 'design-comuni-plone-theme/components';
const messages = defineMessages({
  foundNResults: {
    id: 'found_n_results',
    defaultMessage: 'Trovati {total} risultati.',
  },
  orderBy: {
    id: 'order_by',
    defaultMessage: 'Ordina per',
  },
  sort_on_relevance: {
    id: 'sort_on_relevance',
    defaultMessage: 'Rilevanza',
  },
  sort_on_date: {
    id: 'sort_on_date',
    defaultMessage: 'Data (prima i più recenti)',
  },
  sort_on_sortable_title: {
    id: 'sort_on_sortable_title',
    defaultMessage: 'Alfabeticamente',
  },
});

const OrderingWidget = ({ sortOn, setSortOn, options, total }) => {
  const intl = useIntl();
  const sortOnOptions = Object.keys(options).map((k) => {
    return {
      value: k,
      label: intl.formatMessage(messages['sort_on_' + k]),
    };
  });

  return (
    <div className="d-block ordering-widget">
      <Row className="pb-3 border-bottom">
        <Col xs={6} className="align-self-center">
          <p className="d-none d-lg-block" aria-live="polite">
            {intl.formatMessage(messages.foundNResults, {
              total: total || 0,
            })}
          </p>
          <p className="d-block d-lg-none mb-0 text-end">
            {intl.formatMessage(messages.orderBy)}
          </p>
        </Col>
        <Col xs={6}>
          <SelectInput
            id="search-sort-on"
            value={sortOnOptions.filter((o) => o.value === sortOn)[0]}
            label={intl.formatMessage(messages.orderBy)}
            placeholder={sortOnOptions.find((o) => o.value === sortOn).label}
            onChange={(opt) => setSortOn(opt.value)}
            options={sortOnOptions}
            defaultValue={sortOnOptions.find((o, i) => i === 0)}
          />
        </Col>
      </Row>
    </div>
  );
};

export default OrderingWidget;
