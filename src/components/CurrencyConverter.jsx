import { useState } from "react";

export default function CurrencyConverter() {
  const topCurrencies = [
    "USD","EUR","GBP","JPY","AUD","CAD","CHF","CNY","INR","NZD","SGD","HKD","SEK","KRW","MXN"
  ];
  
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("history")) || []
  );
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const [showHistory, setShowHistory] = useState(false); // toggle history visibility

  // Handle conversion
  const handleConvert = () => {
    console.log('Convert clicked'); // debug
    if (amount && from && to) {
      fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
        .then((res) => res.json())
        .then((data) => {
          console.log('API response:', data); // debug
          if (data && data.rates && data.rates[to]) {
            const converted = (amount * data.rates[to]).toFixed(2);
            setResult(converted); // ✅ show in result box
            // Save to history
            const newEntry = `${amount} ${from} = ${converted} ${to}`;
            const updatedHistory = [newEntry, ...history].slice(0, 10);
            setHistory(updatedHistory);
            localStorage.setItem('history', JSON.stringify(updatedHistory));
          } else {
            setResult(null);
            alert('Conversion failed — check the currencies.');
          }
        })
        .catch((err) => {
          setResult(null);
          console.error('Error:', err);
          alert('Error fetching data.');
        });
    } else {
      alert('Please enter amount and select currencies.');
    }
  };

  // Add to favorites
  const addToFavorites = () => {
    const favPair = `${from}-${to}`;
    if (!favorites.includes(favPair)) {
      const updatedFavs = [...favorites, favPair];
      setFavorites(updatedFavs);
      localStorage.setItem('favorites', JSON.stringify(updatedFavs));
    }
  };

  return (
    <div className="space-y-4">

      {/* Input amount */}
      <input
        type="number"
        min="0"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border rounded bg-white text-black dark:bg-black/50 dark:text-white"
        placeholder="Enter amount"
      />

      {/* Currency selectors */}
      <div className="flex flex-col sm:flex-row gap-2">
        <select
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="flex-1 p-2 border rounded bg-white text-black dark:bg-black/50 dark:text-white"
        >
          {topCurrencies.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="flex-1 p-2 border rounded bg-white text-black dark:bg-black/50 dark:text-white"
        >
          {topCurrencies.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Convert & result */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleConvert}
          className="p-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-700"
        >
          Convert
        </button>

        {result !== null && (
          <div className="p-2 border rounded bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold min-w-[160px] text-center shadow">
            {amount} {from} = {result} {to}
          </div>
        )}
      </div>

      {/* Favorites */}
      <button
        onClick={addToFavorites}
        className="w-full p-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-700"
      >
        Add to Favorites
      </button>
      <div className="mt-2">
        <h3 className="font-bold">Favorites:</h3>
        <ul className="list-disc list-inside">
          {favorites.map((fav, i) => (
            <li key={i}>{fav}</li>
          ))}
        </ul>
      </div>

      {/* Toggle history */}
      <button
        onClick={() => setShowHistory(!showHistory)}
        className="w-full p-2 mt-2 rounded bg-gray-600 text-white font-medium hover:bg-gray-700"
      >
        {showHistory ? "Hide History" : "Show History"}
      </button>

      {showHistory && (
        <div className="mt-2">
          <h3 className="font-bold">Last Conversions:</h3>
          <ul className="list-disc list-inside">
            {history.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
