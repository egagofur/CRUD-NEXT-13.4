"use client";

import {
  Button,
  ButtonGroup,
  Dialog,
  DialogBody,
  DialogFooter,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { TrashIcon, BellIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: number;
};

export default function DeleteProduct({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async (productId: number) => {
    await axios.delete(`/api/product/${productId}`);
    setOpen(false);
    router.refresh();

    return;
  };

  const handleOpen = () => setOpen(!open);

  return (
    <React.Fragment>
      <IconButton variant="filled" color="red" onClick={handleOpen}>
        <TrashIcon className="w-4 h-4" />
      </IconButton>
      <Dialog open={open} handler={handleOpen}>
        <DialogBody divider className="grid gap-4 place-items-center">
          <BellIcon className="w-16 h-16 text-red-500" />
          <Typography color="red" variant="h4">
            Delete Product {product.name}
          </Typography>
          <Typography className="font-normal text-center">
            Are you sure you want to delete this product? All of your data will
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleOpen}>
            close
          </Button>
          <Button
            variant="gradient"
            color="red"
            onClick={() => handleDelete(product.id)}
          >
            delete
          </Button>
        </DialogFooter>
      </Dialog>
    </React.Fragment>
  );
}
