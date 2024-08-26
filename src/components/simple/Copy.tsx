"use client";
import { Button } from "@/components/ui/button";

import { useState } from "react";

const Copy = ({ textToCopy, children, size = 5 }: any) => {
  const [C, setC] = useState(children);
  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    setC("done");
    setTimeout(() => {
      setC(children);
    }, 1000);
  };

  if (!children)
    return (
      <button className="pointer" onClick={handleCopy}>
        {C === "done" ? (
          <CheckIcon className={`h-${size} w-${size} text-primary`} />
        ) : (
          <CopyIcon className={`h-${size} w-${size} mr-2`} />
        )}
      </button>
    );

  return (
    <Button onClick={handleCopy} variant="outline">
      {C === "done" ? (
        <CheckIcon className="h-5 w-5 text-primary" />
      ) : (
        <CopyIcon className="h-4 w-4 mr-2" />
      )}

      {children}
    </Button>
  );
};

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
function CopyIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}
export default Copy;
