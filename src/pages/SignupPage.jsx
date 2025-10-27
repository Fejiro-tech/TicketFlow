
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function SignupPage() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    


    const handleSignUp = (e) => {
        e.preventDefault();

        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = existingUsers.some((user) => user.email === email);

        if (userExists) {
            alert("User already exists. Please log in!");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address!");
            return;
        }

        if ( !firstName || !lastName|| !email || !password ) {
            alert("Please fill up all fields!");
            return; 
        }

        const newUser = {firstName, lastName, email, password};
        const updatedUsers = [...existingUsers, newUser];
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        alert("User Registered");

        navigate("/login");


        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");


    }

    return (
        <section className="min-h-screen bg-gray-900 flex items-center justify-center p-10">
            <div className="max-w-[900px] px-6 py-20 text-center bg-gray-800 rounded-3xl shadow-lg p-10 w-full ">
                <h1 className="text-2xl font-bold text-blue-400">Create Your Account?</h1>
                <p className="text-md text-blue-400 ">Join TicketFlow and start managing your tickets.</p> 
                
                <form onSubmit={handleSignUp} className="flex flex-col items-center gap-6 w-full py-16" noValidate>
                    <div className="flex flex-col sm:flex-row justify-between w-full max-w-[600px] gap-4">
                        <input
                            type="name"
                            placeholder="First Name"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            className="p-2 flex-1 bg-blue-100  px-4 py-2 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                        />
                   
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            className="p-2 flex-1 bg-blue-100  px-4 py-2 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                        />
                    </div>
                    <div className="w-full max-w-[600px]">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="p-2 bg-blue-100  px-4 py-2 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 w-full"
                        />
                    </div>
                
                    <div className="w-full max-w-[600px]">
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="p-2 bg-blue-100  px-4 py-2 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 w-full"
                        />
                    </div>
                        
                <button type="submit" className="bg-blue-500 py-2 w-full max-w-[600px] rounded-lg text-white font-bold text-md cursor-pointer hover:bg-blue-600 transition">
                    Sign Up
                </button>
                </form>

                <div className="text-center ">
                    <p className="text-gray-400">
                        Already have an account?{' '}
                        <button onClick={() => navigate("/login")} className="text-blue-400 cursor-pointer font-bold">
                        Login Here
                        </button>
                    </p>
                </div>
            </div>
           
        </section>
     
    )
}