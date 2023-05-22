import { PrismaClient } from "@prisma/client";
import Table from "@/components/Table";
import { useEffect } from "react";

const prisma = new PrismaClient();

const getProducts = async () => {
  const res = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      image: true,
      categoryId: true,
      category: {
        select: {
          name: true,
        },
      },
    },
  });
  return res;
};

const getCategories = async () => {
  const res = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  return res;
};

const Dashboard = async () => {
  const [products, categoryProduct] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <>
      <Table products={products} categoryProduct={categoryProduct} />
    </>
  );
};

export default Dashboard;
