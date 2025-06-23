import { useState } from "react";

export default function Favorites({ from, to, setFrom, setTo }) {
  const [favs, setFavs] = useState(JSON.parse(localStorage.getItem("favs")) || []);

  const addFav = () => {
    const newFav = `${from}→${to}`;
    if (!favs.includes(newFav)) {
      const updated = [...favs, newFav];
      setFavs(updated);
      localStorage.setItem("favs", JSON.stringify(updated));
    }
  };
  return (
    <div>
      <button onClick={addFav} className="bg-green-500 text-white p-1 rounded">Add Favorite</button>
      <div className="mt-2 flex flex-wrap gap-2">
        {favs.map((fav, i) => (
          <button key={i} onClick={() => {
            const [f, t] = fav.split('→'); setFrom(f); setTo(t);
          }} className="bg-gray-200 dark:bg-gray-800 p-1 rounded">
            {fav}
          </button>
        ))}
      </div>
    </div>
  );
}
