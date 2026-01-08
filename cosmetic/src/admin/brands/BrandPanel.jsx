import { useEffect, useState } from "react";
import { getAllBrands, createBrandsBulk } from "../../api/authApi";

export default function BrandPanel() {
  const [brands, setBrands] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      const res = await getAllBrands();
      setBrands(res.data);
    } catch (err) {
      console.error("GET BRANDS ERROR", err);
    }
  };

  const addBrand = async () => {
    if (!name.trim()) {
      alert("Brand name required");
      return;
    }

    try {
      await createBrandsBulk([{ name }]);
      setName("");
      loadBrands();
    } catch (err) {
      console.error("CREATE BRAND ERROR", err);
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Brands</h2>

      <div className="bg-white p-4 rounded w-[400px] mb-6 space-y-3">
        <input
          placeholder="Brand name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
        />

        <button
          onClick={addBrand}
          className="bg-pink-500 text-white px-4 py-2 rounded"
        >
          Add Brand
        </button>
      </div>

      <ul className="bg-white p-4 rounded w-[400px] space-y-2">
        {brands.map((b) => (
          <li key={b.id} className="border p-2 rounded">
            {b.name}
          </li>
        ))}
      </ul>
      {/* <FlowNav
  skipPath="/admin/categories"
  nextPath="/admin/categories"
/> */}

    </>
  );
}
