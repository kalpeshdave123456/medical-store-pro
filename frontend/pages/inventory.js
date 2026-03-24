import { useState, useEffect } from "react";

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({});

  const load = () => {
    fetch("http://localhost:5000/inventory")
      .then(res => res.json())
      .then(setItems);
  };

  useEffect(load, []);

  const add = async () => {
    await fetch("http://localhost:5000/inventory", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(form)
    });
    load();
  };

  return (
    <div>
      <h1>Inventory</h1>

      <input placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})}/>
      <input placeholder="Qty" onChange={e=>setForm({...form,qty:e.target.value})}/>
      <button onClick={add}>Add</button>

      {items.map(i => (
        <p key={i.id}>{i.name} | Qty: {i.qty}</p>
      ))}
    </div>
  );
}
