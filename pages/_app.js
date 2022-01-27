import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apolloClient';
import theme from '../theme';

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps)

  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </ColorModeProvider>
    </ChakraProvider >
  )
}
