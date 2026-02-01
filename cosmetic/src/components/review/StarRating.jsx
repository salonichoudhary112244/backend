export default function StarRating({ value = 0, onChange, size = 22 }) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onChange && onChange(star)}
          style={{
            cursor: onChange ? "pointer" : "default",
            fontSize: size,
            color: star <= value ? "#f5a623" : "#ccc",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}
