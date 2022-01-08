import { useEffect } from "react";
import { Navbar as Navigation, Container, Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStateSelector, useStoreDispatch } from "../../app/store";
import { fetchUserById, setCredentials, toggleModal } from "../auth/auth.slice";

export const Navbar = () => {
  const { items } = useStateSelector((state) => state.cart);
  const { user } = useStateSelector((state) => state.auth);
  const dispatch = useStoreDispatch();

  const handleToggle = () => dispatch(toggleModal());

  const handleLogout = () => {
    dispatch(setCredentials({ user: null, token: null }));
    localStorage.removeItem("token");
  };

  useEffect(() => {
    console.log(user);
    if (user?.customerId) {
      dispatch(fetchUserById(user.customerId));
    }
  }, [user?.customerId]);

  return (
    <Navigation bg="primary" variant="dark">
      <Container>
        <Link to="/">
          <Navigation.Brand as="span">Papugarnia</Navigation.Brand>
        </Link>

        <Link className="text-white" to="/cart">
          Koszyk: {items.length}
        </Link>

        {!user ? (
          <Button variant="secondary" onClick={handleToggle}>
            Logowanie / Rejestracja
          </Button>
        ) : (
          <>
            <Link className="text-white" to="/order">
              Zamówienia
            </Link>
            <Link className="text-white" to="/customer">
              Profil
            </Link>
            <Button variant="secondary" onClick={handleLogout}>
              Wyloguj {user.email}
            </Button>
          </>
        )}
      </Container>
    </Navigation>
  );
};
