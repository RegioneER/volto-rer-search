import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';
import { Icon, Grid, Menu, Form, Button, Segment } from 'semantic-ui-react';
import { getVocabulary } from '@plone/volto/actions';
import {
  GROUPING_TYPES_VOCABULARY,
  ADVANCED_FILTERS_VOCABULARY,
} from 'volto-rer-search/helpers/constants';

import { usePreventClick } from 'volto-rer-search/helpers';

import GroupConfiguration from './GroupConfiguration';
import './types-grouping-widget.css';

const messages = defineMessages({
  no_groups: {
    id: 'types-grouping-widget_no_groups',
    defaultMessage: 'Nessun gruppo',
  },
  group_selection: {
    id: 'types-grouping-widget_group_selection',
    defaultMessage: 'Seleziona il gruppo',
  },
  group: {
    id: 'types-grouping-widget_group',
    defaultMessage: 'Gruppo',
  },
  no_title: {
    id: 'types-grouping-widget_no_title',
    defaultMessage: 'Senza titolo',
  },
  moveItemUp: {
    id: 'types-grouping-widget_moveItemUp',
    defaultMessage: 'Sposta prima',
  },
  moveItemDown: {
    id: 'types-grouping-widget_moveItemDown',
    defaultMessage: 'Sposta dopo',
  },
  addItem: {
    id: 'types-grouping-widget_addItem',
    defaultMessage: 'Aggiungi un gruppo',
  },
  group_content: {
    id: 'types-grouping-widget_group_content',
    defaultMessage: 'Contenuto del gruppo',
  },
  noActiveGroups: {
    id: 'types-grouping-widget_no_active_groups',
    defaultMessage: 'Nessun gruppo selezionato.',
  },
});

const defaultItem = {
  label: { it: '', en: '' },
  portal_type: [],
};

