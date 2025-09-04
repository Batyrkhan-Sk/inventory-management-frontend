import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function ItemsFillOutPage() {
  const { id: inventoryId } = useParams<{ id: string }>();
  const navigate = useNavigate()
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const token = localStorage.getItem('token');

  const newItem = {
    inventoryId,
    title,
    price: parseFloat(price),
    quantity: parseInt(quantity, 10),
    description: description || "No description",
    category: category || "No category",
    imageUrl: imageUrl || "No image",
  };

  try {
    const response = await fetch(`https://inventory-management-backend-s5o3.onrender.com/api/inventories/${inventoryId}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(newItem),
    });

    if (!response.ok) {
      throw new Error("Failed to create item");
    }

    const data = await response.json();
    console.log("Item created:", data);

    setTitle("");
    setPrice("");
    setQuantity("");
    setDescription("");
    setCategory("");
    setImageUrl("");
    navigate(`/inventory/${inventoryId}`);

  } catch (error) {
    console.error("Error creating item:", error);
   }
};

  return (
    <div>
      <h1>Create Item</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Price:</label>
           <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Quantity:</label>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>

         <div>
          <label>Description (optional):</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

         <div>
          <label>Category (optional):</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div>
          <label>Image URL (optional):</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default ItemsFillOutPage;
