"use client"

import React, { useCallback, useRef, useState, useTransition } from "react";
import { FormElementInstance, FormElements } from "./FormElements";
import { GetFormWithSubmissionsByUrl } from "@/actions/form";
import { string } from "zod";
import { Row } from "@/app/view/[formUrl]/[submitionId]/page";

async function FormViewComponent({
  formUrl,
  submitionContent,
  content,
}: {
  content: FormElementInstance[];
  submitionContent: Row[];
  formUrl: string;
}) {
  //const formValues = useRef<{ [key: string]: string }>({});
  //const formErrors = useRef<{ [key: string]: boolean }>({});
  //const [renderKey, setRenderKey] = useState(new Date().getTime());
  
  


  
  return (
    <div className="flex justify-center w-full h-full items-center p-8">
      <div
        //key={renderKey}
        className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-muted rounded"
      >
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent;
          //if (element.id in rows[0]) {
            return (
              <FormElement
                key={element.id}
                elementInstance={element}
                //submitValue={submitValue}
                //isInvalid={true}
                defaultValue={submitionContent[0][element.id]}
              />
            );
          //}
          //else {
          //  return (
          //  <FormElement
          //    key={element.id}
          //    elementInstance={element}
              //submitValue={submitValue}
              //isInvalid={formErrors.current[element.id]}
              //defaultValue={rows[0][element.id]}
          //  />
          //);
          //}
          
        })}
      </div>
    </div>
  );
}

export default FormViewComponent;
