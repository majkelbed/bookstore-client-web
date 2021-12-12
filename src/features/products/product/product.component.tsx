import React from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Stack,
  Breadcrumb,
  Carousel,
  Accordion,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetProductQuery } from "../../../app/services/products.service";
import { useStoreDispatch } from "../../../app/store";
import { addToCart } from "../../cart/cart.slice";

interface ProductProps {
  match: {
    params: {
      id: string;
    };
  };
}

export const Product = ({
  match: {
    params: { id },
  },
}: ProductProps) => {
  const dispatch = useStoreDispatch();
  const { data: product, isLoading } = useGetProductQuery(id);

  const handleAddToCart = () => {
    product && dispatch(addToCart({ product: product, quantity: 1 }));
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!product) {
    return <div>Not found products</div>;
  }

  return (
    <Container>
      <Row>
        <Breadcrumb>
          <Link className="breadcrumb-item" to="/">
            Strona główna
          </Link>
          <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Row>
        <Col xs={12} xl={6}>
          <Image
            src={
              "https://media.merlin.pl/media/original/000/003/798/56ba60fda1bce.jpg"
            }
            fluid
          />
          {/* <Carousel>
            {product.images.map((image) => (
              <Carousel.Item key={image}>
                <Image src={image} fluid />
              </Carousel.Item>
            ))}
          </Carousel> */}
        </Col>
        <Col xs={12} xl={6}>
          <Stack>
            <Stack className="mb-3">
              <h1>{product.name}</h1>
              {/* <p className="mb-1">{product.category}</p> */}
              <div className="d-flex mb-3">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-half"></i>
                <i className="bi bi-star"></i>
                <i className="bi bi-star"></i>
              </div>
              <h2>$ {product.price}</h2>
              <Button className="align-self-start" onClick={handleAddToCart}>
                Dodaj do koszyka
              </Button>
            </Stack>
            <Accordion defaultActiveKey="0" flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Opis</Accordion.Header>
                <Accordion.Body>{product.description}</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Specyfikacja</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Płatność i dostawa</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Recenzje</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};
