import Layout from "../components/layouts/Layout";

const bookings = [
  {
    id: "BK-001",
    name: "Rarah Mitchell",
    email: "sarah@email.com",
    tour: "Bali Sacred Temple Trail",
    date: "2026-04-12",
    total: "$2,598",
    status: "Confirmed",
  },
  {
    id: "BK-002",
    name: "James Okafor",
    email: "james@email.com",
    tour: "Machu Picchu Trek",
    date: "2026-04-18",
    total: "$5,697",
    status: "Pennding",
  },
  {
    id: "BK-003",
    name: "Priya Sharma",
    email: "priya@email.com",
    tour: "Maldives Island Hopper",
    date: "2026-05-02",
    total: "$4,998",
    status: "Cancelled",
  },
];

const Bookings = () => {
  return (
    <Layout>
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Bookings</h1>
        <p className="text-gray-500"> total bookings</p>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex justify-between items-center mb-4 gap-4">
        <input
          type="text"
          placeholder="🔍 Search..."
          className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none"
        />

        <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg border text-sm hover:bg-gray-200"
            >
              ALL
            </button>
            <button className="px-4 py-2 rounded-lg border text-sm hover:bg-gray-200"
            
            >
              Pendding
            </button>
            <button
              className="px-4 py-2 rounded-lg border text-sm hover:bg-gray-200"
            >
              Confirmed
            </button>
            <button
              
              className="px-4 py-2 rounded-lg border text-sm hover:bg-gray-200"
            >
              Cancelled
            </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-200 text-gray-600 text-sm">
            <tr>
              <th className="p-4">REF</th>
              <th>CUSTOMER</th>
              <th>TOUR</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>STATUS</th>
              <th className="text-center">ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-t hover:bg-gray-200">
                {/* REF */}
                <td className="p-4">
                  <span className="bg-gray-200 px-2 py-1 rounded text-xs">
                    {b.id}
                  </span>
                </td>

                {/* CUSTOMER */}
                <td>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-teal-600 text-white flex items-center justify-center rounded-full">
                      {b.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{b.name}</p>
                      <p className="text-xs text-gray-500">{b.email}</p>
                    </div>
                  </div>
                </td>

                {/* TOUR */}
                <td>{b.tour}</td>

                {/* DATE */}
                <td>{b.date}</td>

                {/* TOTAL */}
                <td className="font-semibold">{b.total}</td>

                {/* STATUS */}
                <td>
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      b.status === "Confirmed"
                        ? "bg-green-100 text-green-600"
                        : b.status === "Cancelled"
                        ? "bg-red-100 text-red-500"
                        
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="text-center">
                  <div className="flex justify-center gap-2">
                    <button className="bg-green-200 text-sm px-2 py-1 rounded hover:bg-green-500">
                      <p>✔️</p>
                    </button>
                    <button className="bg-red-200 text-yellow-50 text-sm px-2 py-1 rounded hover:bg-red-500">
                    <p>❌</p>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Bookings;