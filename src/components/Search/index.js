import loadable from '@loadable/component';

export const RerSearch = loadable(
  () =>
    import(
      /* webpackChunkName: "RERSearch" */ 'volto-rer-search/components/Search/Search'
    ),
);

export const Facets = loadable(
  () =>
    import(
      /* webpackChunkName: "RERSearch" */ 'volto-rer-search/components/Search/Facets/Facets'
    ),
);

export const KeywordIndexWidget = loadable(
  () =>
    import(
      /* webpackChunkName: "RERSearch" */ 'volto-rer-search/components/Search/Facets/KeywordIndexWidget'
    ),
);
