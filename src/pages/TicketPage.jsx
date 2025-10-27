import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicketAlt, faEdit, faTrash, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-hot-toast';



export default function TicketPage() {

    const navigate = useNavigate();
    const sessionText = localStorage.getItem("ticketapp_session");
    const session = sessionText ? JSON.parse(sessionText) : null;

    if( !session || !session.token || !session.isLoggedIn) {
        window.location.href = "/login";
        return null;
    }

    const [tickets, setTickets] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("open");
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);


    useEffect(() => {
        const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
        setTickets(storedTickets);
    }, []);

    useEffect(() => {
        if (tickets.length > 0) {
            localStorage.setItem("tickets", JSON.stringify(tickets));
        }
    }, [tickets]);

    const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) {
      toast.error("Please fill all fields");
      return;
    }

    if (editingId) {
      const updatedTickets = tickets.map((t) =>
        t.id === editingId
          ? { ...t, title, description, status }
          : t
      );
      setTickets(updatedTickets);
      toast.success("Ticket updated successfully!");
      setEditingId(null);

    } else {

      const newTicket = {
        id: Date.now(),
        title,
        description,
        status,
        createdAt: new Date().toLocaleString(),
      };
       setTickets((prevTickets) => [...prevTickets, newTicket]);
       toast.success("Ticket created successfully!");
    }

    setTitle("");
    setDescription("");
    setStatus("open");
    setShowForm(false);
  };

  const handleEdit = (ticket) => {
    setEditingId(ticket.id);
    setTitle(ticket.title);
    setDescription(ticket.description);
    setStatus(ticket.status);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this ticket?")) {
      const updatedTickets = tickets.filter((t) => t.id !== id);
      setTickets(updatedTickets);
       toast.success("Ticket deleted successfully!");
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("ticketapp_session");
    toast.success("You have been logged out.");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
        <header className="border-b border-gray-800">
            <nav className="flex items-center justify-between max-w-[1440px] mx-auto px-4 py-4">
                <h1 className="hidden md:flex font-bold text-blue-400 text-lg sm:text-xl md:text-2xl">
                TicketFlow
                </h1>

                <div className="flex md:hidden items-center justify-start w-full text-blue-400 text-xl mr-4 ">
                <FontAwesomeIcon icon={faTicketAlt} />
                </div>

                <div className="flex items-center gap-3 sm:gap-5 md:gap-8">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="py-2 text-blue-400 hover:text-blue-300 font-bold transition whitespace-nowrap cursor-pointer"
                >
                    Dashboard
                </button>

                <button
                    onClick={() => {
                    setShowForm(!showForm);
                    setEditingId(null);
                    setTitle("");
                setDescription("");
                setStatus("open");
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-2 rounded-lg text-sm sm:text-base font-semibold whitespace-nowrap cursor-pointer"
                >
                    + {editingId ? "Edit" : "Create"} Ticket
                </button>

                <button
                    onClick={handleLogOut}
                    className="text-blue-400 hover:text-blue-300 font-bold transition flex items-center gap-2 whitespace-nowrap cursor-pointer"
                >
                    <FontAwesomeIcon icon={faCircleUser} className="text-gray-500 text-xl" />
                    Logout
                </button>
            </div>
            </nav>
        
        </header>

        <main className="max-w-[1440px] mx-auto px-6 py-10">

            {showForm && (
                <section 
                    id="ticket-form"
                    className="bg-gray-800 p-6 rounded-lg my-6"
                    aria-labelledby="form-heading"
                >
                    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg my-6">
                        <h2 className="text-xl font-semibold mb-4">
                        {editingId ? "Edit Ticket" : "Create Ticket"}
                        </h2>

                        <input
                        type="text"
                        placeholder="Ticket Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2 mb-3 rounded bg-gray-700"
                        />

                        <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 mb-3 rounded bg-gray-700"
                        />

                        <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full p-2 mb-4 rounded bg-gray-700"
                        >
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="closed">Closed</option>
                        </select>

                        <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                        >
                        {editingId ? "Update Ticket" : "Save Ticket"}
                        </button>
                    </form>

                </section>
            
            )}

            <section aria-labelledby="tickets-heading">
            
                <div className="space-y-4">
                    {tickets.length === 0 ? (
                        <p className="text-gray-400">No tickets yet. Create one!</p>
                    ) : (
                        tickets.map((ticket) => (
                        <div
                            key={ticket.id}
                            className="bg-gray-800 p-4 rounded flex justify-between items-center"
                        >
                            <div>
                            <h3 className="text-lg font-semibold">{ticket.title}</h3>
                            <p className="text-gray-400 text-sm">{ticket.description}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                {ticket.createdAt}
                            </p>
                            </div>

                            <div className="flex items-center gap-3">
                            <span
                                className={`px-3 py-1 rounded text-sm font-medium ${
                                ticket.status === "open"
                                    ? "bg-green-500/20 text-green-400"
                                    : ticket.status === "in_progress"
                                    ? "bg-amber-500/20 text-amber-400"
                                    : "bg-gray-500/20 text-gray-400"
                                }`}
                            >
                                {ticket.status}
                            </span>

                            <button
                                onClick={() => handleEdit(ticket)}
                                className="text-blue-400 hover:text-blue-500"
                                title="Edit"
                            >
                                <FontAwesomeIcon icon={faEdit} />
                            </button>

                            <button
                                onClick={() => handleDelete(ticket.id)}
                                className="text-red-400 hover:text-red-500"
                                title="Delete"
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                            </div>
                        </div>
                        ))
                    )}
                </div>
            </section>
            
        </main>
</div>
    
  );
}
