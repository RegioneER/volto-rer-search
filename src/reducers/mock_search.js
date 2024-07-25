export const mock = {
  items: [],
  facets: [
    {
      index: 'portal_type',
      items: [
        {
          advanced_filters: '',
          icon: '',
          label: {
            it: 'All content types',
          },
          value: [],
          total: 4,
        },
        {
          advanced_filters: '',
          icon: '',
          label: {
            en: '',
            it: 'Notizie',
          },
          value: ['News Item'],
        },
        {
          advanced_filters: 'events',
          icon: 'calendar-alt',
          label: {
            en: '',
            it: 'Eventi',
          },
          value: ['Event'],
        },
      ],
      label: {
        en: 'What',
        it: 'Cosa',
      },
      type: 'PortalType',
    },
    {
      index: 'Subject',
      items: {
        AAA: 1,
        BBB: 5,
        CCC: 6,
      },
      label: {
        en: '',
        it: 'Parole chiave',
      },
      type: 'KeywordIndex',
    },
  ],
};
