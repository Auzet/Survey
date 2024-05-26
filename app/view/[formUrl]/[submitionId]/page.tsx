import {
  GetFormContentByUrl,
  GetFormWithSubmissionsByUrl,
} from "@/actions/form";
import { FormElementInstance } from "@/components/FormElements";
import FormViewComponent from "@/components/FormViewComponent";
import React from "react";

export type Row = { [key: string]: string };

async function ViewPage({
  params,
}: {
  params: {
    formUrl: string;
    submitionId: string;
  };
}) {
  const form = await GetFormContentByUrl(params.formUrl);
  if (!form) {
    throw new Error("form not found");
  }

  const formWithSubmissions = await GetFormWithSubmissionsByUrl(params.formUrl);
  if (!formWithSubmissions) {
    throw new Error("form not found");
  }

  
  const rows: Row[] = [];

  formWithSubmissions.FormSubmissions.forEach((submission) => {
    console.log("ggg");
    console.log(params.submitionId);
    if (String(submission.id) == params.submitionId) {
      const content = JSON.parse(submission.content);
      
      rows.push({
        ...content,
      });
    }
  });

  const formContent = JSON.parse(form.content) as FormElementInstance[];

  return (
    <FormViewComponent
      formUrl={params.formUrl}
      submitionContent={rows}
      content={formContent}
    />
  );
}

export default ViewPage;
