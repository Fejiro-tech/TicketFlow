import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTicketAlt, faSignOutAlt, faBell, faCheck, faCheckSquare, faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function Dashboard() {

    const navigate = useNavigate()

    const [openCount, setOpenCount] = useState(0);
    const [inProgressCount, setInProgressCount] = useState(0);
    const [closedCount, setClosedCount] = useState(0);

    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];

    const sessionText = localStorage.getItem("ticketapp_session");
    const session = sessionText ? JSON.parse(sessionText) : null;

    if( !session || !session.token || !session.isLoggedIn) {
        window.location.href = "/login";
        return null;
    }

    const loggedInEmail = session ? session.email : null;

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const currentUser = storedUsers.find((user) => user.email === loggedInEmail);

    
    useEffect(() => {
    const loadTickets = () => {
        const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
        setOpenCount(storedTickets.filter(t => t.status === "open").length);
        setInProgressCount(storedTickets.filter(t => t.status === "in_progress").length);
        setClosedCount(storedTickets.filter(t => t.status === "closed").length);
    };

    loadTickets();
    window.addEventListener("storage", loadTickets);

        return () => window.removeEventListener("storage", loadTickets);
        }, []);


    const handleLogOut = () => {
        localStorage.removeItem("ticketapp_session");
        toast.success("You have been logged out.");
        navigate('/');

    }


    return (
        <div className=" min-h-screen bg-gray-900  mx-auto px-6 py-10">
            <div className="max-w-[1440px] mx-auto">
                <nav className=" px-6 py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold text-blue-400">TicketFlow</div>

                    <div className="flex gap-6">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className=" py-2 text-blue-400 hover:text-blue-300 font-medium transition cursor-pointer"
                        >
                            Dashboard
                        </button>

                        <button
                            onClick={() => navigate('/ticket')}
                            className="py-2 text-blue-400 hover:text-blue-300 font-bold transition cursor-pointer"
                        >
                            Tickets
                        </button>
                    </div>

                    <div>
                        <button onClick={handleLogOut}

                            className=" text-blue-400 hover:text-blue-300 font-bold transition cursor-pointer flex items-center justify-center">
                                <FontAwesomeIcon icon= {faCircleUser} className='text-gray-500 text-2xl mr-1' />
                                Logout
                            </button>
                    </div>
                
                </nav>

                <div className="bg-blue-500 rounded-2xl max-w-[1200px] mx-auto p-10 px-6 flex flex-col justify-center mt-12">
                    <h1 className="text-4xl font-bold text-gray-100">Welcome back, {currentUser.firstName}👋</h1>
                    <p className="text-gray-200">Here is what's happening today.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 max-w-[1200px] text-center py-10 mx-auto">
        
                    <div className="bg-gray-800 p-6 rounded-xl">
                        <p className="text-sm text-gray-400">Open Tickets</p>
                        <h2 className="text-4xl font-bold text-green-400">{openCount}</h2>
                    </div>

                    <div className="bg-gray-800 p-6 rounded-xl">
                        <p className="text-sm text-gray-400">In_Progress</p>
                        <h2 className="text-4xl font-bold text-amber-400">{inProgressCount}</h2>
                    </div> 

                    <div className="bg-gray-800 p-6 rounded-xl">
                        <p className="text-sm text-gray-400">Closed Tickets</p>
                        <h2 className="text-4xl font-bold text-gray-400">{closedCount}</h2>
                    </div>

                </div>
                <div className=' flex items-center justify-center'>
                    <a href='/ticket' className='text-white p-4 bg-blue-500 hover:bg-blue-600 transition rounded'>Manage Tickets</a >
                </div>
                
            </div>
            
        
        </div>
    )
}