import { AuthModal } from "../auth/auth-modal.component";
import { Navbar } from "../navbar/navbar.component";

export const Layout = ({ children }: any) => {
  return (
    <>
      <Navbar />
      <main className="py-4">{children}</main>

      <AuthModal />
    </>
  );
};
