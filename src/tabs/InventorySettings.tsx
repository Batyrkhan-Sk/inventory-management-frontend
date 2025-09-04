import { useState } from "react";
import type Inventory from "../types/Inventory";

interface Props {
  inventory: Inventory;
  onEdit: (inventory: Inventory) => void;
  onDelete: (inventoryId: string) => void;
}

export function InventorySettings({ inventory, onEdit, onDelete }: Props) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    onDelete(inventory.id);
    setShowDeleteModal(false);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5>Inventory Information</h5>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-primary btn-sm" onClick={() => onEdit(inventory)}>
                  <i className="bi bi-pencil"></i> Edit
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => setShowDeleteModal(true)}
                >
                  <i className="bi bi-trash"></i> Delete
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label"><strong>Title:</strong></label>
                <p>{inventory.title}</p>
              </div>

              <div className="mb-3">
                <label className="form-label"><strong>Description:</strong></label>
                <p>{inventory.description || "Not set"}</p>
              </div>

              <div className="mb-3">
                <label className="form-label"><strong>Category:</strong></label>
                <p>{inventory.category || "Not set"}</p>
              </div>

              {inventory.imageUrl && (
                <div className="mb-3">
                  <label className="form-label"><strong>Image:</strong></label>
                  <br />
                  <img
                    src={inventory.imageUrl}
                    alt="Inventory"
                    style={{ maxHeight: "200px", maxWidth: "300px" }}
                    className="img-thumbnail"
                  />
                </div>
              )}

              <div className="mb-3">
                <label className="form-label"><strong>Created:</strong></label>
                <p>{new Date(inventory.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {showDeleteModal && (
              <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete "<strong>{inventory.title}</strong>"?</p>
                <p className="text-muted">This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  );
}

export default InventorySettings;