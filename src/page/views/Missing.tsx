import Base from "./Base";

const Missing = () => {
  const config = {
    title: "Not Found",
    description: "This route does not exist",
    cause: "It may have been moved or deleted",
  };
  return (
    <Base
      title={config.title}
      description={config.description}
      error={config.description}
      cause={config.cause}
    />
  );
};

export default Missing;
