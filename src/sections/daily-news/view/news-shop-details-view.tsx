'use client';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetProduct } from 'src/api/product';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// import CartIcon from '../common/cart-icon';
import { DailyNewsDetailsSkeleton } from '../news-skeleton';
import { useCheckoutContext } from '../../checkout/context';
import ProductDetailsCarousel from '../news-details-carousel';
import DailyNewsDetailsSummary from '../news-details-summary';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function DailyNewsShopDetailsView({ id }: Props) {
  const settings = useSettingsContext();

  const checkout = useCheckoutContext();

  const { product, productLoading, productError } = useGetProduct(id);

  const renderSkeleton = <DailyNewsDetailsSkeleton />;

  const renderError = (
    <EmptyContent
      filled
      title={`${productError?.message}`}
      action={
        <Button
          component={RouterLink}
          href={paths.product.root}
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
      <CustomBreadcrumbs
        links={[
          { name: 'Home', href: '/' },
          {
            name: 'Shop',
            href: paths.product.root,
          },
          { name: product?.name },
        ]}
        sx={{ mb: 5 }}
      />

      <Grid container spacing={{ xs: 3, md: 5, lg: 8 }}>
        <Grid xs={12} md={6} lg={7}>
          <ProductDetailsCarousel product={product} />
        </Grid>

        <Grid xs={12} md={6} lg={5}>
          <DailyNewsDetailsSummary
            product={product}
            items={checkout.items}
            onAddCart={checkout.onAddToCart}
            onGotoStep={checkout.onGotoStep}
          />
        </Grid>
      </Grid>
    </>
  );

  return (
    <Container
      maxWidth={settings.themeStretch ? false : 'lg'}
      sx={{
        mt: 5,
        mb: 15,
      }}
    >
      {/* <CartIcon totalItems={checkout.totalItems} /> */}

      {productLoading && renderSkeleton}

      {productError && renderError}

      {product && renderProduct}
    </Container>
  );
}
