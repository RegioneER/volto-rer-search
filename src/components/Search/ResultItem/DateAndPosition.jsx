import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { toPublicURL, isInternalURL } from '@plone/volto/helpers';

const DateAndPosition = ({ item }) => {
  const getItemPosition = (item) => {
    const url = new URL(
      isInternalURL(item['@id']) ? toPublicURL(item['@id']) : item['@id'],
    );

    const domain = url.host
      .replace('emilia-romagna.it', '..')
      .replace(':3000', '..');
    const path = item.path ? item.path : url.pathname;
    const path_depth = item.path_depth
      ? item.path_depth
      : path.split('/').length - 2;

    if (path_depth) {
      if (path_depth === 1) {
        return domain;
      } else if (path_depth === 2) {
        return domain + '/' + path.split('/').slice(2, -1).join('/');
      } else {
        return domain + '/…/' + path.split('/').slice(-3, -1).join('/');
      }
    }
  };

  const itemPosition = getItemPosition(item);

  return (
    <>
      {item.Date && moment(item.Date).format('YYYY') !== '1969' && (
        <span className="date">{moment(item.Date).format('D/MM/YYYY')}</span>
      )}
      {itemPosition && <span className="url">{itemPosition}</span>}
    </>
  );
};

DateAndPosition.propTypes = {
  item: PropTypes.object.isRequired,
};
export default DateAndPosition;
