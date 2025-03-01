import React, { useState } from 'react';
import './LoginSignup.css'

const LoginSignup = () => {
    const [state, setState] = useState("Login");
    const [formData, setformData] = useState({
        username: "",
        password: "",
        email: ""
    });
    const [error, setError] = useState(null);

    const changeHandler = (e) => {
        setformData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page refresh
        setError(null); // Reset any previous errors
        let responseData;

        const url = state === "Login" 
            ? 'https://shophub-repo-7.onrender.com/login' 
            : 'https://shophub-repo-7.onrender.com/signup';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            responseData = await response.json();

            if (responseData.success) {
                localStorage.setItem('auth-token', responseData.token);
                window.location.replace("/");
            } else {
                setError(responseData.error);
            }
        } catch (err) {
            setError("Something went wrong. Please try again later.");
        }
    };

    return (
        <div className="main_container flex items-center justify-center min-h-screen bg-slate-800">
            <div className="login-container w-full max-w-md p-8 space-y-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center">{state}</h1>

                {error && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {state === "Sign Up" && (
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter Username"
                                value={formData.username}
                                onChange={changeHandler}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    )}
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email ID"
                            value={formData.email}
                            onChange={changeHandler}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={changeHandler}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >{state}</button>
                </form>

                {state === "Login" ? (
                    <div className="text-sm text-center">
                        New Customer?{' '}
                        <span role="button" className="text-indigo-600 hover:underline" onClick={() => setState("Sign Up")}>Register</span>
                    </div>
                ) : (
                    <div className="text-sm text-center">
                        Already have an account?{' '}
                        <span role="button" className="text-indigo-600 hover:underline" onClick={() => setState("Login")}>Login</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginSignup;