import jwtDecode from "jwt-decode";
import { Button, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../../app/services/customer.service";
import { useStoreDispatch } from "../../app/store";
import { setCredentials } from "./auth.slice";

interface FormState {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const dispatch = useStoreDispatch();
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const { register: registerInput, handleSubmit } = useForm<FormState>();

  const handleLogin: SubmitHandler<FormState> = async (data) => {
    try {
      const response = await login(data).unwrap();
      dispatch(setCredentials({
        user: {
          id: (jwtDecode(response.token) as any).id,
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
    <Form onSubmit={handleSubmit(handleLogin)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          {...registerInput("email")}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          {...registerInput("password")}
        />
      </Form.Group>

      {isError ? JSON.stringify(error) : null}

      <Button variant="primary" type="submit" disabled={isLoading}>
        Submit
      </Button>
    </Form>
  );
};
