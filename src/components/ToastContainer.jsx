function ToastContainer({ toasts = [] }) {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast-item">
          <svg 
            width="12" 
            height="12" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            style={{ color: '#ffffff', minWidth: '12px' }}
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}

export default ToastContainer;
