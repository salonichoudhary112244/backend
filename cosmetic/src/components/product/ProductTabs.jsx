export default function ProductTabs({ product }) {
  return (
    <div className="product-tabs">

      {/* ABOUT */}
      <section>
        <h3>About this item</h3>
        <ul>
          {product.features?.map(f => (
            <li key={f.id}>{f.feature}</li>
          ))}
        </ul>
      </section>

      {/* TECHNICAL DETAILS */}
      <section>
        <h3>Technical Details</h3>
        <table>
          <tbody>
            {product.specifications?.map(s => (
              <tr key={s.id}>
                <td>{s.specKey}</td>
                <td>{s.specValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* MANUFACTURER */}
      <section>
        <h3>From the Manufacturer</h3>
        <p>{product.manufacturerInfo?.content}</p>
      </section>

      {/* REVIEWS */}
      <section>
        <h3>Customer Reviews</h3>
        <p>⭐ 4.2 out of 5</p>
      </section>

    </div>
  );
}
