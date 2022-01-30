import { useState } from "react";
import { Flex, Grid, Badge, Button, Box, VStack, Spacer, Center, Text, Avatar, Link, HStack } from '@chakra-ui/react'
import { gql, useQuery } from '@apollo/client'
import Image from 'next/image'
import InfoBox from '../components/InfoBox'
import Header from '../components/Header'
import Submit from '../components/Submit'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
// import { ALL_MISSIONS_QUERY } from '../components/PostList'
import { initializeApollo, addApolloState } from '../lib/apolloClient'
import { Container } from '../components/Container'
import { format } from 'date-fns'

export const ALL_MISSIONS_QUERY = gql`
  query {
    missions {
      id
      title
      content {
        document
      }
      startDate
      endDate
    }
  }
`

const partenaires = [
  { src: "/images/corot_entraide.jpg", name: 'corot entraide' },
  { src: "/images/secours_catholique.jpg", name: 'secours catholique caritas france' }
]

const IndexPage = () => {
  const [missionId, setMissionId] = useState('');

  const selectMission = (id) => () => setMissionId(id)

  const { loading, error, data } = useQuery(ALL_MISSIONS_QUERY)
  console.log(data)
  return (
    <Container minH="100vh">
      <Header />
      <Box h="50vh" w="100vw" bgSize='cover' bg="url('/images/unsplash.jpg') no-repeat center center fixed" display="flex" alignItem="center" justifyContent="center">
        <Center>
          <Image
            src="/images/logo.jpeg"
            alt="Picture of the author"
            width={100}
            height={100}
          />
        </Center>
      </Box>

      <Text fontSize='2xl' pt="10">Nos missions</Text>
      <Grid templateColumns='repeat(2, 1fr)' gap={6} my="10">
        {data?.missions.map((mission) => (
          <Box borderWidth={missionId === mission.id ? "3px" : '1px'} borderRadius='lg' borderColor={missionId === mission.id ? "green" : ''} p="1" overflow='hidden' key={mission.key}>
            <Box>

              <Badge borderRadius='full' px='2' colorScheme='green'>
                debut le {format(new Date(mission.startDate), 'dd/MM/YYY')}
              </Badge>
            </Box>
            {mission.endDate && (<Box>
              <Badge borderRadius='full' px='2' colorScheme='red'>
                finis le {format(new Date(mission.endDate), 'dd/MM/YYY')}
              </Badge>
            </Box>)}
            <Box
              mt='1'
              fontWeight='semibold'
              as='h4'
              lineHeight='tight'
              isTruncated
            >
              {mission.title}
            </Box>
            <Box
              fontSize='xs'
              textTransform='uppercase'
            >
              <Text pt="1" dangerouslySetInnerHTML={{ __html: mission.content.document[0].children[0].text }}
              ></Text>
            </Box>
            <Button mt="5" onClick={selectMission(mission.id)} colorScheme='blue' size='sm' >je postule</Button>
          </Box>
        ))}
      </Grid>
      <Box w="50vw" mb="20">
        <VStack spacing="10px" justify="center">
          <Text fontSize='2xl'>HUMAN ACTION C'EST :</Text>
          <Text fontSize='xl'>La garantie d'une réponse
            dans les 10 minutes suivants votre appel</Text>
          <Text fontSize='lg'>ainsi qu'une intervention opérante
            24h/24 et 7j/7</Text>
          <Text fontSize="lg">
            Des taux fixes : nuit, jour, férié, dimanche
            Votre regroupement d'éducateurs
            indépendants, diplômés et expérimentés
            dans le secteur social et médico-social.
          </Text>
          <Text fontSize='lg'><a href="tel:+330185410202">Tél : 01 85 41 02 02</a></Text>
          <Text fontSize='lg'>Du lundi au vendredi : 9h-12h / 14h-18h</Text>
          <Text fontSize='lg'><a href="mailto: contact@humanaction.fr">contact@humanaction.fr</a></Text>
        </VStack>
      </Box>
      <Text fontSize='2xl' pt="10">Nos partenaires</Text>
      <DarkModeSwitch />
      <Box pb="10">
        <Flex spacing="10px" justify="center">
          {partenaires.map((element, index) => (
            <Box key={index} p='4'>
              <Avatar size='xl' name={element.name} src={element.src} />
            </Box>
          ))}
        </Flex>
      </Box>
      <Box w="100vw">
        <VStack spacing="10px" justify="center">
          <Text fontSize='2xl'>Nous Contacter</Text>
          <Text fontSize='xl'>Human action</Text>
          <Text fontSize='lg'>135 avenue de Paris 91300 MASSY</Text>
          <Text fontSize='lg'><a href="tel:+330185410202">Tél : 01 85 41 02 02</a></Text>
          <Text fontSize='lg'>Du lundi au vendredi : 9h-12h / 14h-18h</Text>
          <Text fontSize='lg'><a href="mailto: contact@humanaction.fr">contact@humanaction.fr</a></Text>
        </VStack>
      </Box>
    </Container>
  )
}

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
