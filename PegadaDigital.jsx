import React, { useState } from "react";

export default function PegadaDigital() {
  const [input, setInput] = useState("");
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);

  const verificarPegada = async () => {
    if (!input) return;
    setLoading(true);
    setResultado(null);

    try {
      const response = await fetch(`https://haveibeenpwned-proxy.vercel.app/api/${input}`);
      const data = await response.json();
      setResultado(data);
    } catch (error) {
      setResultado({ erro: "Erro ao verificar. Tenta novamente." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Verificar Pegada Digital</h1>
        <p className="text-sm text-gray-600 mb-2">
          Introduz um email ou número de telemóvel para verificar se esteve envolvido em fugas de dados públicas.
        </p>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            placeholder="email@exemplo.com ou +351912345678"
            className="flex-1 border border-gray-300 p-2 rounded"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={verificarPegada}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "A verificar..." : "Verificar"}
          </button>
        </div>
        {resultado && (
          <div className="mt-4 bg-gray-50 border p-4 rounded shadow-sm">
            {resultado.erro ? (
              <p className="text-red-600 font-semibold">{resultado.erro}</p>
            ) : resultado.length === 0 ? (
              <p className="text-green-600 font-semibold">Nada encontrado. O endereço parece seguro.</p>
            ) : (
              <>
                <p className="text-red-600 font-semibold mb-2">Encontrado em {resultado.length} bases de dados:</p>
                <ul className="list-disc pl-5 text-sm">
                  {resultado.map((item, index) => (
                    <li key={index}>{item.Name} ({item.BreachDate})</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
