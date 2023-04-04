import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";
import MainHeader from "./components/MainHeader/MainHeader";
import Popup from "./components/Auth/Signup/Popup";
import loadingGif from "./assets/gifs/loading.gif";

function App() {
  const user=useSelector((state) => state.mazdoorStore.user);
  const popup=useSelector(state=>state.mazdoorStore.popup);
  const loading = useSelector((state) => state.mazdoorStore.loading);
  return (
    <>
      {user ? <MainHeader /> : <Header />}
      <Outlet/>
      {popup.status && <Popup/>}
      <Footer />
      {loading && <div className="popup-overlay">
        <div className="popup-container">
          <img className="h-[10vw]" src={loadingGif} alt="loading"/>
        </div>
      </div>}
    </>
  );
}

export default App;

