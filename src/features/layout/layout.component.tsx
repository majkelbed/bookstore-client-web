import { Navbar } from "../navbar/navbar.componen";

export const Layout = ({ children }: any) => {
  return (
    <>
      <Navbar />
      <main className="container py-4">{children}</main>
    </>
  );
};
