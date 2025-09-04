import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/InventoryPage.module.css';
import AddInventoryAccordion from '../accordion/AddInventoryAccordion';
import type Inventory from '../types/Inventory';

function InventoryPage() {
  const [inventories, setInventories] = useState<Inventory[]>([]);
  const navigate = useNavigate();

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  useEffect(() => {
    fetch("https://inventory-management-backend-s5o3.onrender.com/api/inventories", {
      headers: getAuthHeaders(),
    })
      .then((res) => res.json())
      .then((data) => setInventories(data.data))
      .catch((err) => console.error("Error fetching inventories:", err));
  }, []);

  const handleSave = async (data: {
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
}) => {
  try {
    const res = await fetch("https://inventory-management-backend-s5o3.onrender.com/api/inventories", {
      method: "POST",
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    const newInventory = result.data;

    setInventories([...inventories, newInventory]);
    navigate(`/inventory/${newInventory.id}`);
  } catch (err) {
    console.error("Error adding inventory:", err);
  }
};


  return (
    <>
      <h2 className={styles.header}>Inventory Page</h2>

      <AddInventoryAccordion onSave={handleSave} />

      <ul className="list-group mt-3">
        {inventories.map((inv) => (
          <li
            key={inv.id}
            className="list-group-item list-group-item-action"
            onClick={() =>
              navigate(`/inventory/${inv.id}`, { state: { inventory: inv } })
            }
            style={{ cursor: "pointer" }}
          >
            {inv.title}{" "}
            <small className="text-muted">
              ({new Date(inv.createdAt).toLocaleDateString()})
            </small>
          </li>
        ))}
      </ul>
    </>
  );
}

export default InventoryPage;