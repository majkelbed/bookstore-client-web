import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useListProductsQuery } from "../../../app/services/products.service";
import { useStoreDispatch } from "../../../app/store";
import { addToCart } from "../../cart/cart.slice";

export const ProductsGrid = () => {
  const dispatch = useStoreDispatch();
  const { data: products, isLoading } = useListProductsQuery();

  const handleAddToCart = (product: any) => () => {
    dispatch(addToCart({ product: product, quantity: 1 }));
  }

  if (isLoading) {
    return <Container>Loading</Container>;
  }

  if (!products || !products.length) {
    return <Container>Not found products</Container>;
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
                  src={product.pictureUrl}
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
                  <p className="m-0 text-primary fw-bold">{product.price} PLN</p>
                  <Button
                    className="rounded rounded-pill p-0"
                    style={{ width: "48px", height: "48px" }}
                    onClick={handleAddToCart(product)}
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
