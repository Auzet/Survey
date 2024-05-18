import React from "react";
import useDesigner from "./hooks/useDesigner";
import { FormElements } from "./FormElements";
import { AiOutlineCheck } from "react-icons/ai";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

function PropertiesFormSidebar() {
  const { selectedElement, setSelectedElement } = useDesigner();
  if (!selectedElement) return null;

  const PropertiesForm =
    FormElements[selectedElement?.type].propertiesComponent;

  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between items-center">
        <p className="text-sm text-foreground/70">Element properties</p>
      </div>
      <Separator className="mb-4" />
      <PropertiesForm elementInstance={selectedElement} />

      <div className="flex justify-center items-center mt-4">
        <Button
          className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400"
          variant={"outline"}
          onClick={() => {
            setSelectedElement(null);
          }}
        >
          Save and close
          <AiOutlineCheck />
        </Button>
      </div>
    </div>
  );
}

export default PropertiesFormSidebar;
