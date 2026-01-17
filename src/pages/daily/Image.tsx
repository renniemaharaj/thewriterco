import { Img } from "react-image";

const PlaceholderImage = "https://aharvey.com/wp-content/uploads/2018/03/bg-placeholder.jpg";

const Image = ({ src }: { src: string }) => {
  return (
    <Img
      style={{
        width: 120,
        height: 120,
        objectFit: "cover",
        borderRadius: "8px",
      }}
      src={[src, PlaceholderImage]}
    />
  );
};

export default Image;
