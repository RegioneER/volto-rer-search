import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';
import { Icon, Grid, Menu, Form, Button, Segment } from 'semantic-ui-react';
import { getVocabulary } from '@plone/volto/actions';
import { INDEXES_VOCABULARY } from 'volto-rer-search/helpers/constants';
import IndexConfiguration from './IndexConfiguration';
import './available-indexes-widget.css';

const messages = defineMessages({
  no_items: {
    id: 'available-indexes-widget_no_items',
    defaultMessage: 'Nessun gruppo',
  },
  index_selection: {
    id: 'available-indexes-widget_index_selection',
    defaultMessage: "Seleziona l'indice",
  },
  index: {
    id: 'available-indexes-widget_index',
    defaultMessage: 'Indice',
  },
  no_title: {
    id: 'available-indexes-widget_no_title',
    defaultMessage: 'Senza titolo',
  },
  moveItemUp: {
    id: 'available-indexes-widget_moveItemUp',
    defaultMessage: 'Sposta prima',
  },
  moveItemDown: {
    id: 'available-indexes-widget_moveItemDown',
    defaultMessage: 'Sposta dopo',
  },
  addItem: {
    id: 'available-indexes-widget_addItem',
    defaultMessage: 'Aggiungi un indice',
  },
  index_content: {
    id: 'available-indexes-widget_index_content',
    defaultMessage: "Contenuto dell'indice",
  },
  noActiveIndexes: {
    id: 'available-indexes-widget_no_active_items',
    defaultMessage: 'Nessun indice selezionato.',
  },
});
const defaultItem = {
  title: 'Nuovo indice',
  index: null,
  label: { it: '', en: '' },
};
const AvailableIndexesWidget = ({
  value,
  id,
  onChange,
  required,
  title,
  description,
}) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [items, setItems] = useState(JSON.parse(value) ?? [defaultItem]);
  const [activeItem, setActiveItem] = useState(0);

  const indexes = useSelector(
    (state) =>
      state.vocabularies[INDEXES_VOCABULARY] &&
      state.vocabularies[INDEXES_VOCABULARY].items
        ? state.vocabularies[INDEXES_VOCABULARY].items
        : [],
    shallowEqual,
  );
  const handleChange = (v) => {
    setItems(v);
    onChange(id, JSON.stringify(v));
  };

  const addItem = (e) => {
    e?.preventDefault();
    const new_items = [...items, defaultItem];
    setItems(new_items);
    setActiveItem(new_items.length - 1);
  };

  const removeItem = (e, index) => {
    e.preventDefault();
    let new_items = [...items];
    new_items.splice(index, 1);

    if (activeItem === index) {
      setTimeout(() => setActiveItem(index > 0 ? index - 1 : 0), 0);
    }

    handleChange(new_items);
  };

  const moveItem = (e, index, direction) => {
    e.preventDefault();
    const up = direction === 'up';
    let new_items = [...items];

    let item = new_items[index];
    new_items.splice(index, 1);
    new_items.splice(index + (up ? -1 : 1), 0, item);

    handleChange(new_items);
  };

  useEffect(() => {
    if ((indexes ?? [])?.length == 0) {
      dispatch(
        getVocabulary({
          vocabNameOrURL: INDEXES_VOCABULARY,
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
                <label htmlFor="available-indexes">{title}</label>
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
            <Grid.Column width="12" className="available-indexes-widget">
              <div id="available-indexes">
                <Segment>
                  {items.length ? (
                    <Grid>
                      <Grid.Column width={4}>
                        <Menu
                          fluid
                          vertical
                          tabular
                          className="available-indexes-menu"
                          role="region"
                          aria-label={intl.formatMessage(
                            messages.index_selection,
                          )}
                        >
                          {items?.map((item, idx) => (
                            <Menu.Item
                              key={`index-item-${idx}`}
                              name={item.title}
                              active={activeItem === idx}
                              onClick={() => setActiveItem(idx)}
                              aria-controls={'index-config-content'}
                              as="button"
                              aria-expanded={activeItem === idx}
                              aria-label={
                                intl.formatMessage(messages.index) +
                                ' ' +
                                (idx + 1) +
                                ' ' +
                                (item.label?.it ??
                                  intl.formatMessage(messages.no_title))
                              }
                            >
                              <Button.Group
                                vertical
                                className="move-buttons"
                                key={`index-item-${idx}-buttons`}
                                id={`index-item-${idx}-buttons`}
                                name={item.title}
                                active={activeItem === idx}
                                onClick={() => setActiveItem(idx)}
                                aria-label={
                                  intl.formatMessage(messages.index) +
                                  ' ' +
                                  (idx + 1) +
                                  ' ' +
                                  (item.label?.it ??
                                    intl.formatMessage(messages.no_title))
                                }
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
                                  disabled={idx === items.length - 1}
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
                              <span>
                                {intl.formatMessage(messages.index)} {idx + 1} -{' '}
                                {item.label?.it ??
                                  intl.formatMessage(messages.no_title)}
                              </span>
                            </Menu.Item>
                          ))}
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
                        {activeItem > -1 && activeItem < items?.length ? (
                          <div
                            id="index-config-content"
                            role="region"
                            aria-label={intl.formatMessage(
                              messages.index_content,
                            )}
                            key={'item-config' + activeItem}
                          >
                            <IndexConfiguration
                              key={'index-configuration' + activeItem}
                              index={activeItem}
                              item={items[activeItem]}
                              onChange={(el) => {
                                let new_items = [...items];
                                new_items[activeItem] = el;

                                handleChange(new_items);
                              }}
                              deleteItem={(e) => removeItem(e, activeItem)}
                              indexes={indexes}
                              key={'index-config' + activeItem}
                            />
                          </div>
                        ) : (
                          <span>
                            {intl.formatMessage(messages.noActiveIndexes)}
                          </span>
                        )}
                      </Grid.Column>
                    </Grid>
                  ) : (
                    <span>{intl.formatMessage(messages.no_items)}</span>
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

export default AvailableIndexesWidget;
