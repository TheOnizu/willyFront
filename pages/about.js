import { Box, Center, Text } from '@chakra-ui/react'
import { Container } from '../components/Container'
import Header from '../components/Header'

const AboutPage = () => (
  <Container minH="100vh">
    <Header />
    <Box height="80vh" display="flex" alignItem="center">
      <Center width="50vw">

        <Text>
          Votre regroupement d'éducateurs
          indépendants, diplômés et expérimentés
          dans le secteur social et médico-social.
          Notre point commun est d'avoir déjà travaillé
          ensemble avant de s'engager chacun, dans
          une aventure libérale. L'idée de se regrouper
          nous est donc apparue comme une évidence.
          Educateurs ayant travaillés dans différentes
          structures :
          MECS, CSAPA, CHU, ACCUEIL DE JOUR, SAVS,
          PRÉVENTION SPÉCIALISÉE, FAM, FOYER DE VIE,
          FOYER D'HÉBERGEMENT, ACCUEIL HÔTELIER
          INDIVIDUALISÉ ; ET AVEC DIFFÉRENTS PUBLICS
          : PERSONNES EN SITUATION D'HANDICAP,
          ADOLESCENTS, ADULTES ET ENFANTS.
        </Text>
      </Center>
    </Box>
  </Container>
)

export default AboutPage
