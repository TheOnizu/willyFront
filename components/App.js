import {
  Link as ChakraLink,
  Text,
  Code,
  List,
  ListIcon,
  ListItem,
} from '@chakra-ui/react';
import { Container } from "./Container";

export default function Layout({ children }) {
  return (
    <Container height="100vh">
      {children}
    </Container >
  )
}
