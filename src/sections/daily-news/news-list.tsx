import Box, { BoxProps } from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { INewsItem } from 'src/types/news';

import DailyNewsItem from './news-item';
import { DailyNewsItemSkeleton } from './news-skeleton';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  news: INewsItem[];
  loading?: boolean;
};

export default function DailyNewsList({ news, loading, ...other }: Props) {
  const renderSkeleton = (
    <>
      {[...Array(16)].map((_, index) => (
        <DailyNewsItemSkeleton key={index} />
      ))}
    </>
  );

  const renderList = (
    <>
      {news.map((item) => (
        <DailyNewsItem key={item.id} news={news as any} />
      ))}
    </>
  );

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        {...other}
      >
        {loading ? renderSkeleton : renderList}
      </Box>

      {news.length > 8 && (
        <Pagination
          count={8}
          sx={{
            mt: 8,
            [`& .${paginationClasses.ul}`]: {
              justifyContent: 'center',
            },
          }}
        />
      )}
    </>
  );
}
