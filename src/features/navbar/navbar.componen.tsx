import { Navbar as Navigation, Container } from "react-bootstrap";

export const Navbar = () => {
  return (
    <Navigation bg="primary" variant="dark">
      <Container>
        <Navigation.Brand as="span">Bookstore</Navigation.Brand>
      </Container>
    </Navigation>
  );
};
