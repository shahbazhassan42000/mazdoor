import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";
import MainHeader from "./components/MainHeader/MainHeader";
import Popup from "./components/Auth/Signup/Popup";

function App() {
  const user=useSelector((state) => state.mazdoorStore.user);
  const popup=useSelector(state=>state.mazdoorStore.popup);
  return (
    <>
      {user ? <MainHeader /> : <Header />}
      <Outlet/>
      {popup.status && <Popup/>}
      <Footer />
    </>
  );
}

export default App;

