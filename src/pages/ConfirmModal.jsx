// ConfirmModal.jsx
export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="modalOverlayStyle">
      <div className="modalStyle">
        <p>{message}</p>
        <div style={{ marginTop: '1rem', textAlign: 'right' }}>
          <button onClick={onCancel} className="btnCancelStyle">Cancel</button>
          <button onClick={onConfirm} className="btnConfirmStyle">Delete</button>
        </div>
      </div>
    </div>
  )
}

