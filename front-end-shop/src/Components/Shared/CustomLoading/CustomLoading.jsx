import "./CustomLoadingStyle.css";
const CustomLoading = ({ size = 16 }) => {
  const sizeInPixels = `${size}px`;
  return (
    <div
      className={`duration-300 rounded-full border-t-4 border-gray-900`}
      style={{
        width: sizeInPixels,
        height: sizeInPixels,
        animation: "ring 1s linear infinite",
      }}
    ></div>
  );
};

export default CustomLoading;
