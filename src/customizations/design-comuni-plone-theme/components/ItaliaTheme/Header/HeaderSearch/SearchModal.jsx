/* eslint-disable react-hooks/exhaustive-deps */
/*
CUSTOMIZATIONS:
- rimossi i vari tab di ricerca
*/
import React, { useState, useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import mapValues from 'lodash/mapValues';
import toPairs from 'lodash/toPairs';
import fromPairs from 'lodash/fromPairs';
import cx from 'classnames';
import moment from 'moment';

import qs from 'query-string';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Container,
  Row,
  Col,
  Button,
  ButtonToolbar,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  FormGroup,
  Input,
  Label,
  Toggle,
} from 'design-react-kit';

import { Icon } from 'design-comuni-plone-theme/components/ItaliaTheme';
import SearchUtils from 'volto-rer-search/components/Search/utils';

const { getSearchParamsURL, getBaseUrl } = SearchUtils;

const messages = defineMessages({
  closeSearch: {
    id: 'closeSearch',
    defaultMessage: 'Chiudi cerca',
  },
  search: {
    id: 'search',
    defaultMessage: 'Cerca',
  },
  searchLabel: {
    id: 'searchLabel',
    defaultMessage: 'Cerca nel sito',
  },
});

const SearchModal = ({ closeModal, show }) => {
  const intl = useIntl();

  const dispatch = useDispatch();
  const location = useLocation();

  const [searchableText, setSearchableText] = useState(
    qs.parse(location.search)?.SearchableText ?? '',
  );
  const subsite = useSelector((state) => state.subsite?.data);
  const inputRef = React.useRef(null);

  const baseUrl = getBaseUrl(subsite, intl.locale);
  const searchURL = getSearchParamsURL({
    searchableText,
    //filters: { path: baseUrl },
    baseUrl: baseUrl,
  });

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        inputRef.current && inputRef.current.focus(); //setta il focus sul campo di ricerca all'apertura della modale
      }, 100);
      document.body.classList.add('search-modal-opened'); //to prevent scroll body
    } else {
      document.body.classList.remove('search-modal-opened'); //re-enable scroll body
    }
  }, [show, inputRef]);

  const submitSearch = () => {
    setTimeout(() => {
      closeModal();
    }, 500);
  };

  const handleEnterSearch = (e) => {
    if (e.key === 'Enter') {
      submitSearch();

      if (__CLIENT__) {
        window.location.href = window.location.origin + searchURL;
      }
    }
  };

  return (
    <Modal
      wrapClassName="public-ui"
      id="search-modal"
      isOpen={show}
      toggle={closeModal}
    >
      <ModalHeader toggle={closeModal}>
        <Container>
          <div className="d-flex align-items-center">
            <Button
              color="link"
              title={intl.formatMessage(messages.closeSearch)}
              onClick={closeModal}
            >
              <Icon color="" icon="it-arrow-left-circle" padding={false} />
            </Button>

            <p className="modal-title-centered h1">
              {intl.formatMessage(messages.search)}
            </p>
          </div>
        </Container>
      </ModalHeader>
      <ModalBody>
        <Container>
          <div className="search-filters search-filters-text">
            <div className="form-group">
              <div className="input-group mb-3">
                <input
                  id="search-text"
                  type="text"
                  value={searchableText}
                  onChange={(e) => setSearchableText(e.target.value)}
                  onKeyDown={handleEnterSearch}
                  className="form-control"
                  placeholder={intl.formatMessage(messages.searchLabel)}
                  aria-label={intl.formatMessage(messages.searchLabel)}
                  aria-describedby="search-button"
                  ref={inputRef}
                />
                <a
                  href={searchURL}
                  onClick={submitSearch}
                  className="btn btn-link rounded-0 py-0"
                  title={intl.formatMessage(messages.search)}
                  id="search-button"
                  role="button"
                  tabIndex={0}
                >
                  <Icon icon="it-search" aria-hidden={true} size="sm" />
                </a>
              </div>
            </div>
          </div>

          <div className="search-filters text-center">
            <a
              href={searchURL}
              onClick={submitSearch}
              className="btn-icon btn btn-primary"
              title={intl.formatMessage(messages.search)}
              role="button"
              tabIndex={0}
            >
              <Icon icon="it-search" aria-hidden={true} size="sm" />
              <span className="ms-2">
                {intl.formatMessage(messages.search)}
              </span>
            </a>
          </div>
        </Container>
      </ModalBody>
    </Modal>
  );
};

export default SearchModal;
