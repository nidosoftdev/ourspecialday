import React from "react";
import {Snippet} from "@nextui-org/react";

export default function CopyToClipBoard({text, name}) {
  return (
    <Snippet size="sm" 
    variant="flat" color="warning"
    symbol={name}>{text}</Snippet>
  );
}
