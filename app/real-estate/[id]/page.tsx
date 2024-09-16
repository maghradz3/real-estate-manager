import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getRealEstateById } from "@/utils/action";
import DetailRealEstate from "@/components/DetailRealEstate";

interface Params {
  id: string;
}

const page = async ({ params }: { params: Params }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [params.id],
    queryFn: () => getRealEstateById(Number(params.id)),
  });
  console.log(params);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DetailRealEstate id={params.id} />
    </HydrationBoundary>
  );
};

export default page;
