import { useEffect, useState } from "react";
import { useGlobalContext } from "../utils/GlobalContext";
import { useCountdown } from "../utils/useCountdown";
import { Questions } from "./Questions";
import { useNavigate } from "react-router-dom";

export const Quiz = () => {
    const { userData, setUserData, questions, setQuestions } = useGlobalContext();
    const deadline = localStorage.getItem("deadline");
    const [, , minutes, seconds] = useCountdown(deadline!);
    const [isFinish, setIsFinish] = useState(false);

    const navigate = useNavigate();

    const [result, setResult] = useState({
        correct: 0,
        incorrect: 0,
    });
    const [answeredCount, setAnsweredCount] = useState(0);

    useEffect(() => {
        if (questions.length > 0) {
            const answeredQuestion = questions.filter((question) => question.userAnswer !== "");
            setAnsweredCount(answeredQuestion.length);
        }
    }, [questions]);

    useEffect(() => {
        if (questions.length > 0) {
            const correct = questions.filter(
                (item) => item.correctAnswer == item.userAnswer
            ).length;
            const incorrect = questions.filter(
                (item) => item.correctAnswer != item.userAnswer
            ).length;

            setResult(() => ({
                correct: correct,
                incorrect: incorrect,
            }));
        }

        if (isFinish) {
            localStorage.removeItem("questions");
            localStorage.removeItem("auth");
        }
    }, [isFinish]);

    useEffect(() => {
        const user = localStorage.getItem("userData");
        if (user) {
            setUserData(JSON.parse(user));
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setQuestions([]);
        navigate("/login");
    };

    return (
        <main className="bg-slate-100 text-gray-900 font-sans h-screen w-full">
            <section className="flex items-center h-screen w-full">
                {minutes + seconds <= 0 || isFinish ? (
                    <div className="w-full flex flex-col items-center justify-center min-h-[500px] md:min-h-[320px] bg-white rounded-lg shadow-lg p-8 m-4 md:max-w-screen-md md:mx-auto gap-12">
                        <div className="flex w-full flex-col text-center">
                            <h1 className="text-3xl text-gray-800 font-semibold">
                                Hey {userData?.name?.split(" ")[0]}, thank you for taking the quiz!
                            </h1>
                            <p className="text-sm text-gray-500">
                                If you refresh this page, you will log out automatically.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-end w-full px-12">
                            <div className="flex flex-col gap-2 items-center">
                                <h2 className="text-slate-700 w-[100px] text-center">Correct</h2>
                                <p className="font-bold text-3xl text-green-600">
                                    {result?.correct}
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 items-center">
                                <h2 className="text-slate-700 w-[100px] text-center">Incorrect</h2>
                                <p className="font-bold text-3xl text-red-600">
                                    {result?.incorrect}
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 items-center">
                                <h2 className="text-slate-700 w-[100px] text-center leading-none">
                                    Answered Questions
                                </h2>
                                <p className="font-bold text-3xl">{answeredCount}</p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={handleLogout}
                                className="button bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                ) : (
                    <Questions
                        minutes={minutes}
                        seconds={seconds}
                        answeredCount={answeredCount}
                        setFinish={() => setIsFinish(true)}
                    />
                )}
            </section>
        </main>
    );
};
