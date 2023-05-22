import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Product } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  const { name, image, description, categoryId, price } = await req.json();
  const product = await prisma.product.create({
    data: {
      name: name,
      description: description,
      price: price,
      image: image,
      categoryId: categoryId,
    },
  });
  return NextResponse.json(product);
};

export const GET = async (req: Request) => {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
};
