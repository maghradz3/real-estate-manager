import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAllCities, getAllRegions } from "@/utils/action";
import AddNewEstate from "@/components/RealEstateForm";

const AddNewEstatePage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["region"],
    queryFn: () => getAllRegions(),
  });
  await queryClient.prefetchQuery({
    queryKey: ["city"],
    queryFn: () => getAllCities(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AddNewEstate />
    </HydrationBoundary>
  );
};

export default AddNewEstatePage;
