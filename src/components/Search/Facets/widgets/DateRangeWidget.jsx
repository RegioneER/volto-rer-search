import React, { useState, useEffect } from 'react';
import { useIntl, defineMessages } from 'react-intl';
import { Icon } from 'design-comuni-plone-theme/components/ItaliaTheme';

import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const messages = defineMessages({
  startDate: {
    id: 'reresearch_startDate',
    defaultMessage: 'Dal',
  },
  endDate: {
    id: 'rersearch_endDate',
    defaultMessage: 'al',
  },
  calendarLabel: {
    id: 'dateRangePicker_calendarLabel',
    defaultMessage: 'Calendario',
  },
  roleDescription: {
    id: 'dateRangePicker_roleDescription',
    defaultMessage: 'Seleziona date',
  },
  closeDatePicker: {
    id: 'dateRangePicker_closeDatePicker',
    defaultMessage: 'Chiudi',
  },
  focusStartDate: {
    id: 'dateRangePicker_focusStartDate',
    defaultMessage:
      'Interagisci con il calendario e seleziona le date di inizio e/o fine',
  },
  clearDate: {
    id: 'dateRangePicker_clearDate',
    defaultMessage: 'Cancella la data',
  },
  clearDates: {
    id: 'dateRangePicker_clearDates',
    defaultMessage: 'Cancella le date',
  },
  jumpToPrevMonth: {
    id: 'dateRangePicker_jumpToPrevMonth',
    defaultMessage: 'Torna indietro per passare al mese precedente',
  },
  jumpToNextMonth: {
    id: 'dateRangePicker_jumpToNextMonth',
    defaultMessage: 'Via avanti per passare al mese successivo',
  },
  keyboardShortcuts: {
    id: 'dateRangePicker_keyboardShortcuts',
    defaultMessage: 'Tasti rapidi',
  },
  showKeyboardShortcutsPanel: {
    id: 'dateRangePicker_showKeyboardShortcutsPanel',
    defaultMessage: 'Apri il pannello dei tasti rapidi',
  },
  hideKeyboardShortcutsPanel: {
    id: 'dateRangePicker_hideKeyboardShortcutsPanel',
    defaultMessage: 'Chiudi il pannello dei tasti rapidi',
  },
  openThisPanel: {
    id: 'dateRangePicker_openThisPanel',
    defaultMessage: 'Apri questo pannello.',
  },
  enterKey: {
    id: 'dateRangePicker_enterKey',
    defaultMessage: 'Tasto invio',
  },
  leftArrowRightArrow: {
    id: 'dateRangePicker_leftArrowRightArrow',
    defaultMessage: 'Tasti freccia destra e sinistra',
  },
  upArrowDownArrow: {
    id: 'dateRangePicker_upArrowDownArrow',
    defaultMessage: 'Tasti freccia su e giu',
  },
  pageUpPageDown: {
    id: 'dateRangePicker_pageUpPageDown',
    defaultMessage: 'Tasti pagina su e giu',
  },
  homeEnd: {
    id: 'dateRangePicker_homeEnd',
    defaultMessage: 'Tasti inizio e fine',
  },
  escape: {
    id: 'dateRangePicker_escape',
    defaultMessage: 'Tasto Esc',
  },
  questionMark: {
    id: 'dateRangePicker_questionMark',
    defaultMessage: 'Punto interrogativo',
  },
  selectFocusedDate: {
    id: 'dateRangePicker_selectFocusedDate',
    defaultMessage: 'Seleziona la data evidenziata',
  },
  moveFocusByOneDay: {
    id: 'dateRangePicker_moveFocusByOneDay',
    defaultMessage:
      'Spostati indietro (sinistra) e avanti (destra) di un giorno.',
  },
  moveFocusByOneWeek: {
    id: 'dateRangePicker_moveFocusByOneWeek',
    defaultMessage: 'Spostati indietro (su) e avanti (giu) di una settimana.',
  },
  moveFocusByOneMonth: {
    id: 'dateRangePicker_moveFocusByOneMonth',
    defaultMessage: 'Cambia mese',
  },

  moveFocustoStartAndEndOfWeek: {
    id: 'dateRangePicker_moveFocustoStartAndEndOfWeek',
    defaultMessage: "Vai al primo o all'ultimo giorno della settimana",
  },
  returnFocusToInput: {
    id: 'dateRangePicker_returnFocusToInput',
    defaultMessage: 'Torna al campo di inserimento data',
  },
  keyboardForwardNavigationInstructions: {
    id: 'dateRangePicker_keyboardForwardNavigationInstructions',
    defaultMessage:
      "Naviga avanti per interagire con il calendario e selezionare una data. Premi il pulsante 'punto interrogativo' per conoscere i tasti rapidi per modificare le date.",
  },
  keyboardBackwardNavigationInstructions: {
    id: 'dateRangePicker_keyboardBackwardNavigationInstructions',
    defaultMessage:
      "Naviga indietro per interagire con il calendario e selezionare una data. Premi il pulsante 'punto interrogativo' per conoscere i tasti rapidi per modificare le date.",
  },
  choose: {
    id: 'dateRangePicker_choose',
    defaultMessage: 'Scegli',
  },
});

