"use server";

import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { use } from "react";
import { formSchema, formSchemaType } from "@/schemas/form";
class UserNotFoundErr extends Error {}

export async function GetFormStats() {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  const stats = await prisma.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });

  const visits = stats._sum.visits || 0;
  const submissions = stats._sum.submissions || 0;

  let submissionRate = 0;
  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;

  return {
    visits,
    submissions,
    submissionRate,
    bounceRate,
  };
}

export async function CreateForm(data: formSchemaType) {
  const validation = formSchema.safeParse(data);
  if (!validation.success) {
    throw new Error("Invalid input");
  }

  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  const form = await prisma.form.create({
    data: {
      userId: user.id,
      name: data.name,
      description: data.description,
    },
  });

  if (!form) {
    throw new Error("Something went wrong");
  }
  return form.id;
}

export async function GetForms() {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  return await prisma.form.findMany({
    where: {
      userId: user.id,
    },
    orderBy: { CreatedAt: "desc" },
  });
}

export async function GetFormById(id: number) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }
  return await prisma.form.findUnique({
    where: {
      userId: user.id,
      id,
    },
  });
}

export async function UpdateFormContent(id: number, jsonContent: string) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  return await prisma.form.update({
    where: {
      userId: user.id,
      id,
    },
    data: {
      content: jsonContent,
    },
  });
}

export async function PublishForm(id: number) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  return await prisma.form.update({
    data: {
      published: true,
    },
    where: {
      userId: user.id,
      id,
    },
  });
}

export async function GetFormContentByUrl(formUrl: string) {
  return await prisma.form.update({
    select: {
      content: true,
    },
    data: {
      visits: {
        increment: 1,
      },
    },
    where: {
      shareUrl: formUrl,
    },
  });
}

export async function SubmitForm(formUrl: string, content: string) {
  return await prisma.form.update({
    data: {
      submissions: {
        increment: 1,
      },
      FormSubmissions: {
        create: {
          content,
        },
      },
    },
    where: {
      shareUrl: formUrl,
      published: true,
    },
  });
}

export async function GetFormWithSubmissions(id: number) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  return await prisma.form.findUnique({
    where: {
      userId: user.id,
      id,
    },
    include: {
      FormSubmissions: true,
    },
  });
}

export async function GetFormWithSubmissionsByUrl(formUrl: string) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }
  return await prisma.form.findUnique({
    where: {
      userId: user.id,
      shareUrl: formUrl,
    },
    include: {
      FormSubmissions: true,
    },
  });
}

export async function SendEmails(emails: string[]) {
  const user = await currentUser();
  const KEY = "6qwr857oniw481t653ymgdoa8kpzebwg1pch9cie";
  const link = "http://localhost:3000/submit/3ee30d18-be55-40a4-8c80-5ff18cd862ee"
  if (!user) {
    throw new UserNotFoundErr();
  }
  //const result = fetch(`https://api.unisender.com/ru/api/createList?format=json&api_key=${KEY}&title=NewListName`)
  /* emails.map((email, index) =>
    fetch(`https://api.unisender.com/ru/api/importContacts?format=json&api_key=${KEY}&field_names[0]=email&field_names[1]=email_list_ids&data[${index}][0]=${email}&data[${index}][1]=3`)
); */
  /* const message = await fetch(`https://api.unisender.com/ru/api/createEmailMessage?format=json&api_key=${KEY}&sender_name=Survey&sender_email=alexuinzet@yandex.ru&subject=Submit a subcontractor form&body=<p>${link}</p>&list_id=3`);
  console.log(await message.json()) */
  const response = await fetch(`https://api.unisender.com/ru/api/createCampaign?format=json&api_key=${KEY}&message_id=226355858`)
  console.log(await response.json())
  
  return 0;
}
