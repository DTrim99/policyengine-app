import { Switch } from "antd";
import { useState } from "react";
import style from "../style";

export default function BiPanel(props) {
  // A panel with a switch at the top to switch between two views.
  const { left, right, leftTitle, rightTitle } = props;
  const [leftSelected, setLeftSelected] = useState(true);

  return (
    <div
      style={{
        padding: 20,
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          paddingTop: 10,
          paddingBottom: 10,
          borderBottom: `1px solid ${style.colors.DARK_GRAY}`,
          marginBottom: 10,
          cursor: "pointer",
        }}
        onClick={() => setLeftSelected(!leftSelected)}
      >
        <h5 style={{ marginRight: "auto" }}>{leftTitle}</h5>
        <Switch
          checked={!leftSelected}
          style={{ padding: 0, margin: 0, width: "20%" }}
        />
        <h5 style={{ marginLeft: "auto" }}>{rightTitle}</h5>
      </div>
      {leftSelected ? left : right}
    </div>
  );
}
