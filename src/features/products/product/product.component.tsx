import StarPicker from 'react-star-picker';
import {
  Container,
  Row,
  Col,
  Image,
  Stack,
  Breadcrumb,
  Accordion,
  Button,
  Form,
  ListGroup,
  Badge,
} from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  useCreateReviewMutation,
  useGetProductQuery,
} from "../../../app/services/products.service";
import { useStateSelector, useStoreDispatch } from "../../../app/store";
import { setCredentials } from "../../auth/auth.slice";
import { addToCart } from "../../cart/cart.slice";
import { useState } from 'react';

interface ProductProps {
  match: {
    params: {
      id: string;
    };
  };
}

interface FormState {
  text: string;
  stars: number;
}

export const Product = ({ match: { params } }: ProductProps) => {
  const { id } = params;
  const dispatch = useStoreDispatch();
  const user = useStateSelector((state) => state.auth.user);
  const { data: product, isLoading } = useGetProductQuery(id);
  const [createReview, { isLoading: isLoadingReview, isError, error }] =
    useCreateReviewMutation();
  const { register: registerInput, handleSubmit, reset, setValue, watch } = useForm<FormState>();

  const stars = watch('stars');

  const handleCreateReview: SubmitHandler<FormState> = async (
    data,
    helpers
  ) => {
    try {
      await createReview({ ...data, productId: id }).unwrap();
      reset();
    } catch (error) {
      // TODO
      console.log(error);
    }
  };

  const onChange = (value: any) => {
    console.log(value);
    setValue('stars', value);
  };

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
              product.pictureUrl
            }
            fluid
          />
        </Col>
        <Col xs={12} xl={6}>
          <Stack>
            <Stack className="mb-3">
              <h1>{product.name}</h1>
              <div className="d-flex mb-3">
                {Array.from({ length: 5 }).map((_, index) =>
                  Math.ceil(product.rating) >= index + 1 ? (
                    <i className="bi bi-star-fill"></i>
                  ) : (
                    <i className="bi bi-star"></i>
                  )
                )}
              </div>
              <h2>{product.price} PLN</h2>
              <Button className="align-self-start" onClick={handleAddToCart}>
                Dodaj do koszyka
              </Button>
            </Stack>
            <Accordion defaultActiveKey="0" flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Opis</Accordion.Header>
                <Accordion.Body>{product.description}</Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Płatność i dostawa</Accordion.Header>
                <Accordion.Body>
                  <p>Płatność przelewem</p>
                  <table className="w-100">
                    <thead>
                      <th>Metoda dostawy</th>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Paczkomat</td>
                        <td>12 PLN</td>
                      </tr>
                      <tr>
                        <td>Kurier</td>
                        <td>15 PLN</td>
                      </tr>
                    </tbody>
                  </table>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Recenzje</Accordion.Header>
                <Accordion.Body>
                  <ListGroup>
                    {product.reviews.length > 0 ? product.reviews.map((review) => (
                      <ListGroup.Item
                        as="li"
                        key={review.id}
                        className="d-flex justify-content-between align-items-start"
                      >
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">{review.text}</div>
                          {Array.from({ length: 5 }).map((_, index) =>
                            review.stars >= index + 1 ? (
                              <i className="bi bi-star-fill"></i>
                            ) : (
                              <i className="bi bi-star"></i>
                            )
                          )}
                        </div>
                      </ListGroup.Item>
                    )) : (
                      <p>Brak recenzji tego produktu, bądź pierwszy!</p>
                    )}
                  </ListGroup>
                  {user ? (
                    <>
                      <Form
                        className="mt-5"
                        onSubmit={handleSubmit(handleCreateReview)}
                      >
                        <Form.Group className="mb-3" controlId="reviewText">
                          <Form.Label>Co myślisz o tym produkcie?</Form.Label>
                          <Form.Control
                            type="text"
                            {...registerInput("text")}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="reviewStars">
                          <Form.Label>Twoja ocena</Form.Label>
                          <Form.Control
                            type="hidden"
                            {...registerInput("stars")}
                          />
                          <StarPicker onChange={onChange} value={+stars ? stars : 1} />
                        </Form.Group>

                        <Button
                          variant="primary"
                          type="submit"
                          disabled={isLoading || isLoadingReview}
                        >
                          Dodaj recenzję
                        </Button>
                      </Form>
                      {isError ? JSON.stringify(error) : null}
                    </>
                  ) : null}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};
