import React from 'react';
import { useIntl, defineMessages } from 'react-intl';
import { FormGroup, Input, Label } from 'design-react-kit';

import { Icon } from 'design-comuni-plone-theme/components/ItaliaTheme';

const messages = defineMessages({
  placeholder: {
    id: 'keywordindex_placeholder',
    defaultMessage: 'seleziona un valore',
  },
});

const GroupsWidget = ({ index, value, label, onChange, items = {} }) => {
  const intl = useIntl();

  return items?.length > 0 ? (
    <fieldset>
      <legend>{label[intl.locale]}</legend>
      {items.map((item, idx) => {
        const total = Object.keys(item.items).reduce(
          (acc, k) => (acc = acc + item.items[k]),
          0,
        );
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
            />
            <Label check htmlFor={item.id}>
              {item.icon && (
                <Icon
                  icon={item.icon}
                  color=""
                  padding={false}
                  size="xs"
                  className="me-2"
                />
              )}
              {item.label[intl.locale]} ({total})
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
