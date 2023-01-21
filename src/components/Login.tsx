import { useEffect } from "react";
import { useForm, Resolver } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../utils/GlobalContext";
import { TFormValues } from "../utils/type";

const resolver: Resolver<TFormValues> = async (values) => {
    return {
        values: values.name ? values : {},
        errors:
            !values.name || !values.email || !values.password
                ? {
                      name: {
                          type: "required",
                          message: "Please input your name!",
                      },
                      email: {
                          type: "required",
                          message: "Please input your email!",
                      },
                      password: {
                          type: "required",
                          message: "Please input your password!",
                      },
                  }
                : {},
    };
};

export const Login = () => {
    const { setUserData } = useGlobalContext();
    const navigate = useNavigate();
    const token = localStorage.getItem("auth");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TFormValues>({ resolver });

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, []);

    const onSubmit = handleSubmit((data) => {
        const oldDate = new Date();
        const deadlineDate = new Date(oldDate.getTime() + 10 * 60000);

        localStorage.setItem("auth", "1hAhkjdf93hASAsajhcW123");
        localStorage.setItem("deadline", deadlineDate.toISOString());

        setUserData({
            name: data.name,
            email: data.email,
            deadline: new Date(oldDate.getTime() + 10 * 60000), //set deadline 10 minute
        });

        navigate("/");
    });

    return (
        <main className="bg-slate-100 text-gray-900 font-sans h-screen w-full">
            <section className="flex items-center h-screen w-full">
                <div className="w-full bg-white rounded-lg shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
                    <span className="block w-full text-xl uppercase font-bold mb-4">
                        Login to Start Quiz
                    </span>
                    <form className="mb-4" onSubmit={onSubmit}>
                        <div className="mb-4 md:w-full">
                            <label htmlFor="name" className="block text-xs mb-1">
                                Name
                            </label>
                            <input
                                {...register("name")}
                                className="input-field"
                                type="name"
                                name="name"
                                id="name"
                                placeholder="Input your name"
                            />
                            {errors?.name && (
                                <p className="text-sm text-red-500">{errors.name.message}</p>
                            )}
                        </div>
                        <div className="mb-4 md:w-full">
                            <label htmlFor="email" className="block text-xs mb-1">
                                Email
                            </label>
                            <input
                                {...register("email")}
                                className="input-field"
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                            />
                            {errors?.email && (
                                <p className="text-sm text-red-500">{errors.email.message}</p>
                            )}
                        </div>
                        <div className="mb-6 md:w-full">
                            <label htmlFor="password" className="block text-xs mb-1">
                                Password
                            </label>
                            <input
                                {...register("password")}
                                className="input-field"
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                            />
                            {errors?.password && (
                                <p className="text-sm text-red-500">{errors.password.message}</p>
                            )}
                        </div>
                        <button className="w-full bg-green-500 hover:bg-green-700 text-white uppercase button">
                            Login
                        </button>
                    </form>
                </div>
            </section>
        </main>
    );
};
