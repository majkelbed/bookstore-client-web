import React from "react";
import faker from "faker";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const products = Array.from({ length: 30 }).map(() => ({
  id: faker.datatype.uuid(),
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  category: faker.commerce.department(),
  image: faker.image.animals(),
  price: faker.commerce.price()
}));

export const ProductsGrid = () => {
  return (
    <Container>
      <Row>
        {products.map((product) => (
          <Col className="mb-3" xs={12} md={6} lg={4} xl={3}>
            <Card className="h-100 border-0 shadow rounded rounded-2 overflow-hidden">
              <Card.Img variant="top" src={product.image} alt={product.name} />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{product.name}</Card.Title>
                <Card.Text className="fw-lighter fs-6">{product.description.length > 75 ? `${product.description.slice(0, 75).trimEnd()}...` : product.description}</Card.Text>

                <div className="d-flex align-items-center justify-content-between mt-auto">
                    <p className="m-0 text-primary fw-bold">
                        $ {product.price}
                    </p>
                    <Button className="rounded rounded-pill p-0" style={{ width: '48px', height: '48px' }}>
                        <i className="bi bi-cart fs-5"></i>
                    </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
