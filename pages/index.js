import App from '../components/App'
import InfoBox from '../components/InfoBox'
import Header from '../components/Header'
import Submit from '../components/Submit'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { ALL_MISSIONS_QUERY } from '../components/PostList'
import { initializeApollo, addApolloState } from '../lib/apolloClient'
import { Container } from '../components/Container'

const IndexPage = () => (
  <Container height="100vh">
    <Header />
    <InfoBox>ℹ️ This page shows how to use SSG with Apollo.</InfoBox>
    <DarkModeSwitch />
    <Submit />
  </Container>
)

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: ALL_MISSIONS_QUERY,
  })

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  })
}

export default IndexPage
