"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { features } from "process";

function VisitBtn({ shareUrl }: { shareUrl: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const shareLink = `${window.location.origin}/submit/${shareUrl}`;
  return (
    <Button
      className="w-[200px]"
      onClick={() => {
        window.open(shareLink, "_blank", "popup,width=800,height=1080,left=560");
      }}
    >
      Visit
    </Button>
  );
}

export default VisitBtn;