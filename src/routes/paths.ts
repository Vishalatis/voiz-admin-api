import { paramCase } from 'src/utils/change-case';

import { _id, _postTitles } from 'src/_mock/assets';


// ----------------------------------------------------------------------

const MOCK_ID = _id[1];

const MOCK_TITLE = _postTitles[2];


const ROOTS = {
  AUTH: '/auth',
  AUTH_DEMO: '/auth-demo',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/error/403',
  page404: '/error/404',
  page500: '/error/500',
  components: '/components',
  docs: 'https://docs.minimals.cc',
  changelog: 'https://docs.minimals.cc/changelog',
  zoneUI: 'https://mui.com/store/items/zone-landing-page/',
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  freeUI: 'https://mui.com/store/items/minimal-dashboard-free/',
  figma:
    'https://www.figma.com/file/hjxMnGUJCjY7pX8lQbS7kn/%5BPreview%5D-Minimal-Web.v5.4.0?type=design&node-id=0-1&mode=design&t=2fxnS70DuiTLGzND-0',
  product: {
    root: `/product`,
    checkout: `/product/checkout`,
    details: (id: string) => `/product/${id}`,
    demo: {
      details: `/product/${MOCK_ID}`,
    },
  },
  post: {
    root: `/post`,
    // details: (title: string) => `/post/${paramCase(title)}`,
    // demo: {
    //   details: `/post/${paramCase(MOCK_TITLE)}`,
    // },
  },
  // AUTH
  auth: {
    amplify: {
      login: `${ROOTS.AUTH}/amplify/login`,
      verify: `${ROOTS.AUTH}/amplify/verify`,
      register: `${ROOTS.AUTH}/amplify/register`,
      newPassword: `${ROOTS.AUTH}/amplify/new-password`,
      forgotPassword: `${ROOTS.AUTH}/amplify/forgot-password`,
    },
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
    firebase: {
      login: `${ROOTS.AUTH}/firebase/login`,
      verify: `${ROOTS.AUTH}/firebase/verify`,
      register: `${ROOTS.AUTH}/firebase/register`,
      forgotPassword: `${ROOTS.AUTH}/firebase/forgot-password`,
    },
    auth0: {
      login: `${ROOTS.AUTH}/auth0/login`,
    },
    supabase: {
      login: `${ROOTS.AUTH}/supabase/login`,
      verify: `${ROOTS.AUTH}/supabase/verify`,
      register: `${ROOTS.AUTH}/supabase/register`,
      newPassword: `${ROOTS.AUTH}/supabase/new-password`,
      forgotPassword: `${ROOTS.AUTH}/supabase/forgot-password`,
    },
  },
  authDemo: {
    classic: {
      login: `${ROOTS.AUTH_DEMO}/classic/login`,
      register: `${ROOTS.AUTH_DEMO}/classic/register`,
      forgotPassword: `${ROOTS.AUTH_DEMO}/classic/forgot-password`,
      newPassword: `${ROOTS.AUTH_DEMO}/classic/new-password`,
      verify: `${ROOTS.AUTH_DEMO}/classic/verify`,
    },
    modern: {
      login: `${ROOTS.AUTH_DEMO}/modern/login`,
      register: `${ROOTS.AUTH_DEMO}/modern/register`,
      forgotPassword: `${ROOTS.AUTH_DEMO}/modern/forgot-password`,
      newPassword: `${ROOTS.AUTH_DEMO}/modern/new-password`,
      verify: `${ROOTS.AUTH_DEMO}/modern/verify`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,

    blank: `${ROOTS.DASHBOARD}/blank`,

    general: {
      app: `${ROOTS.DASHBOARD}/app`,
    },
    user: {
      root: `${ROOTS.DASHBOARD}/user`,

      list: `${ROOTS.DASHBOARD}/user/list`,

      profile: `${ROOTS.DASHBOARD}/user/profile`,
    },

    socialIssues: {
      root: `${ROOTS.DASHBOARD}/issues`,
      details: `${ROOTS.DASHBOARD}/issues/details`,
    },

    dailyNews: {
      root: `${ROOTS.DASHBOARD}/daily-news`,
      new: `${ROOTS.DASHBOARD}/daily-news/new`,
      // details: (id: string) => `${ROOTS.DASHBOARD}/daily-news/${id}`,
      // edit: (id: string) => `${ROOTS.DASHBOARD}/daily-news/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/daily-news/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/daily-news/${MOCK_ID}/edit`,
      },
    },

    LegislativeUpdates: {
      root: `${ROOTS.DASHBOARD}/legislative-updates`,
      createLegislative: `${ROOTS.DASHBOARD}/legislative-updates/create-legislative`,
    },

    publicPoll: {
      root: `${ROOTS.DASHBOARD}/public-poll`,
      new: `${ROOTS.DASHBOARD}/public-poll/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/public-poll/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/public-poll/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/public-poll/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/public-poll/${MOCK_ID}/edit`,
      },
    },

    votersSummary: {
      root: `${ROOTS.DASHBOARD}/voters-summary`,
      new: `${ROOTS.DASHBOARD}/voters-summary/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/voters-summary/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/voters-summary/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/voters-summary/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/voters-summary/${MOCK_ID}/edit`,
      },
    },

    opinionPoll: {
      root: `${ROOTS.DASHBOARD}/opinion-poll`,
      details: `${ROOTS.DASHBOARD}/opinion-poll/details`,
    },

    scheme: {
      root: `${ROOTS.DASHBOARD}/scheme`,
      new: `${ROOTS.DASHBOARD}/scheme/new`,
      details: (title: string) => `${ROOTS.DASHBOARD}/scheme/${paramCase(title)}`,
      edit: (title: string) => `${ROOTS.DASHBOARD}/scheme/${paramCase(title)}/edit`,
    },

    caseJourneyTracker: {
      root: `${ROOTS.DASHBOARD}/case-journey-tracker`,
      new: `${ROOTS.DASHBOARD}/case-journey-tracker/new`,
      // details: (title: string) => `${ROOTS.DASHBOARD}/case-journey-tracker/${paramCase(title)}`,
      // edit: (title: string) => `${ROOTS.DASHBOARD}/case-journey-tracker/${paramCase(title)}/edit`,
    },

    podcast: {
      root: `${ROOTS.DASHBOARD}/audio-podcast`,
      new: `${ROOTS.DASHBOARD}/audio-podcast/new`,
      details: (title: string) => `${ROOTS.DASHBOARD}/audio-podcast/${paramCase(title)}`,
      edit: (title: string) => `${ROOTS.DASHBOARD}/audio-podcast/${paramCase(title)}/edit`,
    },

    inDepthCaseStudy: {
      root: `${ROOTS.DASHBOARD}/in-depth-case-study`,
      createDepthCase: `${ROOTS.DASHBOARD}/in-depth-case-study/create-in-depth-case-study`,
    },
    accessManagement: {
      root: `${ROOTS.DASHBOARD}/access-management`,
      createAccessManagement: `${ROOTS.DASHBOARD}/access-management/create-access-management`,
    },
  },
};
