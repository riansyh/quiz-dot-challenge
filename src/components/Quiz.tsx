import axios from "axios";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../utils/GlobalContext";
import parse from "html-react-parser";
import clsx from "clsx";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

export const Quiz = () => {
    const { userData, setQuestions, questions } = useGlobalContext();

    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const [answeredCount, setAnsweredCount] = useState(0);

    const handlePrev = () => {
        if (activeQuestionIndex > 0) {
            setActiveQuestionIndex((prev) => (prev -= 1));
        }
    };

    const handleNext = () => {
        if (activeQuestionIndex < 9) {
            setActiveQuestionIndex((prev) => (prev += 1));
        }
    };

    const handleChooseAnswer = (option: string) => {
        const newQuestions = questions;

        if (option === questions[activeQuestionIndex].userAnswer) {
            newQuestions[activeQuestionIndex].userAnswer = "";
        } else {
            newQuestions[activeQuestionIndex].userAnswer = option;
        }

        setQuestions([...newQuestions]);

        if (newQuestions[activeQuestionIndex].userAnswer !== "")
            setTimeout(() => {
                handleNext();
            }, 300);
    };

    useEffect(() => {
        axios
            .get("https://opentdb.com/api.php?amount=10&type=boolean")
            .then((res) => res.data)
            .then((data) => {
                const filteredData = data.results.map((question: any) => ({
                    question: question.question,
                    correctAnswer: question.correct_answer,
                    userAnswer: "",
                }));

                setQuestions(filteredData);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        if (questions.length > 0) {
            const answeredQuestion = questions.filter((question) => question.userAnswer !== "");
            setAnsweredCount(answeredQuestion.length);
        }
    }, [questions]);

    return (
        <main className="bg-slate-100 text-gray-900 font-sans h-screen w-full">
            <section className="flex items-center h-screen w-full">
                <div className="w-full flex flex-col items-center justify-between min-h-[500px] md:min-h-[320px] bg-white rounded-lg shadow-lg p-8 m-4 md:max-w-screen-md md:mx-auto">
                    <div className="flex w-full justify-between">
                        <div>
                            <p className="">Answered: {answeredCount}</p>
                        </div>

                        <div className="timer">00:00:00</div>
                    </div>

                    {questions.length > 0 && (
                        <div className="question w-full">
                            <p className="text-center h-32 md:h-20">
                                {parse(questions[activeQuestionIndex].question)}
                            </p>

                            <div className="flex w-full justify-between mt-4 gap-3">
                                <button
                                    onClick={() => handleChooseAnswer("True")}
                                    className={clsx(
                                        `button flex-1 border-2 border-blue-500 hover:bg-blue-50`,
                                        questions[activeQuestionIndex].userAnswer === "True" &&
                                            "bg-blue-500 text-white hover:bg-blue-600"
                                    )}
                                >
                                    True
                                </button>
                                <button
                                    onClick={() => handleChooseAnswer("False")}
                                    className={clsx(
                                        `button flex-1 border-2 border-blue-500 hover:bg-blue-50`,
                                        questions[activeQuestionIndex].userAnswer === "False" &&
                                            "bg-blue-500 text-white hover:bg-blue-600"
                                    )}
                                >
                                    False
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-center items-center w-full relative">
                        <div className="flex gap-2">
                            <button onClick={handlePrev} disabled={activeQuestionIndex === 0}>
                                <BsChevronLeft
                                    className={clsx(
                                        "text-gray-500",
                                        activeQuestionIndex !== 0
                                            ? "hover:text-blue-700"
                                            : "text-gray-300"
                                    )}
                                />
                            </button>
                            <p className="w-16 flex items-center justify-center text-gray-400">
                                {activeQuestionIndex + 1} / 10
                            </p>
                            <button onClick={handleNext} disabled={activeQuestionIndex === 9}>
                                <BsChevronRight
                                    className={clsx(
                                        "text-gray-500",
                                        activeQuestionIndex !== 9
                                            ? "hover:text-blue-700"
                                            : "text-gray-300"
                                    )}
                                />
                            </button>
                        </div>

                        {activeQuestionIndex === 9 && (
                            <button className="absolute right-0 button text-white px-6 bg-green-500 hover:bg-green-600">
                                Finish
                            </button>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
};
