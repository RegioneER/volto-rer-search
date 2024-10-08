import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Button } from 'semantic-ui-react';
import { ArrayWidget, ObjectBrowserWidget } from '@plone/volto/components';
import { usePreventClick } from 'volto-rer-search/helpers';

const messages = defineMessages({
  deleteButton: {
    id: 'elevate-widget_delete',
    defaultMessage: 'Elimina configurazione',
  },
  keywords: {
    id: 'elevate-widget_field_keywords',
    defaultMessage: 'Parole chiave',
  },
  keywords_description: {
    id: 'elevate-widget_field_keywords_description',
    defaultMessage:
      'Una serie di parole chiave necessarie ad elevare determinati contenuti tra i risultati.',
  },
  elevatedContents: {
    id: 'elevate-widget_field_elevatedContents',
    defaultMessage: 'Contenuti da elevare',
  },
  elevatedContents_description: {
    id: 'elevate-widget_field_elevatedContents_description',
    defaultMessage: 'Seleziona una serie di contenuti da elevare.',
  },
});

const ElevateEntryConfiguration = ({ index, item, onChange, deleteItem }) => {
  const intl = useIntl();
  usePreventClick('.elevate-configuration');

  const onChangeFormData = (id, value) => {
    onChange({ ...item, [id]: value });
  };

  return (
    <div className="elevate-configuration">
      <ArrayWidget
        id={`keywords`}
        title={intl.formatMessage(messages.keywords)}
        description={intl.formatMessage(messages.keywords_description)}
        value={item.keywords}
        creatable={true}
        onChange={(n, v) => {
          onChangeFormData(n, v);
        }}
      />

      <div className="elevated-contents-navigation">
        <ObjectBrowserWidget
          id={`${index}-elevate-content`}
          title={intl.formatMessage(messages.elevatedContents)}
          description={intl.formatMessage(
            messages.elevatedContents_description,
          )}
          required={true}
          value={item['elevated-contents'] ?? []}
          onChange={(id, value) => onChangeFormData('elevated-contents', value)}
        />
      </div>

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

export default React.memo(ElevateEntryConfiguration);
