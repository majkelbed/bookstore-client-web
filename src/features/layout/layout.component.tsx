import { useEffect } from "react";
import { useStateSelector, useStoreDispatch } from "../../app/store";
import { AuthModal } from "../auth/auth-modal.component";
import { fetchUserById } from "../auth/auth.slice";
import { Navbar } from "../navbar/navbar.component";

export const Layout = ({ children }: any) => {
  const dispatch = useStoreDispatch();
  const user = useStateSelector(state => state.auth.user);

  useEffect(() => {
    console.log(user);
    if(user) {
      dispatch(fetchUserById(user.customerId));
    }
  }, []);

  return (
    <>
      <Navbar />
      <main className="py-4">{children}</main>

      <AuthModal />
    </>
  );
};
