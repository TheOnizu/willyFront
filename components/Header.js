import { useRouter } from 'next/router'
import { Flex, Box, Avatar, Link } from '@chakra-ui/react'

export default function Header() {
  const { pathname } = useRouter()

  return (
    <header>
      <Flex align="center" justify="center" p="2" fontSize={["md", "lg", "xl", "xl"]} w="100vw">
        <Box h="8vh" fontSize={["md", "lg", "xl", "xl"]} justifyContent="center" display="flex">
          <Flex justify="space-around" w={["100vw", "100vw", "80vw", "80vw"]}>
            <Box display="flex" justify="center" w={["100vw", "100vw", "40vw", "40vw"]}>
              <Box display="flex" alignItem="center">
                <Link href="/">
                  <a>
                    <Avatar src='/images/logo.jpeg' name='logo' />
                  </a>
                </Link>
              </Box>

              <Flex justify="space-around" align="center" w={["100vw", "100vw", "80vw", "80vw"]}>
                <Link href="/about">
                  <a className={pathname === '/about' ? 'is-active' : ''}>about</a>
                </Link>
                <Link href="/ssr">
                  <a className={pathname === '/ssr' ? 'is-active' : ''}>nous</a>
                </Link>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </header>
  )
}
