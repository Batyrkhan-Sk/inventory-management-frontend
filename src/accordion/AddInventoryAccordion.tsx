import { useState } from "react";
import { Accordion, Form, Button } from "react-bootstrap";
import axios from "axios";

export function AddInventoryAccordion({ onSave }: { onSave: (data: { title: string; description: string; category: string; imageUrl?: string }) => void }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) return;

    let imageUrl = "";

    if (imageFile) {
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", "inventory_upload");

        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dbkvzbzzz/image/upload",
          formData
        );

        imageUrl = res.data.secure_url;
      } catch (err) {
        console.error("Upload failed", err);
      } finally {
        setUploading(false);
      }
    }

    onSave({
      title,
      description,
      category,
      imageUrl,
    });

    setTitle("");
    setDescription("");
    setCategory("");
    setImageFile(null);
    setOpen(false);
  };

  return (
    <div className="container mt-4">
      <button className="btn btn-primary" onClick={() => setOpen((prev) => !prev)}>
        {open ? "Close Form" : "Add Inventory"}
      </button>

      {open && (
        <Accordion defaultActiveKey="0" className="mt-3">
          <Accordion.Item eventKey="0">
            <Accordion.Header className="px-3 py-2">Add Inventory</Accordion.Header>
            <Accordion.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label className="d-flex justify-content-start">Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <Form.Label className="d-flex justify-content-start mt-2">Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />

                  <Form.Label className="d-flex justify-content-start mt-2">Category</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter category (optional)"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />

                  <Form.Label className="d-flex justify-content-start mt-2">Image</Form.Label>
                  <Form.Control
                      type="file"
                      accept="image/*"
                      data-browse-text="Choose File"
                      onChange={(e) => setImageFile((e.target as HTMLInputElement).files?.[0] || null)}
                    />
                  {imageFile && (
                    <img
                      src={URL.createObjectURL(imageFile)}
                      alt="Preview"
                      style={{ marginTop: "10px", maxHeight: "100px" }}
                    />
                  )}
                </Form.Group>

                <div className="d-flex gap-2 mt-3">
                  <Button variant="primary" onClick={handleSubmit} disabled={uploading}>
                    {uploading ? "Uploading..." : "Create"}
                  </Button>
                  <Button variant="secondary" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
    </div>
  );
}

export default AddInventoryAccordion;