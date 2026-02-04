export default function ProductTabs({ product }) {
  return (
    <div className="product-tabs">

      {/* ABOUT */}
        <section className="nykaa-card">
        <h3>About this item</h3>
         <ul className="nykaa-bullets">
          {product.features?.map(f => (
            <li key={f.id}>{f.feature}</li>
          ))}
        </ul>
      </section>

      {/* TECHNICAL DETAILS */}
 <section className="nykaa-card">
        <h3>Technical Details</h3>
         <table className="nykaa-table">
          <tbody>
            {product.specifications?.map(s => (
              <tr key={s.id}>
                 <td className="key">{s.specKey}</td>
                <td>{s.specValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* MANUFACTURER */}
        <section className="nykaa-card">
        <h3>From the Manufacturer</h3>
        <p>{product.manufacturerInfo?.content}</p>
      </section>

       {/* REVIEWS */}
      

    </div>
  );
}
