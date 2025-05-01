import axios, { AxiosError } from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../App";
import Loading from "../components/Loading";

const SignupPage = ({
    Data,
}: {
    Data: {
        token: string;
        setTokenFunction: (string: string) => void;
        id: string;
        setIdFunction: (string: string) => void;
    };
}) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setisLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSignUp = () => {
        setisLoading(true);
        try {
            if (password !== confirmPassword) {
                setMessage(
                    "Password and confirm password do not match. Please make sure you enter the same password in both fields."
                );
                return;
            }
            axios
                .post(`${API_URL}/api/accounts/signup`, {
                    username: username,
                    email: email,
                    password: password,
                })
                .then(({ data }) => {
                    Data.setTokenFunction(data.token);
                    Data.setIdFunction(data.id);
                    navigate("/problemset");
                })
                .catch((e: AxiosError) => {
                    setisLoading(false);
                    setMessage(
                        (
                            e.response?.data as {
                                success: boolean;
                                message: string;
                            }
                        ).message
                    );
                });
        } catch (error) {
            console.error("Sign-up failed:", error);
        }
    };
    return (
        <>
            <Link to={"/"}>
                <div
                    id="logo-cont"
                    className="inline-block relative text-[24px] left-1/2 -translate-x-1/2 font-bold italic mx-auto mt-[12px]"
                >
                    <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500 px-[1px]">
                        Code
                    </span>
                    <span className="text-black">Cloud</span>
                </div>
            </Link>
            <div className="min-h-fit w-[300px] mx-auto text-[14px]">
                <div className="relative bg-black shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <h2 className="text-[34px] font-bold mb-[30px] text-center mt-[60px] text-white">
                        Sign Up
                    </h2>
                    <div className="mb-4">
                        <input
                            className="appearance-none border w-full py-2 px-3 text-white placeholder:text-gray-500 focus:placeholder:text-blue-500 bg-black rounded border-borders leading-tight focus:outline-none focus:border-blue-500 transition-colors"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required={true}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            className="appearance-none border w-full py-2 px-3 text-white placeholder:text-gray-500 focus:placeholder:text-blue-500 bg-black rounded border-borders leading-tight focus:outline-none focus:border-blue-500 transition-colors"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required={true}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            className="appearance-none border w-full py-2 px-3 text-white placeholder:text-gray-500 focus:placeholder:text-blue-500 bg-black rounded border-borders leading-tight focus:outline-none focus:border-blue-500 transition-colors"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required={true}
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            className="appearance-none border w-full py-2 px-3 text-white placeholder:text-gray-500 focus:placeholder:text-blue-500 bg-black rounded border-borders leading-tight focus:outline-none focus:border-blue-500 transition-colors"
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required={true}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-[6px] px-4 rounded focus:outline-none focus:shadow-outline w-full transition"
                            type="button"
                            onClick={handleSignUp}
                        >
                            {isLoading ? (
                                <div className="w-full block h-[21px]">
                                    <div className="absolute left-1/2 -translate-x-1/2">
                                        <Loading />
                                    </div>
                                </div>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </div>
                    <div className="flex items-center justify-between mt-[20px]">
                        <span className="text-white">
                            Already have an account?{" "}
                        </span>
                        <Link
                            to="/login"
                            className="text-blue-500 hover:text-cyan-500 transition-colors"
                        >
                            Login
                        </Link>
                    </div>
                    <div className="text-center mt-[20px] text-red-600 w-full overflow-hidden">
                        {message}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignupPage;
