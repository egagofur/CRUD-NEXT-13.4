"use client";

import AddProduct from "@/app/dashboard/addProduct";
import DeleteProduct from "@/app/dashboard/deleteProduct";
import UpdateProduct from "@/app/dashboard/updateProduct";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import type { Category } from "@prisma/client";

const TABLE_HEAD = [
  "Product Name",
  "Description",
  "Category",
  "price",
  "Action",
];

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  categoryId: number;
  category: CategoryProduct;
};

type CategoryProduct = {
  id: number;
  name: string;
};

export default function Table({
  products,
  categoryProduct,
}: {
  products: Product[];
  categoryProduct: Category[];
}) {
  return (
    <Card className="w-full h-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex items-center justify-between gap-8 mb-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Products list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all products
            </Typography>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-72">
            <AddProduct categoryProduct={categoryProduct} />
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-0 overflow-scroll">
        <table className="w-full mt-4 text-left table-auto min-w-max">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              const isLast = index === product.id - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={index}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar
                        variant="rounded"
                        src={
                          product.image ? product.image : "/img/placeholder.png"
                        }
                        alt={product.name}
                        size="lg"
                      />
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {product.name}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {product.description}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={product.category.name}
                        color={"green"}
                      />
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {product.price}
                    </Typography>
                  </td>
                  <td className={`classes space-x-4`}>
                    <UpdateProduct
                      categoryProduct={categoryProduct}
                      product={product}
                    />
                    <DeleteProduct product={product} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
