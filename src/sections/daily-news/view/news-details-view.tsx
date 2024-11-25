'use client';

import { useState, useEffect, useCallback } from 'react';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetProduct } from 'src/api/product';
import { PRODUCT_PUBLISH_OPTIONS } from 'src/_mock';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';

import { DailyNewsDetailsSkeleton } from '../news-skeleton';
import DailyNewsDetailsSummary from '../news-details-summary';
import DailyNewsDetailsToolbar from '../news-details-toolbar';
import DailyNewsDetailsCarousel from '../news-details-carousel';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function DailyNewsDetailsView({ id }: Props) {
  const { product, productLoading, productError } = useGetProduct(id);

  const settings = useSettingsContext();

  const [publish, setPublish] = useState('');

  useEffect(() => {
    if (product) {
      setPublish(product?.publish);
    }
  }, [product]);

  const handleChangePublish = useCallback((newValue: string) => {
    setPublish(newValue);
  }, []);

  const renderSkeleton = <DailyNewsDetailsSkeleton />;

  const renderError = (
    <EmptyContent
      filled
      title={`${productError?.message}`}
      action={
        <Button
          component={RouterLink}
          href={paths.dashboard.dailyNews.root}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
          sx={{ mt: 3 }}
        >
          Back to List
        </Button>
      }
      sx={{ py: 10 }}
    />
  );

  const renderProduct = product && (
    <>
      <DailyNewsDetailsToolbar
        backLink={paths.dashboard.dailyNews.root}
        editLink={paths.dashboard.dailyNews.root}
        liveLink={paths.product.root}
        publish={publish || ''}
        onChangePublish={handleChangePublish}
        publishOptions={PRODUCT_PUBLISH_OPTIONS}
      />

      <Grid container spacing={{ xs: 3, md: 5, lg: 8 }}>
        <Grid xs={12} md={6} lg={7}>
          <DailyNewsDetailsCarousel product={product} />
        </Grid>

        <Grid xs={12} md={6} lg={5}>
          <DailyNewsDetailsSummary disabledActions product={product} />
        </Grid>
      </Grid>
    </>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      {productLoading && renderSkeleton}

      {productError && renderError}

      {product && renderProduct}
    </Container>
  );
}
