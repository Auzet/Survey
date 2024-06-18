"use client";
import React from "react";
import { Button } from "./ui/button";
import { MdMailOutline, MdPreview } from "react-icons/md";
import useDesigner from "./hooks/useDesigner";
import { FormElements } from "./FormElements";
import { formMailSchemaType, formMailSchema } from "@/schemas/formMail";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "./ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { SendEmails } from "@/actions/form";

function MailBtn() {
  const router = useRouter();
  const form = useForm<formMailSchemaType>({
    resolver: zodResolver(formMailSchema),
  });

  async function onSubmit(values: formMailSchemaType) {
    try {
      const emails = values.adresses.split("\n")
      const formId = await SendEmails(emails);
      toast({
        title: "Success",
        description: "A link is sent to your clients",
      });
      console.log(formId);
      //router.push(`/builder/${formId}`);
    } 
    catch (error) {
        toast({
          title: "Error",
          description: "Something went wrong, please try again",
          variant: "destructive",
        })
    };
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button className="gap-2">
          <MdMailOutline className="h-6 w-6" />
          Send a link
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send a link to your clients</DialogTitle>
          <DialogDescription>
            Paste e-mails
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="adresses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>List of e-mails:</FormLabel>
                  <FormControl>
                    <Textarea rows={15} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
            className="w-full mt-4"
          >
            {!form.formState.isSubmitting && <span>Send</span>}
            {form.formState.isSubmitting && <ImSpinner2 className ="animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default MailBtn;