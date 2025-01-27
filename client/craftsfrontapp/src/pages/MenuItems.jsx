import React, { useState, useEffect } from "react";
import axios from "axios";

const MenuItems = () => {
  
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("http://localhost:4000/menu");
        console.log(response.data);
        console.log(response.data.menuItems);
        setMenuItems(response.data.menuItems);
        setLoading(false);
      } catch (err) {
        setError("Failed to load menu items.");
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (

    <div className="menu-list">
      <h1>Menu Items</h1>
      {/* <div className="menu-grid">
        {menuItems.map((item) => (
          <div key={item._id} className="menu-card">
            <img src={item.image} alt={item.name} className="menu-image" />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p><strong>Price:</strong> ${item.price}</p>
            <p><strong>Stock:</strong> {item.stock}</p>
          </div>
        ))}
      </div> */}
    </div>
  )
}

export default MenuItems
