import { FC } from "react";

const Body: FC = (props) => {
  return <div className="main-body">{props.children}</div>;
};

export default Body;
