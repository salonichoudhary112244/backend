import { useNavigate } from "react-router-dom";

export default function FlowNav({ nextPath, skipPath }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-end gap-4 mt-8">
      {skipPath && (
        <button
          onClick={() => navigate(skipPath)}
          className="bg-gray-300 px-6 py-2 rounded"
        >
          Skip
        </button>
      )}

      {nextPath && (
        <button
          onClick={() => navigate(nextPath)}
          className="bg-pink-500 text-white px-6 py-2 rounded"
        >
          Save & Continue →
        </button>
      )}
    </div>
  );
}
