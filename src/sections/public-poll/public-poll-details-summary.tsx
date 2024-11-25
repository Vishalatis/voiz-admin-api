import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import Label from 'src/components/label';
import FormProvider from 'src/components/hook-form';

import { IProductItem } from 'src/types/product';
import { ICheckoutItem } from 'src/types/checkout';

// import IncrementerButton from './common/incrementer-button';

// ----------------------------------------------------------------------

type Props = {
  product: IProductItem;
  items?: ICheckoutItem[];
  disabledActions?: boolean;
  onGotoStep?: (step: number) => void;
  onAddCart?: (cartItem: ICheckoutItem) => void;
};

export default function PublicPollDetailsSummary({
  items,
  product,
  onAddCart,
  onGotoStep,
  disabledActions,
  ...other
}: Props) {
  const router = useRouter();

  const {
    id,
    name,
    sizes,
    price,
    coverUrl,
    colors,
    newLabel,
    available,
    saleLabel,
    subDescription,
  } = product;

  const existProduct = !!items?.length && items.map((item) => item.id).includes(id);

  const defaultValues = {
    id,
    name,
    coverUrl,
    available,
    price,
    colors: colors[0],
    size: sizes[4],
    quantity: available < 1 ? 0 : 1,
  };

  const methods = useForm({
    defaultValues,
  });

  const { reset, watch, handleSubmit } = methods;

  const values = watch();

  useEffect(() => {
    if (product) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!existProduct) {
        onAddCart?.({
          ...data,
          colors: [values.colors],
          subTotal: data.price * data.quantity,
        });
      }
      onGotoStep?.(0);
      router.push(paths.product.checkout);
    } catch (error) {
      console.error(error);
    }
  });

  const renderSubDescription = (
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {subDescription}
    </Typography>
  );

  const renderLabels = (newLabel.enabled || saleLabel.enabled) && (
    <Stack direction="row" alignItems="center" spacing={1}>
      {newLabel.enabled && <Label color="info">{newLabel.content}</Label>}
      {saleLabel.enabled && <Label color="error">{saleLabel.content}</Label>}
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3} sx={{ pt: 3 }} {...other}>
        <Stack spacing={2} alignItems="flex-start">
          {renderLabels}

          <Typography variant="h5">{name}</Typography>

          {renderSubDescription}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />
      </Stack>
    </FormProvider>
  );
}