const getDateRangePickerPhrases = (intl) => {
  return {
    calendarLabel: intl.formatMessage(messages.calendarLabel),
    roleDescription: intl.formatMessage(messages.roleDescription),
    closeDatePicker: intl.formatMessage(messages.closeDatePicker),
    clearDates: intl.formatMessage(messages.clearDates),
    focusStartDate: intl.formatMessage(messages.focusStartDate),
    jumpToPrevMonth: intl.formatMessage(messages.jumpToPrevMonth),
    jumpToNextMonth: intl.formatMessage(messages.jumpToNextMonth),
    keyboardShortcuts: intl.formatMessage(messages.keyboardShortcuts),
    showKeyboardShortcutsPanel: intl.formatMessage(
      messages.showKeyboardShortcutsPanel,
    ),
    hideKeyboardShortcutsPanel: intl.formatMessage(
      messages.hideKeyboardShortcutsPanel,
    ),
    openThisPanel: intl.formatMessage(messages.openThisPanel),
    enterKey: intl.formatMessage(messages.enterKey),
    leftArrowRightArrow: intl.formatMessage(messages.leftArrowRightArrow),
    upArrowDownArrow: intl.formatMessage(messages.upArrowDownArrow),
    pageUpPageDown: intl.formatMessage(messages.pageUpPageDown),
    homeEnd: intl.formatMessage(messages.homeEnd),
    escape: intl.formatMessage(messages.escape),
    questionMark: intl.formatMessage(messages.questionMark),
    selectFocusedDate: intl.formatMessage(messages.selectFocusedDate),
    moveFocusByOneDay: intl.formatMessage(messages.moveFocusByOneDay),
    moveFocusByOneWeek: intl.formatMessage(messages.moveFocusByOneWeek),
    moveFocusByOneMonth: intl.formatMessage(messages.moveFocusByOneMonth),
    moveFocustoStartAndEndOfWeek: intl.formatMessage(
      messages.moveFocustoStartAndEndOfWeek,
    ),
    returnFocusToInput: intl.formatMessage(messages.returnFocusToInput),
    keyboardForwardNavigationInstructions: intl.formatMessage(
      messages.keyboardForwardNavigationInstructions,
    ),
    keyboardBackwardNavigationInstructions: intl.formatMessage(
      messages.keyboardBackwardNavigationInstructions,
    ),
  };
};

