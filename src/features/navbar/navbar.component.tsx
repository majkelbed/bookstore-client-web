import {
  Navbar as Navigation,
  Container,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStateSelector, useStoreDispatch } from "../../app/store";
import { setCredentials, toggleModal } from "../auth/auth.slice";

export const Navbar = () => {
  const { user } = useStateSelector((state) => state.auth);
  const dispatch = useStoreDispatch();

  const handleToggle = () => dispatch(toggleModal());

  const handleLogout = () => dispatch(setCredentials({ user: null, token: null }));


  return (
    <Navigation bg="primary" variant="dark">
      <Container>
        <Link to="/">
          <Navigation.Brand as="span">Bookstore</Navigation.Brand>
        </Link>

        {!user ? (
          <Button variant="secondary" onClick={handleToggle}>
            Sign Up / Sign In
          </Button>
        ) : (
          <Button variant="secondary" onClick={handleLogout}>
            Wyloguj {user.email}
          </Button>
        )}
      </Container>
    </Navigation>
  );
};
