"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

function ViewBtn({ shareUrl, submitionId }: { shareUrl: string, submitionId: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const shareLink = `${window.location.origin}/view/${shareUrl}/${submitionId}`;
  return (
    <Button
    variant={"default"}
      className="w-[100px]"
      onClick={() => {
        window.open(shareLink, "_blank", "popup,width=800,height=1080,left=560");
      }}
    >
      View
    </Button>
  );
}

export default ViewBtn;