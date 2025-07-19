import Base from "./Base";

const Suspended = () => {
  const config = {
    title: "Suspended",
    description: "This route is currently suspended",
    cause: "Please try again later",
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

export default Suspended;
