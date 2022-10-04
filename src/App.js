import './App.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home/Home";

function App() {
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
