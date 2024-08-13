import React from 'react';
import { useIntl, defineMessages } from 'react-intl';
import { SelectInput } from 'design-comuni-plone-theme/components';
import { Icon } from 'design-comuni-plone-theme/components/ItaliaTheme';

const messages = defineMessages({
  placeholder: {
    id: 'keywordindex_placeholder',
    defaultMessage: 'seleziona un valore',
  },
});

const SelectWidget = ({
  index,
  value = [],
  label,
  onChange,
  items = {},
  multivalued = true,
}) => {
  const intl = useIntl();

  return items?.length > 0 ? (
    <SelectInput
      id={index}
      value={value?.map((v) => items.filter((o) => o.value === v)[0]) ?? []}
      label={
        <>
          {index === 'Subject' && (
            <Icon
              icon="tags"
              color=""
              padding={false}
              size="s"
              className="me-2"
            />
          )}
          {label[intl.locale]}
        </>
      }
      onChange={(opt) => {
        onChange(
          index,
          opt.map((o) => o.value),
          opt,
        );
      }}
      placeholder={intl.formatMessage(messages.placeholder)}
      options={items.filter((i) =>
        typeof i.value === 'object'
          ? Object.keys(i.value).length > 0
          : i.value.length > 0,
      )}
      isClearable={true}
      isSearchable={true}
      isMulti={multivalued}
      aria-controls="search-results-region"
    />
  ) : (
    <></>
  );
};

export default SelectWidget;
