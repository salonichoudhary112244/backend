import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Packages() {

  const [packages, setPackages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/packages')
      .then(res => setPackages(res.data));
  }, []);

  return (
    <div>
      <h2 style={{textAlign:'center'}}>Travel Packages</h2>

      <div className="packages-container">
        {packages.map(p => (
          <div className="card" key={p.id}>
            <h3>{p.destination}</h3>
            <p>₹ {p.price}</p>
            <p>{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Packages;