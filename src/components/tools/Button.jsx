const Button = ({ children, onClick, color }) => {
  return (
    <>
      <button
        style={{ backgroundColor: color }}
        onClick={onClick}
        className="text-white text-center rounded p-1 shadow"
      >
        {children}
      </button>
    </>
  );
};

export default Button;
