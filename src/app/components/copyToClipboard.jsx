import React from "react";
import {Snippet} from "@nextui-org/react";

export default function CopyToClipBoard({text, name}) {
  return (
    <Snippet symbol={name}>{text}</Snippet>
  );
}
