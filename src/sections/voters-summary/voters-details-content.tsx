import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { fDate } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';

import { IVotersItem } from 'src/types/voters';

// ----------------------------------------------------------------------

type Props = {
  voters: IVotersItem;
};

export default function VotersSummaryDetailsContent({ voters }: Props) {
  const { createdAt, expiredDate } = voters;

  const renderContent = (
    <Stack component={Card} spacing={3} sx={{ p: 3 }}>
      <Typography variant="h4">BJP</Typography>

      <Typography variant="subtitle2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut ad eaque illum provident sint
        autem suscipit. Nostrum, repellendus beatae id omnis cupiditate iusto, neque aliquam
        explicabo, modi fugiat quas obcaecati culpa corrupti. Recusandae enim vero inventore quasi,
        saepe magnam perspiciatis.
      </Typography>
    </Stack>
  );

  const renderOverview = (
    <Stack component={Card} spacing={2} sx={{ p: 3 }}>
      {[
        {
          label: 'Date Posted',
          value: fDate(createdAt),
          icon: <Iconify icon="solar:calendar-date-bold" />,
        },
        {
          label: 'Voting date',
          value: fDate(expiredDate),
          icon: <Iconify icon="solar:calendar-date-bold" />,
        },
        {
          label: 'Regions',
          value: 'BJP',
          icon: <Iconify icon="solar:clock-circle-bold" />,
        },
        {
          label: 'Country',
          value: 'India',
          icon: <Iconify icon="solar:flag-bold" />,
        },
        {
          label: 'State',
          value: 'Maharashtra',
          icon: <Iconify icon="solar:flag-bold" />,
        },
        {
          label: 'Voting District',
          value: 'Pune',
          icon: <Iconify icon="solar:flag-bold" />,
        },
        {
          label: 'Voting Constituency',
          value: 'Pune',
          icon: <Iconify icon="solar:flag-bold" />,
        },
        {
          label: ' Voting Age Groups',
          value: '18-20',
          icon: <Iconify icon="solar:flag-bold" />,
        },
        {
          label: 'Total Voting',
          value: '18000',
          icon: <Iconify icon="solar:flag-bold" />,
        },
        {
          label: ' Voting Percent',
          value: '50%',
          icon: <Iconify icon="solar:flag-bold" />,
        },
      ].map((item) => (
        <Stack key={item.label} spacing={1.5} direction="row">
          {item.icon}
          <ListItemText
            primary={item.label}
            secondary={item.value}
            primaryTypographyProps={{
              typography: 'body2',
              color: 'text.secondary',
              mb: 0.5,
            }}
            secondaryTypographyProps={{
              typography: 'subtitle2',
              color: 'text.primary',
              component: 'span',
            }}
          />
        </Stack>
      ))}
    </Stack>
  );

  const renderCompany = (
    <Stack
      component={Paper}
      variant="outlined"
      spacing={2}
      direction="row"
      sx={{ p: 3, borderRadius: 2, mt: 3 }}
    >
      <Avatar
        alt={voters.company.name}
        src={voters.company.logo}
        variant="rounded"
        sx={{ width: 64, height: 64 }}
      />

      <Stack spacing={1}>
        <Typography variant="subtitle1">BJP</Typography>
      </Stack>
    </Stack>
  );

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={8}>
        {renderContent}
      </Grid>

      <Grid xs={12} md={4}>
        {renderOverview}

        {renderCompany}
      </Grid>
    </Grid>
  );
}
