import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home/Home";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {loadMazdoors, loadTeam} from "./store/mazdoor/mazdoorSlice";
import Footer from "./components/Footer";


function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadMazdoors());
        dispatch(loadTeam());
    }, [])
    return (
        <>
            <Header/>
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    {/*<Route path="/login" element={<Navigate to="/"/>}/>*/}
                </Routes>
            </Router>
            <Footer/>
        </>
    );
}

export default App;

