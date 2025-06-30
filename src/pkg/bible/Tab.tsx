import Button from "../button/Button";

const Tab = ({ title, selected }: { title: string; selected: boolean }) => {
  return <Button noHolographic={selected}>{title}</Button>;
};

export default Tab;
