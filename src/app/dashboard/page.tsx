import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import AddProduct from "./addProduct";

const prisma = new PrismaClient();

const getProducts = async () => {
  const res = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      image: true,
      category: true,
    },
  });
  return res;
};

const Dashboard = async () => {
  const products = await getProducts();
  return (
    <>
      <div className="mb-2">
        <AddProduct />
      </div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Desc
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={product.id}
              >
                <td className="px-6 py-4">{index + 1}</td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {product.name}
                </th>
                <td className="px-6 py-4">{product.description}</td>
                <td className="px-6 py-4">{product.category.name}</td>
                <td className="px-6 py-4">{product.price}</td>
                <td className="px-6 py-4">{product.image}</td>
                <td className="flex items-center px-6 py-4 space-x-3">
                  <Link
                    href="/"
                    className="px-6 py-2 font-medium text-white bg-yellow-600 rounded-md dark:text-blue-500"
                  >
                    Edit
                  </Link>
                  <button className="px-6 py-2 font-medium text-white bg-red-500 rounded-md dark:text-red-500">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