const TypesGroupingWidget = ({
  value,
  id,
  onChange,
  required,
  title,
  description,
}) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [groups, setGroups] = useState(JSON.parse(value) ?? [defaultItem]); //ToDo: usare value
  const [activeItem, setActiveItem] = useState(0);
  usePreventClick('.types-grouping-widget .ui.vertical.menu');

  const portal_types = useSelector(
    (state) =>
      state.vocabularies[GROUPING_TYPES_VOCABULARY] &&
      state.vocabularies[GROUPING_TYPES_VOCABULARY].items
        ? state.vocabularies[GROUPING_TYPES_VOCABULARY].items
        : [],
    shallowEqual,
  );

  const advanced_filters = useSelector(
    (state) =>
      state.vocabularies[ADVANCED_FILTERS_VOCABULARY] &&
      state.vocabularies[ADVANCED_FILTERS_VOCABULARY].items
        ? state.vocabularies[ADVANCED_FILTERS_VOCABULARY].items
        : [],
    shallowEqual,
  );

  const handleChange = (v) => {
    setGroups(v);
    onChange(id, JSON.stringify(v));
  };

  const addItem = (e) => {
    e.preventDefault();
    const new_groups = [...groups, defaultItem];
    setGroups(new_groups);
    setActiveItem(new_groups.length - 1);
  };

  const removeItem = (e, index) => {
    e.preventDefault();
    let new_groups = [...groups];
    new_groups.splice(index, 1);

    if (activeItem === index) {
      setTimeout(() => setActiveItem(index > 0 ? index - 1 : 0), 0);
    }

    handleChange(new_groups);
  };

  const moveItem = (e, index, direction) => {
    e.preventDefault();
    const up = direction === 'up';
    let new_groups = [...groups];

    let item = new_groups[index];
    new_groups.splice(index, 1);
    new_groups.splice(index + (up ? -1 : 1), 0, item);

    handleChange(new_groups);
  };

  useEffect(() => {
    if ((portal_types ?? [])?.length === 0) {
      dispatch(
        getVocabulary({
          vocabNameOrURL: GROUPING_TYPES_VOCABULARY,
        }),
      ); //
    }
    if ((advanced_filters ?? [])?.length === 0) {
      dispatch(
        getVocabulary({
          vocabNameOrURL: ADVANCED_FILTERS_VOCABULARY,
        }),
      );
    }
  }, []);
  return (
    <div>
      <Form.Field inline id={id}>
        <Grid>
          <Grid.Row>
            <Grid.Column width="12">
              <div className="wrapper">
                <label htmlFor="types-grouping">{title}</label>
              </div>
            </Grid.Column>
          </Grid.Row>
          {description && (
            <Grid.Row>
              <Grid.Column stretched width="12">
                <p className="help">{description}</p>
              </Grid.Column>
            </Grid.Row>
          )}
          <Grid.Row>
            <Grid.Column width="12" className="types-grouping-widget">
              <div id="types-grouping">
                <Segment>
                  {groups.length ? (
                    <Grid>
                      <Grid.Column width={4}>
                        <Menu
                          fluid
                          vertical
                          tabular
                          className="types-grouping-menu"
                          role="region"
                          aria-label={intl.formatMessage(
                            messages.group_selection,
                          )}
                        >
                          {groups?.map((item, idx) => {
                            const itemTitle =
                              intl.formatMessage(messages.group) +
                              ' ' +
                              (idx + 1) +
                              ' - ' +
                              (item.label?.it?.length > 0
                                ? item.label.it
                                : intl.formatMessage(messages.no_title));
                            return (
                              <Menu.Item
                                key={`group-item-${idx}`}
                                name={itemTitle}
                                active={activeItem === idx}
                                onClick={() => setActiveItem(idx)}
                                aria-controls={'group-config-content'}
                                as="button"
                                aria-expanded={activeItem === idx}
                                aria-label={itemTitle}
                              >
                                <Button.Group
                                  vertical
                                  className="move-buttons"
                                  key={`group-item-${idx}-buttons`}
                                  id={`group-item-${idx}-buttons`}
                                  name={item.title}
                                  active={activeItem === idx}
                                  onClick={() => setActiveItem(idx)}
                                  aria-label={itemTitle}
                                >
                                  <Button
                                    disabled={idx === 0}
                                    size="tiny"
                                    icon={<Icon name="arrow left" />}
                                    title={intl.formatMessage(
                                      messages.moveItemUp,
                                    )}
                                    onClick={(e) => moveItem(e, idx, 'up')}
                                  />
                                  <Button
                                    disabled={idx === groups.length - 1}
                                    size="tiny"
                                    icon={<Icon name="arrow right" />}
                                    title={intl.formatMessage(
                                      messages.moveItemDown,
                                    )}
                                    onClick={(e) =>
                                      moveItem(e, activeFooter, idx, 'down')
                                    }
                                  />
                                </Button.Group>
                                <span>{itemTitle}</span>
                              </Menu.Item>
                            );
                          })}
                          <Menu.Item
                            as={'button'}
                            name={intl.formatMessage(messages.addItem)}
                            aria-label={intl.formatMessage(messages.addItem)}
                            onClick={(e) => addItem(e)}
                          >
                            <Icon name="plus" />
                          </Menu.Item>
                        </Menu>
                      </Grid.Column>
                      <Grid.Column stretched width={8}>
                        <div
                          id="group-config-content"
                          role="region"
                          aria-label={intl.formatMessage(
                            messages.group_content,
                          )}
                        >
                          {groups.length && groups[activeItem] ? (
                            <GroupConfiguration
                              index={activeItem}
                              item={groups[activeItem]}
                              onChange={(group) => {
                                let new_groups = [...groups];
                                new_groups[activeItem] = group;

                                handleChange(new_groups);
                              }}
                              deleteItem={(e) => removeItem(e, activeItem)}
                              portal_types={portal_types}
                              advanced_filters={advanced_filters}
                            />
                          ) : (
                            <span>
                              {intl.formatMessage(messages.noActiveGroups)}
                            </span>
                          )}
                        </div>
                      </Grid.Column>
                    </Grid>
                  ) : (
                    <span>{intl.formatMessage(messages.no_groups)}</span>
                  )}
                </Segment>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form.Field>
    </div>
  );
};

export default TypesGroupingWidget;
