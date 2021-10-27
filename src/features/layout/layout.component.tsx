import { Navbar } from "../navbar/navbar.componen";

export const Layout = ({ children }: any) => {
  return (
    <>
      <Navbar />
      <main className="py-4">{children}</main>
    </>
  );
};
