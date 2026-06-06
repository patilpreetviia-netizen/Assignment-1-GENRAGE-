function SizeGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-surface" onClick={(e) => e.stopPropagation()}>
        <div className="modal-topbar">
          <h3 className="raw-title" style={{ fontSize: '14px' }}>DIMENSIONAL FIT PROFILE</h3>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>
        <table className="size-table">
          <thead>
            <tr>
              <th>TAG SIZE</th>
              <th>CHEST WIDTH (IN)</th>
              <th>BODY LENGTH (IN)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01 / SMALL</td>
              <td>24.0</td>
              <td>27.0</td>
            </tr>
            <tr>
              <td>02 / MEDIUM</td>
              <td>25.0</td>
              <td>28.0</td>
            </tr>
            <tr>
              <td>03 / LARGE</td>
              <td>26.0</td>
              <td>29.0</td>
            </tr>
          </tbody>
        </table>
        <p className="sub-mono" style={{ marginTop: '20px', color: '#444444', fontSize: '8px' }}>* All specs follow custom box-structured oversized templates.</p>
      </div>
    </div>
  );
}

export default SizeGuideModal;