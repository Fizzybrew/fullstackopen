const ModalWindow = ({ message, type }) => {
  const styles = {
    success: {
      background: "#d4edda",
      color: "#155724",
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #c3e6cb",
      width: "auto",
      minWidth: "200px",
      textAlign: "center",
      fontWeight: "bold",
      marginBottom: "20px",
      position: "fixed",
      top: "20px",
      right: "20px",
      zIndex: 1000,
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    },
    error: {
      background: "#f8d7da",
      color: "#721c24",
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #f5c6cb",
      width: "auto",
      minWidth: "200px",
      textAlign: "center",
      fontWeight: "bold",
      marginBottom: "20px",
      position: "fixed",
      top: "20px",
      right: "20px",
      zIndex: 1000,
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    }
  };

  return (
    <div style={type === 'success' ? styles.success : styles.error}>
      <p style={{ margin: 0 }}>{message}</p>
    </div>
  );
};

export default ModalWindow;