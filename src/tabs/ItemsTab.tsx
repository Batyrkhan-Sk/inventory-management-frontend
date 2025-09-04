import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Item = {
  id: string;
  title: string;
  price?: number;
  quantity?: number;
  imageUrl?: string;
};

const ItemsPage: React.FC = () => {
  const { id: inventoryId } = useParams<{ id: string }>();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const token = localStorage.getItem("token");
      if (!inventoryId || !token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://inventory-management-backend-s5o3.onrender.com/api/inventories/${inventoryId}/items`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setItems(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [inventoryId]);

  if (loading) {
    return <div className="text-center p-3">Loading...</div>;
  }

  if (items.length === 0) {
    return <div className="text-center p-3">No items found</div>;
  }

  return (
  <div className="container my-4">
    <div className="table-responsive shadow-sm rounded">
      <table className="table table-dark table-striped table-hover align-middle">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr
              key={item.id}
              style={{ cursor: "pointer" }}
              onClick={() => window.location.href = `/items/${item.id}`}
            >
              <td className="fw-semibold">{item.title}</td>
              <td>{item.price ?? <span className="text-muted">No price</span>}</td>
              <td>{item.quantity ?? <span className="text-muted">No quantity</span>}</td>
              <td>
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="img-thumbnail"
                    style={{ width: "60px", height: "60px", objectFit: "cover" }}
                  />
                ) : (
                  <span className="text-muted">No image</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

};

export default ItemsPage;