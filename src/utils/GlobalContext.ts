import { createContext, useContext } from "react";
import { TGlobalState } from "./type";

export const GlobalContext = createContext<TGlobalState>({
    userData: {
        name: "",
        email: "",
    },
    questions: [],
    setUserData: () => {},
    setQuestions: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);
