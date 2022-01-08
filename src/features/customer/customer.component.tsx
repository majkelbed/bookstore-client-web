import { Form, Button } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUpdateMutation } from "../../app/services/customer.service";
import { useStateSelector, useStoreDispatch } from "../../app/store";
import { setCredentials } from "../auth/auth.slice";

interface FormState {
    id?: string;
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

export const CustomerProfile = () => {
  const dispatch = useStoreDispatch();
  const user: any = useStateSelector(state => state.auth.user);
  const [editCustomer, { isLoading, isError, error }] = useUpdateMutation();
  const { register: registerInput, handleSubmit } = useForm<FormState>({ defaultValues: user });
  const handleRegister: SubmitHandler<FormState> = async (data) => {
    try {
      const response = await editCustomer({ data }).unwrap();
      dispatch(setCredentials({ user: data as any }))
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit(handleRegister)}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control required type="text" {...registerInput("name")} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control required type="email" {...registerInput("email")} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control required type="text" {...registerInput("phone")} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control required type="password" {...registerInput("password")} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicRepeatPassword">
        <Form.Label>Repeat password</Form.Label>
        <Form.Control required type="password" {...registerInput("repeatPassword")} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicFirstLine">
        <Form.Label>Street</Form.Label>
        <Form.Control required type="text" {...registerInput("address.firstLine")} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicSecondLine">
        <Form.Label>Number</Form.Label>
        <Form.Control required type="text" {...registerInput("address.secondLine")} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCity">
        <Form.Label>City</Form.Label>
        <Form.Control required type="text" {...registerInput("address.city")} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPostal">
        <Form.Label>Postal code</Form.Label>
        <Form.Control required type="text" {...registerInput("address.postalCode")} />
      </Form.Group>

      {isError ? JSON.stringify(error) : null}

      <Button variant="primary" type="submit" disabled={isLoading}>
        Submit
      </Button>
    </Form>
  );
};
