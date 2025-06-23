export default function HistoryList({ history }) {
  return (
    <div className="mt-4">
      <h2 className="font-semibold">Last Conversions:</h2>
      <ul className="list-disc list-inside">
        {history.map((entry, i) => <li key={i}>{entry}</li>)}
      </ul>
    </div>
  );
}