const DateRangeWidget = (props) => {
  const intl = useIntl();
  const [focusedDateInput, setFocusedDateInput] = useState(null);
  const {
    value,
    index,
    onChange,
    reactDates,
    label,
    defaultStart,
    defaultEnd,
    label_start,
    label_end,
    index_start,
    index_end,
    moment: momentlib,
    ...rest
  } = props;
  const id = index;
  const { DateRangePicker } = reactDates;

  const moment = momentlib.default;
  moment.locale(intl.locale);

  let isMobile = false;
  if (__CLIENT__) isMobile = window && window.innerWidth < 992;

  const start_input_id = index + 'start-date-filter';
  const end_input_id = index + 'end-date-filter';

  useEffect(() => {
    let startDateInput = document.getElementById(start_input_id);

    if (startDateInput) {
      let removeStartDateListener = startDateInput.addEventListener(
        'keydown',
        (e) => {
          if (e.key === 'Tab' && e.shiftKey) setFocusedDateInput(null);
        },
      );

      if (removeStartDateListener) return () => removeStartDateListener();
    }
  }, []);

  useEffect(() => {
    let endDateInput = document.getElementById(end_input_id);

    if (endDateInput) {
      let removeEndDateListener = endDateInput.addEventListener(
        'keydown',
        (e) => {
          if (e.key === 'Tab' && !e.shiftKey) setFocusedDateInput(null);
        },
      );

      if (removeEndDateListener) return () => removeEndDateListener();
    }
  }, []);

  const onDatesChange = ({ startDate, endDate }) => {
    const rangeStart = startDate || defaultStart;
    const rangeEnd = endDate || defaultEnd;
    const start = rangeStart
      ? rangeStart.startOf('day').format('YYYY-MM-DD HH:mm')
      : null;
    const end = rangeEnd
      ? rangeEnd.endOf('day').format('YYYY-MM-DD HH:mm')
      : null;

    let v = {};

    //se vengono passati due indici diversi per i campi di start e di end
    if (index_start || index_end) {
      if (start) {
        v[index_start] = {
          range: 'min',
          query: start,
        };
        // if (end) {
        //   v[index_start] = {
        //     range: 'min:max',
        //     query: [start, end],
        //   };
        // }
      }

      if (end) {
        v[index_end] = {
          range: 'max',
          query: end,
        };
        // if (start) {
        //   v[index_end] = {
        //     range: 'min:max',
        //     query: [start, end],
        //   };
        // }
      }
    }
    //se viene passato un solo indice su cui fare la ricerca
    else if (index) {
      if (start && end) {
        v[index] = {
          range: 'min:max',
          query: [start, end],
        };
      } else if (start) {
        v[index] = {
          range: 'min',
          query: start,
        };
      } else if (end) {
        v[index] = {
          range: 'max',
          query: end,
        };
      }
    }

    onChange(v);
  };

  return (
    <fieldset className="filter-daterange">
      {label?.[intl.locale] && <label>{label[intl.locale]}</label>}
      <div className="me-lg-3 my-2 my-lg-1 filter-wrapper date-filter">
        <DateRangePicker
          {...rest}
          startDate={value?.startDate || defaultStart}
          startDateId={start_input_id}
          startDatePlaceholderText={
            label_start?.[intl.locale] ?? intl.formatMessage(messages.startDate)
          }
          endDate={value?.endDate || defaultEnd}
          endDateId={end_input_id}
          endDatePlaceholderText={
            label_end?.[intl.locale] ?? intl.formatMessage(messages.endDate)
          }
          onDatesChange={onDatesChange}
          noBorder={true}
          numberOfMonths={isMobile ? 1 : 2}
          minimumNights={0}
          focusedInput={focusedDateInput}
          onFocusChange={(focusedInput) => setFocusedDateInput(focusedInput)}
          displayFormat={moment.localeData(intl.locale).longDateFormat('L')}
          hideKeyboardShortcutsPanel={true}
          showClearDates
          phrases={getDateRangePickerPhrases(intl)}
          customArrowIcon={
            <Icon
              icon="it-arrow-right"
              color="white"
              title={intl.formatMessage(messages.roleDescription)}
            />
          }
          customCloseIcon={
            <Icon
              icon="it-close"
              color="white"
              title={intl.formatMessage(messages.clearDates)}
            />
          }
        />
      </div>
    </fieldset>
  );
};

export default injectLazyLibs(['reactDates', 'moment'])(DateRangeWidget);
