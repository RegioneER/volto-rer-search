import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Form as UIForm, Grid, Button } from 'semantic-ui-react';
import { MultilingualWidget } from 'volto-multilingual-widget';
import { TextWidget, ArrayWidget, SelectWidget } from '@plone/volto/components';
import { usePreventClick } from 'volto-rer-search/helpers';
import config from '@plone/volto/registry';

const messages = defineMessages({
  deleteButton: {
    id: 'types-grouping-widget_delete_group',
    defaultMessage: 'Elimina gruppo',
  },
  label: {
    id: 'types-grouping-widget_field_label',
    defaultMessage: 'Etichetta',
  },
  label_description: {
    id: 'types-grouping-widget_field_label_discription',
    defaultMessage: "Inserisci un'etichetta per questo gruppo.",
  },
  portal_types: {
    id: 'types-grouping-widget_field_portal_types',
    defaultMessage: 'Tipi di contenuto',
  },
  portal_types_description: {
    id: 'widget_field_portal_types_discription',
    defaultMessage:
      'Seleziona quali tipi di contenuto mostrare in questo gruppo.',
  },
  icon: {
    id: 'types-grouping-widget_field_icona',
    defaultMessage: 'Icona',
  },
  icon_description: {
    id: 'widget_field_content_icon_description',
    defaultMessage: "Seleziona un'icona per questo gruppo.",
  },
  advanced_filters: {
    id: 'types-grouping-widget_field_advanced_filters',
    defaultMessage: 'Filtri avanzati',
  },
  advanced_filters_description: {
    id: 'widget_field_content_advanced_filters_description',
    defaultMessage:
      'Seleziona un set di filtri avanzati specifici per questo gruppo tra quelli disponibili.',
  },
});

const TextMultilingualWidget = MultilingualWidget(TextWidget, '');

const GroupConfiguration = ({
  item,
  onChange,
  deleteItem,
  portal_types,
  advanced_filters,
}) => {
  const intl = useIntl();
  usePreventClick('.group-configuration');

  const onChangeFormData = (id, value) => {
    onChange({ ...item, [id]: value });
  };

  return (
    <div className="group-configuration">
      <TextMultilingualWidget
        id="label"
        title={intl.formatMessage(messages.label)}
        description={intl.formatMessage(messages.label_description)}
        value={item.label}
        onChange={(f, v) => {
          onChangeFormData(f, JSON.parse(v));
        }}
      />

      <ArrayWidget
        id="portal_type"
        title={intl.formatMessage(messages.portal_types)}
        description={intl.formatMessage(messages.portal_types_description)}
        value={item.portal_type}
        choices={portal_types}
        onChange={(n, v) => {
          onChangeFormData(n, v);
        }}
      />

      <SelectWidget
        id="icon"
        title={intl.formatMessage(messages.icon)}
        description={intl.formatMessage(messages.icon_description)}
        value={item.icon}
        choices={config.settings['volto-rer-search'].icons}
        onChange={(n, v) => {
          onChangeFormData(n, v);
        }}
      />

      <SelectWidget
        id="advanced_filters"
        title={intl.formatMessage(messages.advanced_filters)}
        description={intl.formatMessage(messages.advanced_filters_description)}
        value={item.advanced_filters}
        choices={advanced_filters.map((f) => [f.value, f.label])}
        onChange={(n, v) => {
          onChangeFormData(n, v);
        }}
      />

      <div className="delete-item-wrapper">
        <Button
          icon="trash"
          onClick={deleteItem}
          className="delete-item"
          negative
          content={intl.formatMessage(messages.deleteButton)}
        />
      </div>
    </div>
  );
};

export default React.memo(GroupConfiguration);
