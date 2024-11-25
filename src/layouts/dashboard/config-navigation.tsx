import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';

import SvgColor from 'src/components/svg-color';
import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useTranslate();

  const { user } = useAuthContext();
  const userRole = user?.role;

  console.log(userRole);

  

  const data = useMemo(() => {

 

    if (userRole === 'admin') {
      return [
     
        // OVERVIEW
        // ----------------------------------------------------------------------
        {
          subheader: t('overview'),
          items: [
            {
              title: t('app'),
              path: paths.dashboard.root,
              icon: ICONS.dashboard,
            },
          ],
        },
  
        // MANAGEMENT
        // ----------------------------------------------------------------------
        {
          subheader: t('management'),
          items: [
            // USER
            {
              title: t('user'),
              path: paths.dashboard.user.root,
              icon: ICONS.user,
              children: [{ title: t('list'), path: paths.dashboard.user.list }],
            },
  
            // Issues
            { title: ' Issues', path: paths.dashboard.socialIssues.root, icon: ICONS.tour },
  
            // Daily News
            {
              title: t('Daily News'),
              path: paths.dashboard.dailyNews.root,
              icon: ICONS.blog,
              children: [
                { title: t('create News'), path: paths.dashboard.dailyNews.new },
                { title: t('News List'), path: paths.dashboard.dailyNews.root },
              ],
            },
  
            {
              title: 'Legislative Updates',
              path: paths.dashboard.LegislativeUpdates.root,
              icon: ICONS.banking,
              children: [
                { title: 'Legislative List', path: paths.dashboard.LegislativeUpdates.root },
                {
                  title: 'Create Legislative',
                  path: paths.dashboard.LegislativeUpdates.createLegislative,
                },
              ],
            },
  
            // Public Poll
            {
              title: t('Public Poll'),
              path: paths.dashboard.publicPoll.root,
              icon: ICONS.user,
              children: [
                { title: t('create Public Poll'), path: paths.dashboard.publicPoll.new },
                { title: t('Poll List'), path: paths.dashboard.publicPoll.root },
              ],
            },
  
            // Voters Summary
            {
              title: t('Voters Summary'),
              path: paths.dashboard.votersSummary.root,
              icon: ICONS.analytics,
              children: [
                { title: t('create Voters'), path: paths.dashboard.votersSummary.new },
                { title: t('Voters list'), path: paths.dashboard.votersSummary.root },
              ],
            },
  
            // Opinion Poll
  
            { title: 'Opinion Poll', path: paths.dashboard.opinionPoll.root, icon: ICONS.blog },
  
            // Scheme Update
            {
              title: t('Schemes Update'),
              path: paths.dashboard.scheme.root,
              icon: ICONS.tour,
              children: [
                { title: t('Create scheme'), path: paths.dashboard.scheme.new },
                { title: t('scheme list'), path: paths.dashboard.scheme.root },
              ],
            },
  
            // Case Journey Tracker
  
            {
              title: t('Case Journey Tracker'),
              path: paths.dashboard.scheme.root,
              icon: ICONS.folder,
              children: [
                { title: t('Create Case'), path: paths.dashboard.caseJourneyTracker.new },
                { title: t('Case list'), path: paths.dashboard.caseJourneyTracker.root },
              ],
            },
  
            // Audio Podcast
            {
              title: t('Audio Podcast'),
              path: paths.dashboard.podcast.root,
              icon: ICONS.blog,
              children: [
                { title: t('create Podcast'), path: paths.dashboard.podcast.new },
                { title: t(' Podcast list'), path: paths.dashboard.podcast.root },
              ],
            },
  
            {
              title: 'In Depth Case Studies',
              path: paths.dashboard.inDepthCaseStudy.root,
              icon: ICONS.folder,
              children: [
                { title: 'Case List', path: paths.dashboard.inDepthCaseStudy.root },
                {
                  title: 'Create Case',
                  path: paths.dashboard.inDepthCaseStudy.createDepthCase,
                },
              ],
            },
  
            {
              title: 'Access Management',
              path: paths.dashboard.accessManagement.root,
              icon: ICONS.folder,
              children: [
                { title: 'Access List', path: paths.dashboard.accessManagement.root },
                {
                  title: 'Create Access',
                  path: paths.dashboard.accessManagement.createAccessManagement,
                },
              ],
            }
          ],
        },
     
      ]
    }

    if (userRole !== 'admin') {
      // Return only 3 specific nav items for 'wardcommissioner'
      return [
        {
          subheader: t('overview'),
          items: [
            {
              title: t('app'),
              path: paths.dashboard.root,
              icon: ICONS.dashboard,
            },
          ],
        },
        {
          subheader: t('management'),
          items: [
            { title: 'Issues', path: paths.dashboard.socialIssues.root, icon: ICONS.tour },

               // Public Poll
               {
                title: t('Public Poll'),
                path: paths.dashboard.publicPoll.root,
                icon: ICONS.user,
                children: [
                  // { title: t('create Public Poll'), path: paths.dashboard.publicPoll.new },
                  { title: t('Poll List'), path: paths.dashboard.publicPoll.root },
                ],
              },
    
              // Voters Summary
              {
                title: t('Voters Summary'),
                path: paths.dashboard.votersSummary.root,
                icon: ICONS.analytics,
                children: [
                  // { title: t('create Voters'), path: paths.dashboard.votersSummary.new },
                  { title: t('Voters list'), path: paths.dashboard.votersSummary.root },
                ],
              },

              { title: 'Opinion Poll', path: paths.dashboard.opinionPoll.root, icon: ICONS.blog },
  
     
          ],
        },
      ];
    }

    // Default case: return an empty array or a default set of nav items
    return [];
  }, [t, userRole]);

  return data;
}
