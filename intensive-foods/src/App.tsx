import { NavBar } from "@components/common";
import { Outlet } from "react-router-dom";
import "@App.css";

export default function App(): React.ReactElement {
  return (
    <>
      <NavBar />

      <main className="container m-4">
        <Outlet />
      </main>
    </>
  );
}
