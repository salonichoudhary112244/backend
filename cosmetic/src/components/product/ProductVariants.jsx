export default function ProductVariants({
  variants,
  selected,
  onSelect
}) {
  return (
    <div className="product-variants">
      <h4>Variants</h4>

      <div className="variant-list">
        {variants.map(v => (
          //pehle bali css
          // <button
          //   key={v.id}
          //   className={`variant-btn ${
          //     selected?.id === v.id ? "active" : ""
          //   }`}
          //   onClick={() => onSelect(v)}
          // >
          //   {v.sku}
          // </button>
          <button
  key={v.id}
  className={`variant-pill ${selected?.id === v.id ? "active" : ""}`}
  onClick={() => onSelect(v)}
>
  {v.sku}
</button>

        ))}
      </div>
    </div>
  );
}
