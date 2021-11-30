import { Button, Modal, Tab, Tabs } from "react-bootstrap";
import { useStateSelector, useStoreDispatch } from "../../app/store";
import { closeModal } from "./auth.slice";
import { LoginForm } from "./login-form.component";
import { RegisterForm } from "./register-form.component";

export const AuthModal = () => {
  const dispatch = useStoreDispatch();
  const isOpen = useStateSelector((state) => state.auth.isAuthModalOpen);

  const handleClose = () => dispatch(closeModal());

  return (
    <Modal
      centered
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      show={isOpen}
      onHide={handleClose}
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Tabs
          defaultActiveKey="signin"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="signin" title="Sign In">
            <LoginForm />
          </Tab>
          <Tab eventKey="signup" title="Sign Up">
            <RegisterForm />
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};
