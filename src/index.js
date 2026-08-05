//import { MultilingualWidget } from 'volto-multilingual-widget';

import {
  TypesGroupingWidget,
  AvailableIndexesWidget,
  ElevateWidget,
  RerSearch,
} from 'volto-rer-search/components';
import BaseSearch from 'design-comuni-plone-theme/components/ItaliaTheme/Search/Search';

import { rerSearch } from 'volto-rer-search/actions';

import { rerSearchReducer } from 'volto-rer-search/reducers';

const applyConfig = (config) => {
  // la ricerca "base" di design-comuni-plone-theme viene servita su /search-base,
  // dato che /search è occupato dalla ricerca Solr di questo addon
  config.settings.search = {
    ...(config.settings.search ?? {}),
    baseUrl: '/search-base',
  };

  config.settings['volto-rer-search'] = {
    ...(config.settings['volto-rer-search'] ?? {}),
    // siteSearch: {
    //   extraParams: ['authors'], //non serve più perchè i parametri dall'url vengono letti tutti, senza distinizione degli extra
    // },
    icons: [
      ['archive', 'Archive'],
      ['broadcast-tower', 'Broadcast Tower'],
      ['calendar-alt', 'Calendar Alt'],
      ['file', 'File'],
      ['folder', 'Folder'],
      ['folder-open', 'Folder Open'],
      ['list', 'List'],
      ['newspaper', 'Newspaper'],
      ['tag', 'Tag'],
    ],
    resultItemAdditionalRenderers: {},
  };
  // config.registerComponent({
  //   name: 'SiteSettingsExtras',
  //   component: SiteSettingsExtras,
  // });

  config.widgets.id = {
    ...config.widgets.id,
    types_grouping: TypesGroupingWidget,
    available_indexes: AvailableIndexesWidget,
    elevate_schema: ElevateWidget,
  };

  config.addonReducers = {
    ...config.addonReducers,
    rer_search: rerSearchReducer,
  };

  // ROUTES
  // /search viene servita dalla ricerca Solr di questo addon, con le stesse
  // regole già registrate da design-comuni-plone-theme (funziona sotto qualsiasi path)
  config.addonRoutes = (config.addonRoutes ?? []).map((route) =>
    route.path === '/**/search'
      ? { ...route, path: ['/search', '/**/search'], component: RerSearch }
      : route,
  );
  config.addonRoutes.push({
    path: ['/search-base', '/**/search-base'],
    component: BaseSearch,
  });

  return config;
};

export { rerSearch };
export default applyConfig;
