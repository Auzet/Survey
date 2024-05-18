"use client";

import { Form } from "@prisma/client";
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import React from "react";
import PreviewDialogBtn from "./PreviewDialogBtn";
import SaveFormBtn from "./SaveFormBtn";
import PublishFormBtn from "./PublishFormBtn";
import Designer from "./Designer";
import DragOverlayWrapper from "./DragOverlayWrapper";

function FormBuilder({ form }: { form: Form }) {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // 10px
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <DndContext sensors={sensors}>
      <main className="flex flex-col w-full">
        <div className="flex justify-between border-b-2 p-4 gap-3 items-center">
          <h2 className="truncane font-medium">
            <span className=" text-muted-foreground mr-2">Form:</span>
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogBtn />
            {!form.published && (
              <>
                  <SaveFormBtn />
                  <PublishFormBtn />
              </>
            )}
          </div>
        </div>
        <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/jigsaw.svg)] dark:bg-[url(/jigsaw-dark.svg)]">
          <Designer />
        </div>
      </main>
    <DragOverlayWrapper />
    </DndContext>
  );
}

export default FormBuilder;
