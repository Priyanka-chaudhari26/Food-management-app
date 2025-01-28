import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../index.css';

const MenuItems = () => {
  
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); 
  const [editItemId, setEditItemId] = useState(null);
  const [showPopup, setShowPopup] = useState(false); 
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    availability: "",
    
  });
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("http://localhost:4000/menu", {
          withCredentials: true, 
        });
        console.log(response.data);
        // console.log(response.data.menuItems);
        setMenuItems(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load menu items.");
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:4000/categories", {
          withCredentials: true, 
        });
        console.log("categories",response.data);
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          console.error("Expected an array, but got:", response.data);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddItem = async () => {
    try {
      const response = await axios.post("http://localhost:4000/menu", newItem,
        {
          withCredentials: true, 
        });
      setMenuItems((prev) => [...prev, newItem]); 
      setShowPopup(false); 
      setNewItem({ name: "", category: "", price: "", stock: "", availability: "", image: "" }); 
    } catch (err) {
      console.error("Error adding menu item:", err);
    }
  };
  const handleEditItem = (item) => {
    setIsEditing(true);  
    setEditItemId(item._id);  
    setNewItem({
      name: item.name,
      category: item.category,
      price: item.price,
      stock: item.stock,
      availability: item.availability,
      image: item.image,  
    });
    setShowPopup(true);  
  };
  const handleUpdateItem = async (id) => {
    try {
      const response = await axios.put(`http://localhost:4000/menu/${id}`, newItem,
        {
          withCredentials: true, 
        });
        setMenuItems((prev) =>
          prev.map((item) =>
            item._id === editItemId ? { ...item, ...newItem } : item
          )
        );
      setShowPopup(false);
      setIsEditing(false);
      setEditItemId(null);
      setNewItem({ name: "", category: "", price: "", stock: "", availability: "", image: "" }); 
      
    } catch (err) {
      console.error("Error updating menu item:", err);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/menu/${id}`, {
        withCredentials: true,
      });
      setMenuItems((prev) => prev.filter((item) => item._id !== id)); 
    } catch (err) {
      console.error("Error deleting menu item:", err);
    }
  };

  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (

    <div className="menu-list">
      <h1>Menu Items</h1> 
      <div className="btn-grp">
      <h2>Add a New Menu Item</h2> 
      <Button variant="primary add cart-button" onClick={() => setShowPopup(true)}>Add Item</Button>
      </div>
      <br />
      {showPopup && (
        <>
          <div className="overlay" onClick={() => setShowPopup(false)}></div>
          <div className="popup-form">
            <div className="popup-header">
              <h4>Add New Menu Item</h4>
              <Button variant="danger" size="sm" onClick={() => setShowPopup(false)}>
                X
              </Button>
            </div>
            <div className="popup-body">
              <table>
                <tr>
                  <td><label>Name:</label></td>
                  <td><input type="text" name="name" value={newItem.name} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <td><label>Category:</label></td>
                  <td>
                  <select
                    name="category"
                    value={newItem.category}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {Array.isArray(categories) &&
                      categories.length > 0 &&
                      categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                  </select>

                  </td>
                </tr>
                <tr>
                  <td><label>Price:</label></td>
                  <td><input type="number" name="price" value={newItem.price} onChange={handleChange} /></td>
                </tr>
                <tr>
                  <td><label>Stock:</label></td>
                  <td><input type="number" name="stock" value={newItem.stock} onChange={handleChange} /></td>
                </tr>
                <div className="btn-grp">
                  
                  <Button variant="success update cart-button" onClick={() => handleUpdateItem(editItemId)}>
                  Update
                 </Button>
                
                <Button variant="success add cart-button" onClick={handleAddItem}>
                 Add
                </Button>
                </div>
              </table>
            </div>
          </div>
        </>
        )}

      <div className="menu-grid">
        
        {menuItems.map((item) => (
          <div className="card-menu" key={item._id}>
            <form>
            <Card style={{ width: '18rem' }}>
            
            <Card.Img variant="top" src={item.image} alt="" />
            <Card.Body>
              <Card.Title><b>{item.name}</b></Card.Title>
              <Card.Text>
              Category: {item.category}
              </Card.Text>
              <Card.Text>
              Price: ₹{item.price}
              </Card.Text>
              <Card.Text>
              Availability{item.availability}
              </Card.Text>
              <Card.Text>
              Stock: {item.stock}
              </Card.Text>
              <div className="btn-grp">
              <Button variant="primary update cart-button" onClick={() => handleEditItem(item)} >Update</Button> 
              <Button variant="primary delete cart-button" onClick={() => handleDeleteItem(item._id)}>Delete</Button>
              <Button variant="primary order cart-button" >Order</Button>
              </div>

            </Card.Body>
          </Card>
          </form>
          </div>
        ))}
      </div>
      

    </div>
    
  )
}

export default MenuItems
