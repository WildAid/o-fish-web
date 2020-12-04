import React, { useEffect, useState } from "react";

const Fetchy = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // simulate a fetch
    setTimeout(() => {
      setData([1, 2, 3]);
    }, 3000);
  }, []);

  return (
    <div>
      <h2>Fetchy</h2>
      <div>
        {data.length ? (
          <div>
            <h3>Data:</h3>
            {data.map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );
};

export default Fetchy;