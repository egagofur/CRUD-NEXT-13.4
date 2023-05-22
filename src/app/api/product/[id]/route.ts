import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const DELETE = async (
  req: Request,
  { params }: { params: { id: number } }
) => {
  await prisma.product.delete({
    where: {
      id: Number(params.id),
    },
  });

  return NextResponse.json({ success: true, status_code: 200 });
};
export const PATCH = async (
  req: Request,
  { params }: { params: { id: number } }
) => {
  const body = await req.json();
  await prisma.product.update({
    where: {
      id: Number(params.id),
    },
    data: {
      name: body.name,
      price: body.price,
      description: body.description,
      image: body.image,
      categoryId: body.categoryId,
    },
  });

  return NextResponse.json({ success: true, status_code: 200 });
};
