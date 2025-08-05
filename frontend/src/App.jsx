
import { useEffect, useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL;

export default function App() {
  const [secrets, setSecrets] = useState([]);
  const [newSecret, setNewSecret] = useState("");

  useEffect(() => {
    fetch(`${API}/api/secrets`)
      .then(res => res.json())
      .then(setSecrets);
  }, []);

  const submitSecret = async () => {
    const res = await fetch(`${API}/api/secrets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newSecret })
    });
    const data = await res.json();
    setSecrets([data, ...secrets]);
    setNewSecret("");
  };

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Confezz</h1>
      <textarea
        className="w-full p-2 border rounded mb-2"
        rows="3"
        value={newSecret}
        onChange={(e) => setNewSecret(e.target.value)}
        placeholder="Scrivi il tuo segreto..."
      ></textarea>
      <button
        onClick={submitSecret}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Invia
      </button>
      <ul className="space-y-2">
        {secrets.map((s, i) => (
          <li key={i} className="bg-white p-3 shadow rounded">{s.content}</li>
        ))}
      </ul>
    </main>
  );
}
