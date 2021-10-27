import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useListProductsQuery } from "../../../app/services/products.service";

export const ProductsGrid = () => {
  const { data: products, isLoading } = useListProductsQuery();

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!products) {
    return <div>Not found products</div>;
  }

  return (
    <Container>
      <Row>
        {products.map((product) => (
          <Col className="mb-3" key={product.id} xs={12} md={6} lg={4} xl={3}>
            <Card className="h-100 border-0 shadow rounded rounded-2 overflow-hidden">
              <Link
                className="text-decoration-none"
                to={`/product/${product.id}`}
              >
                <Card.Img
                  variant="top"
                  src={product.images[0]}
                  alt={product.name}
                />
              </Link>

              <Card.Body className="d-flex flex-column">
                <Link
                  className="text-decoration-none"
                  to={`/product/${product.id}`}
                >
                  <Card.Title>{product.name}</Card.Title>
                </Link>

                <Card.Text className="fw-lighter fs-6">
                  {product.description.length > 75
                    ? `${product.description.slice(0, 75).trimEnd()}...`
                    : product.description}
                </Card.Text>

                <div className="d-flex align-items-center justify-content-between mt-auto">
                  <p className="m-0 text-primary fw-bold">$ {product.price}</p>
                  <Button
                    className="rounded rounded-pill p-0"
                    style={{ width: "48px", height: "48px" }}
                  >
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
