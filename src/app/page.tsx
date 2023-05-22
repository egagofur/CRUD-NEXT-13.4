"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import CardProduct from "@/components/Card";
import Footer from "@/components/Footer";
import Header from "@/components/Navbar";
import useSWR from "swr";

const getDataProducts = async () => {
  const { data } = await axios.get("/api/product");
  return data;
};

export default function Home() {
  const { data: products } = useSWR("/api/product", getDataProducts, {
    refreshInterval: 60000,
  });

  return (
    <>
      <Header />
      <main className="container flex items-center justify-center py-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 my-16 md:grid-cols-3">
          {products?.map(
            ({
              id,
              name,
              description,
              price,
              image,
              category,
            }: {
              id: number;
              name: string;
              description: string;
              price: number;
              image: string;
              category: string;
            }) => (
              <CardProduct
                name={name}
                description={description}
                price={price}
                image={image}
                key={id}
                id={0}
                category={""}
              />
            )
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
