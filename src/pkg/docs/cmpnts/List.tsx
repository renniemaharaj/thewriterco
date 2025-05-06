import React from "react";
type ListProps = {
  list: string[];
};
const List: React.FC<ListProps> = ({ list }) => {
  return (
    <ul className="list-disc list-inside">
      {list.map((item, index) => (
        <li key={index}>
          <strong>{item}</strong>
        </li>
      ))}
    </ul>
  );
};

export default List;
