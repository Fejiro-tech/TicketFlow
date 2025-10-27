import { useState } from "react"
import {Link, useNavigate} from "react-router-dom"

export default function LoginPage() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLogin, setIsLogin] = useState(false);
    const [emailError, setEmailError] = useState(""); 
    const [passwordError, setPasswordError] = useState("");


    const handleLogin = (e) => {
        e.preventDefault();

        if (!email) {
            setEmailError("Email is required");
            setIsLogin = false;
        }

        if (!password) {
            setPasswordError("Password is required");
            setIsLogin = false;
        } 

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setEmailError("Please enter a valid email address!");
            setIsLogin = false;
        }
        
        const storedUsers = JSON.parse(localStorage.getItem("users")) || []; 

        const foundUser = storedUsers.find(
            (user) => user.email === email && user.password === password
        );

        function generateToken() {

            const randomPart = Math.random().toString(36).substring(2);
            const timePart = Date.now().toString(36);

            return randomPart + timePart;
        }

        if(foundUser) {
            const token = generateToken();

            const session = {
                token: token,
                email: foundUser.email,
                isLoggedIn: true,
                loginTime: Date.now()
            };
            
            localStorage.setItem("ticketapp_session", JSON.stringify(session));

            navigate('/dashboard')
            setEmail("");
            setPassword("");

        } else {
            alert ("Invalid credentials or user not found");
        }
       
    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-10">
            <div className="max-w-[900px] px-6 py-20 text-center bg-gray-800 rounded-3xl shadow-lg p-10 w-full ">
                <h1 className="text-2xl font-bold text-blue-400">Welcome Back</h1>
                <p className="text-md text-blue-400 ">Enter your email and password to access your account</p>


                <form onSubmit={handleLogin} className="flex flex-col gap-6 items-center w-full py-10" noValidate>
                    
                    <div className="flex flex-col gap-2  w-full  max-w-[600px]">
                        <label for="fullName" className="text-left text-blue-400 font-medium">Email</label>
                        <input type="email" 
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailError(""); 
                            }}
                                
                                className="bg-blue-100  px-4 py-2 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400" 
                        />
                        {emailError ? <p className="text-red-400 text-left">{emailError}</p> : "" }
                        
                    </div>

                    <div className="flex flex-col gap-2 items-start w-full max-w-[600px]">
                        <label className="text-left text-blue-400 font-medium">Password</label>
                        <input type="password" 
                                placeholder="Enter your password" 
                                value={password}
                                 onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordError(""); 
                            }}
                                className="bg-blue-100 w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400" 
                                
                        />
                        {passwordError ? <p className="text-red-400">{passwordError}</p> : "" }
                    </div> 

                    <button type="submit" className=" bg-blue-500 py-2 w-full max-w-[600px] rounded-lg text-white font-bold text-md cursor-pointer hover:bg-blue-600 transition">Sign In</button>
                </form>

                <div className="text-center ">
                    <p className="text-gray-400">
                       Don't have an account?{' '}
                        <button onClick={() => navigate("/signup")} className="text-blue-400 font-bold cursor-pointer">
                        Sign Up
                        </button>
                    </p>
                </div>
            </div>
            
        </div>
    )
}