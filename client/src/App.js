import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";
import MainHeader from "./components/MainHeader/MainHeader";
import Popup from "./components/Popup";
import loadingGif from "./assets/gifs/loading.gif";
import { ProfileCompletedMsg } from "./components/ProfileCompletedMsg";
import { useLocation } from "react-router-dom"
import NotificationContainer from "react-notifications/lib/NotificationContainer";

function App() {
  const location = useLocation()
  const currentURL = location.pathname;
  const profileCompleted=useSelector(state=>state.mazdoorStore.profileCompleted);
  const user=useSelector((state) => state.mazdoorStore.user);
  const popup=useSelector(state=>state.mazdoorStore.popup);
  const loading = useSelector((state) => state.mazdoorStore.loading);
  return (
    <>
      {user ? <MainHeader /> : <Header />}
      {user && user.role==="LABOR" && !currentURL.match(/^\/dashboard\/.*$/) && !user.profileCompleted && !profileCompleted.status && <ProfileCompletedMsg/>}
      <Outlet/>
      {popup.status && <Popup/>}
      <Footer />
      {loading && <div className="popup-overlay">
        <div className="popup-container">
          <img className="h-[10vw]" src={loadingGif} alt="loading"/>
        </div>
      </div>}
      <NotificationContainer/>
    </>
  );
}

export default App;

