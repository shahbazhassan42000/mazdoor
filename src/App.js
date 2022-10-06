import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home/Home";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {loadMazdoors} from "./store/mazdoor/mazdoorSlice";


function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadMazdoors());
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
        </>
    );
}

export default App;
