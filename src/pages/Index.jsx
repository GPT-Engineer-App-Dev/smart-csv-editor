import { Container, VStack, Heading } from "@chakra-ui/react";
import CSVUploader from "../components/CSVUploader";

const Index = () => {
  return (
    <Container centerContent maxW="container.lg" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl" mb={4}>CSV Upload and Edit Tool</Heading>
        <CSVUploader />
      </VStack>
    </Container>
  );
};

export default Index;