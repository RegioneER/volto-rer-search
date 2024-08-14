import React from 'react';
import { useIntl, defineMessages } from 'react-intl';
import { FormGroup, Input, Label } from 'design-react-kit';

import { Icon } from 'design-comuni-plone-theme/components/ItaliaTheme';

import './groups-widget.scss';

const messages = defineMessages({
  placeholder: {
    id: 'keywordindex_placeholder',
    defaultMessage: 'seleziona un valore',
  },
});

const GroupsWidget = ({ index, value, label, onChange, items = [] }) => {
  const intl = useIntl();

  return items?.length > 0 ? (
    <fieldset className="groups-widget">
      <legend>
        <Icon
          icon="question-circle"
          color=""
          padding={false}
          size="s"
          className="me-2"
        />
        {label[intl.locale]}
      </legend>
      {items.map((item, idx) => {
        return (
          <FormGroup check key={item.id}>
            <Input
              checked={(!value && idx === 0) || value == item.id}
              id={item.id}
              name={item.id}
              type="radio"
              onChange={(e) => {
                onChange(index, item.id);
              }}
              aria-controls="search-results-region"
            />
            <Label check htmlFor={item.id}>
              {item.icon && (
                <Icon
                  icon={item.icon}
                  color=""
                  padding={false}
                  size="xs"
                  className="me-1"
                />
              )}
              {item.label[intl.locale]}
            </Label>
          </FormGroup>
        );
      })}
    </fieldset>
  ) : (
    <></>
  );
};

export default GroupsWidget;
