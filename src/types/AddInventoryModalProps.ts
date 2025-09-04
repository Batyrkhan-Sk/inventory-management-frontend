export default interface AddInventoryModalProps {
  show: boolean;
  handleClose: () => void;
  onSave: (name: string) => void;
}