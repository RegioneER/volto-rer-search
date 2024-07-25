import React from 'react';
import { useIntl } from 'react-intl';
import { SelectInput } from 'design-comuni-plone-theme/components';

const KeywordIndexWidget = ({ index, value, label, onChange, items = {} }) => {
  const intl = useIntl();
  const options = Object.keys(items).map((k) => {
    return { label: k + ' (' + items[k] + ')', value: k };
  });

  return (
    <SelectInput
      id={index}
      value={value.map((v) => options.filter((o) => o.value === v)[0])}
      label={label[intl.locale]}
      onChange={(opt) => {
        console.log('onchange KeywordIndexWidget', opt);
        onChange(
          index,
          opt.map((o) => o.value),
        );
      }}
      options={options}
      isClearable={true}
      isSearchable={true}
      isMulti={true}
    />
  );
};

export default KeywordIndexWidget;
