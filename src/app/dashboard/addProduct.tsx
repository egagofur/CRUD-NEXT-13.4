"use client";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import axios from "axios";
import { XMarkIcon } from "@heroicons/react/24/solid";
import React, {
  useState,
  SyntheticEvent,
  ChangeEvent,
  FormEventHandler,
} from "react";
import { useRouter } from "next/navigation";
import type { Category } from "@prisma/client";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../api/uploadthing/core";

export default function AddProduct({
  categoryProduct,
}: {
  categoryProduct: Category[];
}) {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const handleOpen = () => setOpen(!open);
  const router = useRouter();

  const handleSubmit: FormEventHandler<
    HTMLFormElement | HTMLInputElement
  > = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.post("/api/product", {
      name: name,
      description: description,
      price: Number(price),
      categoryId: Number(category),
      image: image,
    });

    setName("");
    setDescription("");
    setPrice(0);
    setCategory("");
    setImage("");

    router.refresh();
    setOpen(false);
  };

  const handleCancel = () => {
    setName("");
    setDescription("");
    setPrice(0);
    setCategory("");

    handleOpen();
  };

  return (
    <React.Fragment>
      <Button color="blue" size="md" onClick={handleOpen}>
        Add Product
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        className="flex flex-col overflow-hidden"
      >
        <div className="flex items-center justify-between">
          <DialogHeader>Add new product</DialogHeader>
          <XMarkIcon className="w-5 h-5 mr-3" onClick={handleOpen} />
        </div>
        <form onSubmit={handleSubmit}>
          <DialogBody divider className={"space-y-4"}>
            <Input
              label="product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Textarea
              label="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Input
              type="number"
              label="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" disabled>
                Select a Category
              </option>
              {categoryProduct?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <UploadButton<OurFileRouter>
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                alert("Succes upload image");
                setImage(res[0].fileUrl);
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
          </DialogBody>
          <DialogFooter className="flex space-x-2 ga-8">
            <Button variant="outlined" color="red" onClick={handleCancel}>
              close
            </Button>
            <Button variant="gradient" color="green" type="submit">
              save
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
