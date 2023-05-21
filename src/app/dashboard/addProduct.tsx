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
import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

export default function AddProduct() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Add Product</Button>
      <Dialog open={open} handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader>Add new product</DialogHeader>
          <XMarkIcon className="w-5 h-5 mr-3" onClick={handleOpen} />
        </div>
        <DialogBody divider>
          <div className="grid gap-6">
            <Input label="product name" />
            <Textarea label="description" />
            <Input label="price" />
            <Input label="category" />
            <Input label="image" />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="outlined" color="red" onClick={handleOpen}>
            close
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            save
          </Button>
        </DialogFooter>
      </Dialog>
    </React.Fragment>
  );
}
