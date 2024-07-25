//import { MultilingualWidget } from 'volto-multilingual-widget';

import {
  TypesGroupingWidget,
  AvailableIndexesWidget,
} from 'volto-rer-search/components';

const applyConfig = (config) => {
  config.settings['volto-rer-search'] = {
    ...(config.settings['volto-rer-search'] ?? {}),
    siteSearch: {
      extraParams: ['authors'],
    },
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

  // config.widgets.id.site_title_translated = MultilingualWidget(
  //   (props) => <TextareaWidget {...props} wrapped={false} />,
  //   [],
  // );
  return config;
};

export default applyConfig;
