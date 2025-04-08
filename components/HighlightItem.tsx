import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export function HighlightItem(props: { children: React.ReactNode }) {
  return (
    <div>
      <span className={"check"}>
        <FontAwesomeIcon icon={faCheck} />
      </span>
      {props.children}
    </div>
  );
}
