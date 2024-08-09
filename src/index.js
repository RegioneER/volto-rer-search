//import { MultilingualWidget } from 'volto-multilingual-widget';

import {
  TypesGroupingWidget,
  AvailableIndexesWidget,
} from 'volto-rer-search/components';

import { rerSearch } from 'volto-rer-search/actions';

import { rerSearchReducer } from 'volto-rer-search/reducers';

const applyConfig = (config) => {
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
  };
  // config.registerComponent({
  //   name: 'SiteSettingsExtras',
  //   component: SiteSettingsExtras,
  // });

  config.widgets.id = {
    ...config.widgets.id,
    types_grouping: TypesGroupingWidget,
    available_indexes: AvailableIndexesWidget,
  };

  config.addonReducers = {
    ...config.addonReducers,
    rer_search: rerSearchReducer,
  };
  return config;
};

export { rerSearch };
export default applyConfig;
