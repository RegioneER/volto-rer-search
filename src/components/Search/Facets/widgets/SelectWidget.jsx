import React from 'react';
import { useIntl, defineMessages } from 'react-intl';
import { SelectInput } from 'design-comuni-plone-theme/components';
import { Icon } from 'design-comuni-plone-theme/components/ItaliaTheme';

import './select-widget.scss';

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
  items = [],
  multivalued = true,
}) => {
  const intl = useIntl();
  let selectValue = [];
  if (multivalued) {
    if (!Array.isArray(value)) {
      value = [value];
    }
    selectValue =
      value?.map((v) => items.filter((o) => o.value === v)[0]) ?? [];
  } else {
    if (value?.length > 0) {
      selectValue = items.filter((o) => o.value === value);
    }
  }
  return items?.length > 0 ? (
    <div className="search-select-wrapper">
      {/* {index === 'Subject' && (  */}
        <span className="label-icon">
          <Icon
            icon="tags"
            color=""
            padding={false}
            size="xs"
            className="me-2"
            aria-hidden="true"
          />
        </span>
      {/* )} */}
      <SelectInput
        id={`select-${index}`}
        value={selectValue}
        label={label[intl.locale]}
        onChange={(opt) => {
          const v = multivalued ? opt.map((o) => o.value) : opt?.value ?? null;
          onChange(index, v, opt);
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
    </div>
  ) : (
    <></>
  );
};

export default SelectWidget;
