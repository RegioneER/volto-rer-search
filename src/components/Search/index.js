import loadable from '@loadable/component';

export const RerSearch = loadable(() =>
  import(
    /* webpackChunkName: "RERSearch" */ 'volto-rer-search/components/Search/Search'
  ),
);

export const Facets = loadable(() =>
  import(
    /* webpackChunkName: "RERSearch" */ 'volto-rer-search/components/Search/Facets/Facets'
  ),
);
export const LocationWidget = loadable(() =>
  import(
    /* webpackChunkName: "RERSearch" */ 'volto-rer-search/components/Search/Facets/widgets/LocationWidget'
  ),
);

export const OrderingWidget = loadable(() =>
  import(
    /* webpackChunkName: "RERSearch" */ 'volto-rer-search/components/Search/OrderingWidget'
  ),
);

export const SelectWidget = loadable(() =>
  import(
    /* webpackChunkName: "RERSearch" */ 'volto-rer-search/components/Search/Facets/widgets/SelectWidget'
  ),
);
export const BooleanWidget = loadable(() =>
  import(
    /* webpackChunkName: "RERSearch" */ 'volto-rer-search/components/Search/Facets/widgets/BooleanWidget'
  ),
);

export const DatetimeWidget = loadable(() =>
  import(
    /* webpackChunkName: "RERSearch" */ 'volto-rer-search/components/Search/Facets/widgets/DatetimeWidget'
  ),
);
export const DateRangeWidget = loadable(() =>
  import(
    /* webpackChunkName: "RERSearch" */ 'volto-rer-search/components/Search/Facets/widgets/DateRangeWidget'
  ),
);

export const GroupsWidget = loadable(() =>
  import(
    /* webpackChunkName: "RERSearch" */ 'volto-rer-search/components/Search/Facets/widgets/GroupsWidget'
  ),
);
export const ResultItem = loadable(() =>
  import(
    /* webpackChunkName: "RERSearch" */ 'volto-rer-search/components/Search/ResultItem/ResultItem'
  ),
);

export const SpecificFilters = loadable(() =>
  import(
    /* webpackChunkName: "RERSearch" */ 'volto-rer-search/components/Search/Facets/SpecificFilters'
  ),
);
