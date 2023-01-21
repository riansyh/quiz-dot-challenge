export type TUserData = {
    name: string;
    email: string;
    deadline: Date;
};

export type TGlobalState = {
    userData: TUserData;
    setUserData: (c: TUserData) => void;
    questions: TQuestion[];
    setQuestions: (c: TQuestion[]) => void;
};

export type TQuestion = {
    question: string;
    correctAnswer: string;
    userAnswer: string;
};

export type TFormValues = {
    name: string;
    email: string;
    password: string;
};
