import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { tabs } from "../const/tabs";
import ItemsPage from '../tabs/ItemsTab';
import type Inventory from "../types/Inventory";
import InventorySettings from "../tabs/InventorySettings";

function InventoryDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const navigate = useNavigate();
  const location = useLocation();
  const stateInventory = location.state?.inventory as Inventory | undefined;

  const [inventory, setInventory] = useState<Inventory | null>(stateInventory || null);

  // refactor (context maybe use)
  const handleEditInventory = (inventory: Inventory) => {
    navigate(`/inventory/${inventory.id}/edit`, { state: { inventory } });
  }

  const handleDeleteInventory = async (inventoryId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/inventories/${inventoryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        navigate('/inventories');
      } else {
        console.error('Failed to delete inventory');
      }
    } catch (error) {
      console.error('Error deleting inventory:', error);
    }
  };

  useEffect(() => {
    if (!inventory) {
      const token = localStorage.getItem('token');
      fetch(`http://localhost:5000/api/inventories/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => setInventory(data.data))
        .catch(err => console.error(err));
    }
  }, [id, inventory]);

  if (!inventory) return <p>Loading...</p>;

  return (
    <div>
      <h2>{inventory.title}</h2>

      <ul className="nav nav-tabs justify-content-center mt-3">
        {tabs.map((tab) => (
          <li className="nav-item" key={tab}>
            <button
              className={`nav-link ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>

  <div className="p-3">
    {activeTab === "Items" && (
      <>
        <div className="d-flex justify-content-end mb-3">
          <Link to={`/inventory/${id}/items`} className="btn btn-primary">
            Create Item
          </Link>
        </div>

        <ItemsPage />
      </>
    )}

        {activeTab === "Chat" && <p>Chat here</p>}
        {activeTab === "Settings" && <InventorySettings
        inventory={inventory}
        onEdit={handleEditInventory}
        onDelete={handleDeleteInventory}/>}
        {activeTab === "Custom ID" && (
            <div>
                <select>
                    <option>Fixed</option>
                </select>
                <input placeholder="Enter format..." />
                <select>
                    <option>20-bit random</option>
                </select>
                <input placeholder="Enter format..." />
                <select>
                    <option>Sequence</option>
                </select>
                <input placeholder="Enter format..." />
                <select>
                    <option>Date/time</option>
                </select>
                <input placeholder="Enter format..." />
            </div>
        )}
      </div>
    </div>
  );
}

export default InventoryDetail;