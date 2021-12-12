import { ChangeEvent } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStateSelector, useStoreDispatch } from "../../app/store";
import { CartItem, updateQuantity } from "./cart.slice";

export const Cart = () => {
  const items = useStateSelector((state) => state.cart.items);
  const dispatch = useStoreDispatch();

  const handleChange =
    (item: CartItem) => (event: ChangeEvent<HTMLSelectElement>) => {
      dispatch(
        updateQuantity({ ...item, quantity: Number(event.target.value) })
      );
    };

  return (
    <Container>
      <Row>
        {items.length ? (
          items.map(({ product, quantity }) => (
            <Col className="mb-3" key={product.id} xs={12}>
              <Card className="h-100 border-0 shadow rounded rounded-2 overflow-hidden">
                <Card.Body className="d-flex align-items-center">
                  <Link
                    className="text-decoration-none me-4"
                    to={`/product/${product.id}`}
                  >
                    <Card.Img
                      height="150"
                      variant="top"
                      src={
                        "https://media.merlin.pl/media/original/000/003/798/56ba60fda1bce.jpg"
                      }
                      alt={product.name}
                    />
                  </Link>

                  <Link
                    className="text-decoration-none me-auto"
                    to={`/product/${product.id}`}
                  >
                    <Card.Title className="m-0">{product.name}</Card.Title>
                  </Link>

                  <Form.Select
                    style={{ width: "120px" }}
                    value={quantity}
                    onChange={handleChange({ product, quantity })}
                  >
                    {Array.from({ length: 10 }).map((_, index) => (
                      <option
                        key={index + 1}
                        value={index + 1}
                        selected={index + 1 === quantity}
                      >
                        {index + 1}
                      </option>
                    ))}
                  </Form.Select>

                  <p className="m-0 ms-4 text-primary fw-bold">
                    $ {(quantity * product.price).toFixed(2)}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>Twój koszyk jest pusty</p>
        )}
      </Row>
    </Container>
  );
};
