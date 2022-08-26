import urql, {
  cacheExchange,
  dedupExchange,
  fetchExchange,
  ssrExchange,
} from "@urql/vue";
import { devtoolsExchange } from "@urql/devtools";

export default defineNuxtPlugin((nuxtApp) => {

// const ssr = ssrExchange({
  //   isClient: process.client,
  //   initialState: { a: 1 },
  // });

  const exchanges = [dedupExchange, cacheExchange, fetchExchange];


  if (nuxtApp._legacyContext?.isDev) {
    exchanges.unshift(devtoolsExchange);
  }
  // nuxtApp.useHydration(
  //   "urql",
  //   () => {
  //     const {data}=ssr.extractData();
  //     return data;
  //   },
  //   (data) => {
  //     console.log("sssssssszzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz",data)
  //     ssr.restoreData(data);
  //   }
  // );

  const config = useRuntimeConfig()

  nuxtApp.vueApp.use(urql, {
    exchanges,
    url: config.public.apiEndpoint,
    fetchOptions: () => {
      return {
        headers: { authorization: `Bearer ${config.public.accessToken}`},
      };
    },
  })
})

