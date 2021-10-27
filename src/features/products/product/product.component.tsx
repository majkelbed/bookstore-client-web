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

interface ProductProps {
  id: string;
}

export const Product = ({ id }: ProductProps) => {
  const { data: product, isLoading } = useGetProductQuery(id);

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
          <Breadcrumb.Item as="span">
            <Link to="/">Main</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{product.category}</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Row>
        <Col xs={12} xl={6}>
          <Carousel>
            {product.images.map((image) => (
              <Carousel.Item key={image}>
                <Image src={image} fluid />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col xs={12} xl={6}>
          <Stack>
            <Stack className="mb-3">
              <h1>{product.name}</h1>
              <p className="mb-1">{product.category}</p>
              <div className="d-flex mb-3">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-half"></i>
                <i className="bi bi-star"></i>
                <i className="bi bi-star"></i>
              </div>
              <h2>$ {product.price}</h2>
              <Button className="align-self-start">ADD TO CART</Button>
            </Stack>
            <Accordion defaultActiveKey="0" flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Description</Accordion.Header>
                <Accordion.Body>{product.description}</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Specyfication</Accordion.Header>
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
                <Accordion.Header>Payment and Delivery</Accordion.Header>
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
                <Accordion.Header>Reviews</Accordion.Header>
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
