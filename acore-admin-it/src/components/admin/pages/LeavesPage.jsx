import React, { useState } from "react";

const LeavesPage = () => {
  const [leaves, setLeaves] = useState([
    {
      id: 1,
      employee: "John Doe",
      type: "Sick Leave",
      from: "2025-02-18",
      to: "2025-02-20",
      days: 3,
      reason: "Fever & Health Issue",
      status: "Pending"
    },
    {
      id: 2,
      employee: "Jane Smith",
      type: "Casual Leave",
      from: "2025-02-22",
      to: "2025-02-23",
      days: 2,
      reason: "Family Function",
      status: "Approved"
    }
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const updateStatus = (id, status) => {
    setLeaves(
      leaves.map(l =>
        l.id === id ? { ...l, status } : l
      )
    );
  };

  const deleteLeave = (id) => {
    if (window.confirm("Delete Leave Request?")) {
      setLeaves(leaves.filter(l => l.id !== id));
    }
  };

  const filtered = leaves
    .filter(l =>
      l.employee.toLowerCase().includes(search.toLowerCase())
    )
    .filter(l => (filter === "All" ? true : l.status === filter));

  const statusColor = (status) => {
    if (status === "Approved") return { background: "#064e3b", color: "#6ee7b7" };
    if (status === "Rejected") return { background: "#4c0519", color: "#fda4af" };
    return { background: "#1e3a8a", color: "#93c5fd" };
  };

  return (
    <div style={{ color: "white" }}>
      
      {/* HEADER */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <h2 style={{ marginBottom:"4px" }}>📝 Leave Management</h2>
          <p style={{ color:"#9ca3af", fontSize:"13px" }}>
            Manage employee leave requests
          </p>
        </div>
      </div>

      {/* CARDS */}
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
        gap:"16px",
        margin:"18px 0"
      }}>
        <Card icon="📝" title="Total Requests" value={leaves.length} color="#374151"/>
        <Card icon="✅" title="Approved" value={leaves.filter(l=>l.status==="Approved").length} left="#10b981"/>
        <Card icon="⛔" title="Rejected" value={leaves.filter(l=>l.status==="Rejected").length} left="#ef4444"/>
        <Card icon="⏳" title="Pending" value={leaves.filter(l=>l.status==="Pending").length} left="#3b82f6"/>
      </div>

      {/* FILTER BAR */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <h3>📋 Leave Requests</h3>

        <div style={{ display:"flex", gap:"10px" }}>
          <input
            placeholder="Search employee..."
            style={input}
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />

          <select
            style={input}
            value={filter}
            onChange={(e)=>setFilter(e.target.value)}
          >
            <option>All</option>
            <option>Approved</option>
            <option>Rejected</option>
            <option>Pending</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <table style={{ width:"100%", marginTop:"10px", borderCollapse:"collapse" }}>
        <thead>
          <tr>
            <Th>Employee</Th>
            <Th>Leave Type</Th>
            <Th>From</Th>
            <Th>To</Th>
            <Th>Days</Th>
            <Th>Reason</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </tr>
        </thead>

        <tbody>
          {filtered.map(l => (
            <tr key={l.id}>
              <TdWhite>{l.employee}</TdWhite>
              <Td>{l.type}</Td>
              <Td>{l.from}</Td>
              <Td>{l.to}</Td>
              <Td>{l.days}</Td>
              <Td>{l.reason}</Td>

              <Td>
                <span style={{
                  padding:"6px 10px",
                  borderRadius:"8px",
                  fontSize:"11px",
                  ...statusColor(l.status)
                }}>
                  {l.status}
                </span>
              </Td>

              <Td>
                {l.status !== "Approved" && (
                  <button style={btnGreen} onClick={()=>updateStatus(l.id,"Approved")}>✔</button>
                )}

                {l.status !== "Rejected" && (
                  <button style={btnYellow} onClick={()=>updateStatus(l.id,"Rejected")}>✖</button>
                )}

                <button style={btnRed} onClick={()=>deleteLeave(l.id)}>🗑</button>
              </Td>
            </tr>
          ))}

          {filtered.length === 0 && (
            <tr>
              <td colSpan={8} style={{ textAlign:"center", padding:"20px" }}>
                ❌ No Leave Requests Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
};

/* ---------- Reusable Components ---------- */
const Card = ({ icon,title,value,left }) => (
  <div style={{
    background:"#1e293b",
    border:"1px solid #374151",
    borderRadius:"8px",
    padding:"14px",
    borderLeft: left ? `4px solid ${left}` : "4px solid #6b7280"
  }}>
    <div style={{ fontSize:"25px" }}>{icon}</div>
    <h3>{title}</h3>
    <p style={{ fontSize:"28px", fontWeight:"bold" }}>{value}</p>
  </div>
);

const Th = ({children}) => (
  <th style={{
    textAlign:"left",
    padding:"10px",
    background:"#111827",
    borderBottom:"1px solid #374151",
    color:"#9ca3af"
  }}>{children}</th>
);

const Td = ({children}) => (
  <td style={{
    padding:"12px",
    borderBottom:"1px solid #374151"
  }}>{children}</td>
);

const TdWhite = ({children}) => (
  <Td>
    <span style={{ color:"white" }}>{children}</span>
  </Td>
);

const input = {
  background:"#020617",
  color:"white",
  border:"1px solid #374151",
  padding:"10px",
  borderRadius:"6px"
};

const btnGreen = { background:"#10b981", border:0, padding:"6px 8px", marginRight:"6px", borderRadius:"6px", cursor:"pointer" };
const btnYellow = { background:"#f59e0b", border:0, padding:"6px 8px", marginRight:"6px", borderRadius:"6px", cursor:"pointer" };
const btnRed = { background:"#ef4444", border:0, padding:"6px 8px", borderRadius:"6px", cursor:"pointer" };

export default LeavesPage;
