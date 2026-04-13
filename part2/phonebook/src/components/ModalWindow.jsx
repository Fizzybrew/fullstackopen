const ModalWindow = () => {
    const modalStyle = {
        background: '#d4edda', 
        color: '#155724',
        padding: '5px',
        borderRadius: '10px',
        border: '1px solid black',
        width: '20%',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: '-20px'
    }
    return (    
      <div style={modalStyle}>
        <p>contact added!</p>
      </div>
    );
};

export default ModalWindow;