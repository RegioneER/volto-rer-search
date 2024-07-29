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
  const options = Object.keys(items).map((k) => {
    return { label: k + ' (' + items[k] + ')', value: k };
  });

  return options?.length > 0 ? (
    <SelectInput
      id={index}
      value={value?.map((v) => options.filter((o) => o.value === v)[0]) ?? []}
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
        );
      }}
      placeholder={intl.formatMessage(messages.placeholder)}
      options={options}
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
