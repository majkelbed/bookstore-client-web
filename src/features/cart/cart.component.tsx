import { ChangeEvent, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  CreateOrderDto,
  Order,
  usePlaceOrderMutation,
} from "../../app/services/order.service";
import { useStateSelector, useStoreDispatch } from "../../app/store";
import { toggleModal } from "../auth/auth.slice";
import { CartItem, clearCart, updateQuantity, removeItem } from "./cart.slice";

interface FormState {
  name: string;
  email: string;
  phone: string;
  password: string;
  repeatPassword: string;
  address: {
    firstLine: string;
    secondLine: string;
    city: string;
    postalCode: string;
  };
}

export const Cart = () => {
  const items = useStateSelector((state) => state.cart.items);
  const user = useStateSelector((state) => state.auth.user) as any;
  const [placeOrder, { isSuccess, isLoading, isError, error }] =
    usePlaceOrderMutation();
  const dispatch = useStoreDispatch();

  const { register: registerInput, handleSubmit } = useForm<FormState>();

  const handleChange =
    (item: CartItem) => (event: ChangeEvent<HTMLSelectElement>) => {
      dispatch(
        updateQuantity({ ...item, quantity: Number(event.target.value) })
      );
    };

  const handleOrder: any = async (data: FormState) => {
    try {
      const order: CreateOrderDto = !user
        ? {
            customer: {...data, id: "8bc4171b-5187-43f4-8ef9-f884692ddd86"} as any,
            products: items.map((item) => ({
              productId: item.product.id,
              quantity: item.quantity,
            })),
          }
        : {
            customerId: user.id,
            products: items.map((item) => ({
              productId: item.product.id,
              quantity: item.quantity,
            })),
          };
      await placeOrder(order).unwrap();
      dispatch(clearCart());
    } catch (error) {
      alert("Nie udało się złożyć zamówienia");
    }
  };

  const handleItemRemove = (id: string) => () => {
    dispatch(removeItem(id));
  };

  return (
    <Container>
      <Row>
        {items.length ? (
          <>
            {items.map(({ product, quantity }) => (
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
                          product.pictureUrl
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
                     {(quantity * product.price).toFixed(2)} PLN
                    </p>

                    <button
                      className="ms-4 btn btn-primary"
                      onClick={handleItemRemove(product.id)}
                    >
                      X
                    </button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </>
        ) : (
          <p>Twój koszyk jest pusty</p>
        )}
      </Row>
      <Row>
        {isSuccess ? (
          <p className="text-success">
            Sukces! Twoje zamówienie zostało złożone, czekamy na przelew aby
            rozpocząć jego realizację
          </p>
        ) : items.length > 0 ? (
          user ? (
            <Button disabled={isLoading} onClick={handleOrder}>
              Złóż zamówienie
            </Button>
          ) : (
            <Form onSubmit={handleSubmit(handleOrder)}>
              <h2>Dane do wysyłki:</h2>
              <Row>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Imię i nazwisko</Form.Label>
                  <Form.Control type="text" {...registerInput("name")} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Adres e-mail</Form.Label>
                  <Form.Control type="email" {...registerInput("email")} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPhone">
                  <Form.Label>Numer telefonu</Form.Label>
                  <Form.Control type="text" {...registerInput("phone")} />
                </Form.Group>
                <Col xs="12" md="6">
                  <Form.Group className="mb-3" controlId="formBasicFirstLine">
                    <Form.Label>Ulica</Form.Label>
                    <Form.Control
                      type="text"
                      {...registerInput("address.firstLine")}
                    />
                  </Form.Group>
                </Col>
                <Col xs="12" md="6">
                  <Form.Group className="mb-3" controlId="formBasicSecondLine">
                    <Form.Label>Numer mieszkania</Form.Label>
                    <Form.Control
                      type="text"
                      {...registerInput("address.secondLine")}
                    />
                  </Form.Group>
                </Col>
                <Col xs="12" md="6">
                  <Form.Group className="mb-3" controlId="formBasicCity">
                    <Form.Label>Miasto</Form.Label>
                    <Form.Control
                      type="text"
                      {...registerInput("address.city")}
                    />
                  </Form.Group>
                </Col>
                <Col xs="12" md="6">
                  <Form.Group className="mb-3" controlId="formBasicPostal">
                    <Form.Label>Kod pocztowy</Form.Label>
                    <Form.Control
                      type="text"
                      {...registerInput("address.postalCode")}
                    />
                  </Form.Group>
                </Col>
              </Row>
              {isError ? JSON.stringify(error) : null}

              <Button variant="primary" type="submit" disabled={isLoading}>
                Kup bez logowania
              </Button>
            </Form>
          )
        ) : null}
      </Row>
    </Container>
  );
};
