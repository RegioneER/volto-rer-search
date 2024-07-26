import React from 'react';
import { useIntl, defineMessages } from 'react-intl';
import { SelectInput } from 'design-comuni-plone-theme/components';

const messages = defineMessages({
  placeholder: {
    id: 'keywordindex_placeholder',
    defaultMessage: 'seleziona un valore',
  },
});

const KeywordIndexWidget = ({
  index,
  value = [],
  label,
  onChange,
  items = {},
}) => {
  const intl = useIntl();
  const options = Object.keys(items).map((k) => {
    return { label: k + ' (' + items[k] + ')', value: k };
  });

  return options?.length > 0 ? (
    <SelectInput
      id={index}
      value={value?.map((v) => options.filter((o) => o.value === v)[0]) ?? []}
      label={label[intl.locale]}
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
      isMulti={true}
    />
  ) : (
    <></>
  );
};

export default KeywordIndexWidget;
