import React, { useState, useEffect } from 'react';

// Define the shape of our data
interface Transaction {
  id: string;
  label: string;
  amount: number;
  date: string;
}

export default function App() {
  const [btcPrice, setBtcPrice] = useState<number | string>("...");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [inputLabel, setInputLabel] = useState("");
  const [inputAmount, setInputAmount] = useState("");

  // 1. Fetch Live Crypto Data
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await res.json();
        setBtcPrice(data.bitcoin.usd);
      } catch (err) {
        setBtcPrice("Service Offline");
      }
    };
    fetchPrice();
  }, []);

  // 2. Logic: Calculate Balance
  const totalBalance = 12450.85 + transactions.reduce((acc, curr) => acc + curr.amount, 0);

  // 3. Logic: Add New Investment
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputLabel || !inputAmount) return;

    const newTx: Transaction = {
      id: crypto.randomUUID(),
      label: inputLabel,
      amount: parseFloat(inputAmount),
      date: new Date().toLocaleDateString()
    };

    setTransactions([newTx, ...transactions]);
    setInputLabel("");
    setInputAmount("");
  };

  // 4. Logic: Delete Transaction
  const removeTx = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-black text-blue-500 tracking-tighter">VAULT-X</h1>
          <div className="bg-orange-500/10 border border-orange-500/30 text-orange-400 px-4 py-1 rounded-full text-xs font-mono">
            LIVE BTC: ${typeof btcPrice === 'number' ? btcPrice.toLocaleString() : btcPrice}
          </div>
        </header>

        {/* Dynamic Balance Card */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 md:p-12 rounded-[2rem] shadow-2xl mb-10 text-center">
          <p className="text-blue-100 text-xs font-bold uppercase tracking-widest mb-2">Total Portfolio Value</p>
          <h2 className="text-5xl md:text-7xl font-bold">${totalBalance.toLocaleString(undefined, {minimumFractionDigits: 2})}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Form: Add Investment */}
          <section className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl">
            <h3 className="text-lg font-bold mb-4 text-blue-400">Add New Asset</h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <input 
                type="text" placeholder="Asset Name (e.g. Apple Stock)"
                className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl focus:border-blue-500 outline-none"
                value={inputLabel} onChange={(e) => setInputLabel(e.target.value)}
              />
              <input 
                type="number" placeholder="Amount ($)"
                className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl focus:border-blue-500 outline-none"
                value={inputAmount} onChange={(e) => setInputAmount(e.target.value)}
              />
              <button className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-bold transition-all active:scale-95">
                Confirm Investment
              </button>
            </form>
          </section>

          {/* List: Transaction History */}
          <section className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl overflow-hidden">
            <h3 className="text-slate-400 text-sm font-medium mb-4">Transaction History</h3>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {transactions.length === 0 && <p className="text-slate-600 italic">No recent activity.</p>}
              {transactions.map(tx => (
                <div key={tx.id} className="flex justify-between items-center bg-slate-950/50 p-3 rounded-lg border border-slate-800 group">
                  <div>
                    <p className="font-medium">{tx.label}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-tighter">{tx.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-emerald-400 font-bold">+${tx.amount.toLocaleString()}</span>
                    <button onClick={() => removeTx(tx.id)} className="text-slate-700 hover:text-rose-500 transition-colors">✕</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}