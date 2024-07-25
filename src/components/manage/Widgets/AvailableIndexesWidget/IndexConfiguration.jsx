import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Form as UIForm, Grid, Button } from 'semantic-ui-react';
import { MultilingualWidget } from 'volto-multilingual-widget';
import { TextWidget, ArrayWidget, SelectWidget } from '@plone/volto/components';
import { usePreventClick } from 'volto-rer-search/helpers';
import config from '@plone/volto/registry';

const messages = defineMessages({
  deleteButton: {
    id: 'available-indexes-widget_delete_index',
    defaultMessage: 'Elimina indice',
  },
  label: {
    id: 'available-indexes-widget_field_label',
    defaultMessage: 'Etichetta',
  },
  label_description: {
    id: 'available-indexes-widget_field_label_discription',
    defaultMessage: "Inserisci un'etichetta per questo indice.",
  },
  index: {
    id: 'available-indexes-widget_field_index',
    defaultMessage: 'Indice',
  },
  index_description: {
    id: 'widget_field_index_discription',
    defaultMessage: 'Seleziona quale indice in catalogo da usare come filtro.',
  },
});

const TextMultilingualWidget = MultilingualWidget(TextWidget, '');

const IndexConfiguration = ({ item, index, onChange, deleteItem, indexes }) => {
  const intl = useIntl();

  usePreventClick('.index-configuration');

  const onChangeFormData = (id, value) => {
    onChange({ ...item, [id]: value });
  };

  return (
    <div className="index-configuration">
      <TextMultilingualWidget
        id="label"
        title={intl.formatMessage(messages.label)}
        description={intl.formatMessage(messages.label_description)}
        value={item.label}
        onChange={(f, v) => {
          onChangeFormData(f, JSON.parse(v));
        }}
        key="giulia"
      />

      <SelectWidget
        id="index"
        title={intl.formatMessage(messages.index)}
        description={intl.formatMessage(messages.index_description)}
        value={item.index}
        choices={indexes.map((k) => [k.value, k.label])}
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

export default IndexConfiguration;
