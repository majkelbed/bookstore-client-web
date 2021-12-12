import jwtDecode from "jwt-decode";
import { Button, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRegisterMutation } from "../../app/services/customer.service";
import { useStoreDispatch } from "../../app/store";
import { setCredentials } from "./auth.slice";

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

export const RegisterForm = () => {
  const dispatch = useStoreDispatch();
  const [register, { isLoading, isError, error }] = useRegisterMutation();
  const { register: registerInput, handleSubmit } = useForm<FormState>();

  const handleRegister: SubmitHandler<FormState> = async (data) => {
    try {
      const response = await register(data).unwrap();
      dispatch(setCredentials({
        user: {
          customerId: (jwtDecode(response.token) as any).customerId,
          email: data.email
        },
        token: response.token
      }));
    } catch (error) {
      // TODO
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit(handleRegister)}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          {...registerInput("name")}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          {...registerInput("email")}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="text"
          {...registerInput("phone")}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          {...registerInput("password")}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicRepeatPassword">
        <Form.Label>Repeat password</Form.Label>
        <Form.Control
          type="password"
          {...registerInput("repeatPassword")}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicFirstLine">
        <Form.Label>Street</Form.Label>
        <Form.Control
          type="text"
          {...registerInput("address.firstLine")}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicSecondLine">
        <Form.Label>Number</Form.Label>
        <Form.Control
          type="text"
          {...registerInput("address.secondLine")}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCity">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          {...registerInput("address.city")}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPostal">
        <Form.Label>Postal code</Form.Label>
        <Form.Control
          type="text"
          {...registerInput("address.postalCode")}
        />
      </Form.Group>

      {isError ? JSON.stringify(error) : null}

      <Button variant="primary" type="submit" disabled={isLoading}>
        Submit
      </Button>
    </Form>
  );
};
