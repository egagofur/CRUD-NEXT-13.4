import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Product } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  const body: Product = await req.json();
  const product = await prisma.product.create({
    data: {
      name: body.name,
      description: body.description,
      price: body.price,
      image: body.image,
      categoryId: body.categoryId,
    },
  });
  return NextResponse.json(product);
};

export const PUT = async (req: Request) => {
  const body: Product = await req.json();
  const product = await prisma.product.update({
    where: {
      id: body.id,
    },
    data: {
      name: body.name,
      description: body.description,
      price: body.price,
      image: body.image,
      categoryId: body.categoryId,
    },
  });
  return NextResponse.json(product);
};
