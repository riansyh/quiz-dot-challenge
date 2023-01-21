import PrivateRoute from "./auth/PrivateRoute";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Login } from "./components/Login";
import { Quiz } from "./components/Quiz";
import { GlobalContext } from "./utils/GlobalContext";
import { useState } from "react";
import { TUserData, TQuestion } from "./utils/type";

function App() {
    const [userData, setUserData] = useState({} as TUserData);
    const [questions, setQuestions] = useState({} as TQuestion[]);

    return (
        <GlobalContext.Provider value={{ userData, setUserData, questions, setQuestions }}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <Quiz />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </GlobalContext.Provider>
    );
}

export default App;
