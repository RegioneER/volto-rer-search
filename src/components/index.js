import loadable from '@loadable/component';

export const TypesGroupingWidget = loadable(() =>
  import(
    /* webpackChunkName: "RERSearchManage" */ 'volto-rer-search/components/manage/Widgets/TypesGroupingWidget/TypesGroupingWidget'
  ),
);

export const AvailableIndexesWidget = loadable(() =>
  import(
    /* webpackChunkName: "RERSearchManage" */ 'volto-rer-search/components/manage/Widgets/AvailableIndexesWidget/AvailableIndexesWidget'
  ),
);

export const ElevateWidget = loadable(() =>
  import(
    /* webpackChunkName: "RERSearchManage" */ 'volto-rer-search/components/manage/Widgets/ElevateWidget/ElevateWidget'
  ),
);

export const RerSearch = loadable(() =>
  import(
    /* webpackChunkName: "RERSearch" */ 'volto-rer-search/components/Search/Search'
  ),
);
