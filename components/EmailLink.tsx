import React, { useEffect, useLayoutEffect, useState } from "react";

const magic = 10752 >>> 8;

// Function to encode an email address
const encodeEmail = (email: string) => {
  return email
    .split("")
    .reverse()
    .map((c) => c.charCodeAt(0) ^ magic);
};

// Reduces spambots finding the email address a little
const emailStr = [71, 69, 73, 4, 70, 67, 75, 71, 77, 106, 89, 69, 24, 91, 75, 71]
  .reverse()
  .map((c) => String.fromCodePoint(c ^ magic))
  .join("");

const emailLink = [109, 97, 105, 108, 116, 111, 58].map((c) => String.fromCodePoint(c)).join("") + emailStr;

export const EmailLink = () => {
  const [text, setText] = useState("xxxxxx@gmail.com");
  const [href, setHref] = useState<string | undefined>(undefined);
  const [className, setClassName] = useState("blurred");

  // Makes it so spambots have to evaluate javascript to find the email address
  useEffect(() => {
    setHref(emailLink);
    setText(emailStr);
    setClassName("");
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-target-blank
    <a target={"_blank"} href={href} className={className}>
      {text}
    </a>
  );
};
