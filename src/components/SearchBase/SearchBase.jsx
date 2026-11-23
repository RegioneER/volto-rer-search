/**
 * /search-base page: the design-comuni-plone-theme search fed by the
 * dedicated filters endpoint, over every content type of the site. If the
 * endpoint refuses the user (anonymous), it shows the Unauthorized page.
 *
 * Author: Giulio Malaguti
 * Last modified: 2026-11-19
 */
import React from 'react';
import { useSelector } from 'react-redux';
import { Unauthorized } from '@plone/volto/components';
import BaseSearch from 'design-comuni-plone-theme/components/ItaliaTheme/Search/Search';
import { getSearchBaseFilters } from 'volto-rer-search/actions';

const SearchBase = (props) => {
  const errorStatus = useSelector(
    (state) => state.searchBaseFilters?.error?.status,
  );

  if (errorStatus === 401 || errorStatus === 403) {
    return <Unauthorized />;
  }

  return (
    <BaseSearch
      {...props}
      getFilters={getSearchBaseFilters}
      filtersStateKey="searchBaseFilters"
      useSiteSearchSettings={false}
      defaultExcludedPortalTypes={[]}
    />
  );
};

export default SearchBase;
