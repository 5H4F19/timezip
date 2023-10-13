import { apiSlice } from "../api";

const marketSlice = apiSlice.injectEndpoints({
  endpoints: build => ({
    getCoinLivePrices: build.query<any, number>({
      query: () => '/trades/coins',
    }),
  }),
});

export const { useGetCoinLivePricesQuery } = marketSlice
