/* eslint-disable import/no-extraneous-dependencies */
import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

import { ITicketItem } from 'src/types/tickets';

// ----------------------------------------------------------------------

export function useGetTickets() {
  const URL = endpoints?.product?.list;

  const { data, error, isLoading, isValidating } = useSWR(URL, fetcher, {
    revalidateOnFocus: false, // Optionally disable revalidation on focus
  });

  const memoizedValue = useMemo(() => {
    const products = (data?.products as ITicketItem[]) || [];

    return {
      products,
      productsLoading: isLoading,
      productsError: error,
      productsValidating: isValidating,
      productsEmpty: !isLoading && products.length === 0,
    };
  }, [data?.products, error, isLoading, isValidating]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetProduct(productId: string) {
  const URL = productId ? `${endpoints?.product?.details}/${productId}` : null;

  const { data, error, isLoading, isValidating } = useSWR(URL, fetcher, {
    revalidateOnFocus: false,
  });

  const memoizedValue = useMemo(() => {
    const product = data?.product as ITicketItem | undefined;

    return {
      product,
      productLoading: isLoading,
      productError: error,
      productValidating: isValidating,
    };
  }, [data?.product, error, isLoading, isValidating]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchProducts(query: string) {
  const URL = query ? [endpoints?.product?.search, { params: { query } }] : null;

  const { data, error, isLoading, isValidating } = useSWR(URL, fetcher, {
    keepPreviousData: true,
    revalidateOnFocus: false,
  });

  const memoizedValue = useMemo(() => {
    const searchResults = (data?.results as ITicketItem[]) || [];

    return {
      searchResults,
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && searchResults.length === 0,
    };
  }, [data?.results, error, isLoading, isValidating]);

  return memoizedValue;
}
