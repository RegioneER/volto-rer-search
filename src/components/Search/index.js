import loadable from '@loadable/component';

export const RerSearch = loadable(
  () =>
    import(
      /* webpackChunkName: "RERSearch" */ 'volto-rer-search/components/Search/Search'
    ),
);
