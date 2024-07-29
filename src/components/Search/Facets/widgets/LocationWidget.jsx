import React from 'react';
import { useSelector } from 'react-redux';
import { useIntl, defineMessages } from 'react-intl';
import { FormGroup, Input, Label } from 'design-react-kit';
import { Icon } from 'design-comuni-plone-theme/components/ItaliaTheme';

const messages = defineMessages({
  where: {
    id: 'searchsite_where',
    defaultMessage: 'Dove',
  },
  in_section: {
    id: 'searchsite_in_section',
    defaultMessage: 'Nella sezione',
  },
  sites_all_label: {
    id: 'searchsite_in_all_sites',
    defaultMessage: 'In tutti i siti della Regione',
  },
  in_this_site: {
    id: 'searchsite_in_this_site',
    defaultMessage: 'In questo sito web',
  },
});

const PathFilters = ({ setFilters, path, path_infos }) => {
  const intl = useIntl();
  const { root, path_title } = path_infos;

  return (
    <FormGroup check>
      <Input
        checked={path !== root}
        id="currentpath"
        name="path"
        type="radio"
        onChange={(e) => {
          setFilters({ path: path });
        }}
        aria-controls="search-results-region"
      />
      <Label check htmlFor="currentpath">
        {intl.formatMessage(messages.in_section)} <strong>{path_title}</strong>
      </Label>
    </FormGroup>
  );
};

const SitesFilters = ({ filters, setFilters }) => {
  const sites = useSelector((state) => state.rer_search?.result?.sites ?? {});
  const current_site = useSelector(
    (state) => state.rer_search?.result?.current_site ?? [],
  );

  const { path, site_name } = filters;
  if (!sites) {
    return '';
  }

  const totalResults = sites
    ? Object.values(sites.values).reduce((acc, site) => acc + site, 0)
    : 0;
  const currentResults = sites ? sites.values[current_site] : 0;

  return (
    <>
      <FormGroup check>
        <Input
          checked={!path && filters.site_name === 'all'}
          id="site_name"
          name="site_name"
          value="all"
          type="radio"
          onChange={(e) => {
            setFilters({ site_name: 'all', path: '' });
          }}
          aria-controls="search-results-region"
        />
        <Label check htmlFor="site_name">
          {intl.formatMessage(messages.sites_all_label)} ({totalResults})
        </Label>
      </FormGroup>

      <FormGroup check>
        <Input
          checked={path ? false : site_name === current_site || !site_name}
          id="site_name"
          name="site_name"
          value={current_site}
          type="radio"
          onChange={(e) => {
            setFilters({ site_name: current_site, path: '' });
          }}
          aria-controls="search-results-region"
        />
        <Label check htmlFor="site_name">
          {intl.formatMessage(messages.in_this_site)} ({currentResults || 0})
        </Label>
      </FormGroup>
    </>
  );
};

const LocationWidget = ({ filters, setFilters, path }) => {
  const intl = useIntl();
  const path_infos = useSelector(
    (state) => state.rer_search?.result?.path_infos ?? {},
  );

  const facets = useSelector((state) => state.rer_search?.result?.facets ?? []);
  let hasPath = true;
  let hasSites = facets.sites ? true : false;

  if (!filters.path || filters.path.length === 0 || !path_infos) {
    hasPath = false;
  }

  if (!hasPath && !hasSites) {
    return <></>;
  }
  return (
    <fieldset className="filter-item mb-5">
      <legend>
        <Icon
          icon="folder"
          color=""
          padding={false}
          size="s"
          className="me-2"
        />
        {intl.formatMessage(messages.where)}
      </legend>

      {hasPath && (
        <PathFilters
          setFilters={setFilters}
          path={filters.path}
          path_infos={path_infos}
        />
      )}
      {hasSites && <SitesFilters filters={filters} setFilters={setFilters} />}
    </fieldset>
  );
};

LocationWidget.propTypes = {};

export default LocationWidget;
