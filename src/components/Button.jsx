const Button = ({ onClick, children, className, icon: Icon }) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`flex bg-[#4ade80] text-white px-4 py-2 rounded-md hover:bg-[#22c55e] transition duration-300  ${className}`}>
        {Icon && (
          <span className="mr-2 flex items-center">
            <Icon size={16} />
          </span>
        )}
        {children}
      </button>
    </>
  );
};
export default Button;
