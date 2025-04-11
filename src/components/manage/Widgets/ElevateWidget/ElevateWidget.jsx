import React, { useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Icon, Grid, Menu, Form, Button, Segment } from 'semantic-ui-react';

import { usePreventClick } from 'volto-rer-search/helpers';

import ElevateEntryConfiguration from './ElevateEntryConfiguration';
import './elevate-widget.css';

const messages = defineMessages({
  no_elevate_settings: {
    id: 'elevate-widget_no_elevate_settings',
    defaultMessage: 'Nessuna configurazione di elevate',
  },
  elevate_group_selection: {
    id: 'elevate-widget_elevate_group_selection',
    defaultMessage: "Seleziona una configurazione per l'elevate",
  },
  elevate: {
    id: 'elevate-widget_elevate',
    defaultMessage: 'Elevate',
  },
  moveItemUp: {
    id: 'elevate-widget_moveItemUp',
    defaultMessage: 'Sposta prima',
  },
  moveItemDown: {
    id: 'elevate-widget_moveItemDown',
    defaultMessage: 'Sposta dopo',
  },
  addItem: {
    id: 'elevate-widget_addItem',
    defaultMessage: 'Aggiungi un gruppo',
  },
  group_content: {
    id: 'elevate-widget_group_content',
    defaultMessage: 'Contenuto del gruppo',
  },
  noActiveGroups: {
    id: 'elevate-widget_no_active_groups',
    defaultMessage: 'Nessun gruppo selezionato.',
  },
});

const defaultItem = {
  keywords: [],
  'elevated-contents': [],
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
  const [elevate, setElevate] = useState(
    value ? JSON.parse(value) : [defaultItem],
  ); //ToDo: usare value
  const [activeItem, setActiveItem] = useState(0);
  usePreventClick('.elevate-widget .ui.vertical.menu');

  const handleChange = (v) => {
    setElevate(v);
    onChange(id, JSON.stringify(v));
  };

  const addItem = (e) => {
    e.preventDefault();
    const new_conf = [...elevate, defaultItem];
    setElevate(new_conf);
    setActiveItem(new_conf.length - 1);
  };

  const removeItem = (e, index) => {
    e.preventDefault();
    let new_conf = [...elevate];
    new_conf.splice(index, 1);

    if (new_conf.length === 0) {
      new_conf = [defaultItem];
    }

    if (activeItem === index) {
      setTimeout(() => setActiveItem(index > 0 ? index - 1 : 0), 0);
    }

    handleChange(new_conf);
  };

  const moveItem = (e, index, direction) => {
    e.preventDefault();
    const up = direction === 'up';
    let new_conf = [...elevate];

    let item = new_conf[index];
    new_conf.splice(index, 1);
    new_conf.splice(index + (up ? -1 : 1), 0, item);

    handleChange(new_conf);
  };

  return (
    <div>
      <Form.Field inline id={id}>
        <Grid>
          <Grid.Row>
            <Grid.Column width="12">
              <div className="wrapper">
                <label htmlFor="elevate-settings">{title}</label>
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
            <Grid.Column width="12" className="elevate-widget">
              <div id="elevate-settings">
                <Segment>
                  {elevate.length ? (
                    <Grid>
                      <Grid.Column width={4}>
                        <Menu
                          fluid
                          vertical
                          tabular
                          className="elevate-settings-menu"
                          role="region"
                          aria-label={intl.formatMessage(
                            messages.elevate_group_selection,
                          )}
                        >
                          {elevate?.map((item, idx) => {
                            const itemTitle =
                              intl.formatMessage(messages.elevate) +
                              ' ' +
                              (idx + 1) +
                              ' - ' +
                              (item.keywords?.length > 0
                                ? item.keywords.join(', ')
                                : '');
                            return (
                              <Menu.Item
                                key={`elevate-item-${idx}`}
                                name={itemTitle}
                                active={activeItem === idx}
                                onClick={() => setActiveItem(idx)}
                                aria-controls={'elevate-config-content'}
                                as="button"
                                aria-expanded={activeItem === idx}
                                aria-label={itemTitle}
                              >
                                <Button.Group
                                  vertical
                                  className="move-buttons"
                                  key={`elevate-item-${idx}-buttons`}
                                  id={`elevate-item-${idx}-buttons`}
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
                                    disabled={idx === elevate.length - 1}
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
                          id="elevate-config-content"
                          role="region"
                          aria-label={intl.formatMessage(
                            messages.group_content,
                          )}
                        >
                          {elevate.length && elevate[activeItem] ? (
                            <ElevateEntryConfiguration
                              index={activeItem}
                              item={elevate[activeItem]}
                              onChange={(item) => {
                                let new_elevate = [...elevate];
                                new_elevate[activeItem] = item;

                                handleChange(new_elevate);
                              }}
                              deleteItem={(e) => removeItem(e, activeItem)}
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
                    <span>
                      {intl.formatMessage(messages.no_elevate_settings)}
                    </span>
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
