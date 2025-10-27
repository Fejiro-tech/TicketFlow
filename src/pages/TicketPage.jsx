import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicketAlt, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
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
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <div className="max-w-[1440px] mx-auto">
        <nav className="px-6 py-4 flex justify-between items-center">
          <div className="hidden md:flex text-2xl font-bold text-blue-400 items-center gap-2">
            <FontAwesomeIcon icon={faTicketAlt} />
            All Tickets
          </div>

          <div className="flex md:hidden text-blue-400 text-xl">
            <FontAwesomeIcon icon={faTicketAlt} />
        </div>

          <div className="flex gap-2 sm:gap-3 flex-nowrap items-center">
             <button
              onClick={() => navigate('/dashboard')}
              className="py-1.5 px-1 sm:py-2 sm:px-3 border border-blue-400 rounded-lg text-blue-400 hover:text-blue-300 font-bold transition cursor-pointer text-sm sm:text-base"
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
              className="bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-1 sm:py-2 sm:px-3 rounded-lg text-sm sm:text-base"
            >
              + {editingId ? "Edit" : "Create"} Ticket
            </button>

            <button
              onClick={handleLogOut}
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-1 sm:py-2 sm:px-3 rounded-lg text-sm sm:text-base"
            >
              Logout
            </button>
          </div>
        </nav>

        {showForm && (
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
        )}

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
      </div>
    </div>
  );
}
