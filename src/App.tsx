import PrivateRoute from "./auth/PrivateRoute";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
                <Switch>
                    <PrivateRoute exact path="/" component={Quiz} />
                    <Route exact path="/login" component={Login} />
                </Switch>
            </BrowserRouter>
        </GlobalContext.Provider>
    );
}

export default App;
