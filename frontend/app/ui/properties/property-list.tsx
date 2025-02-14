/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  useQuery,
  QueryClient,
  dehydrate,
  hydrate,
} from "@tanstack/react-query";

import { reqFlow } from "@/lib/axiosApi";
import endpoints from "@/config/endpoints";
import PropertySkeleton from "./propertySkeleton";
import Properties from "./properties";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const PropertyList = () => {
  const bookingFilter = useSelector((state: RootState) => state.bookingFilter);
  const categoryFIlter = useSelector((state: RootState) => state.category);
  const filter = useSelector((state: RootState) => state.filter);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["listings", bookingFilter, categoryFIlter, filter],
    queryFn: () =>
      reqFlow({
        url: endpoints.properties.ALL_PROPERTIES(""),
        method: "GET",
        params: {
          ...bookingFilter,
          ...categoryFIlter,
          ...filter,
        },
      }),
  });
  if (isLoading) {
    return <PropertySkeleton />;
  }
  if (!data) {
    return <div>no data</div>;
  }
  if (isError) {
    return <div>no data</div>;
  }

  return (
    <main className="px-6  grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 xs:grid-cols-1  gap-6 pt-4">
      {data?.data.length >= 1 ? (
        data?.data?.map((property: any) => (
          <Properties
            key={property.id}
            id={property.id}
            rating={property.rating}
            images={property.images}
            bookmarked={property.bookmarked}
            location={`${property.address?.town?.name}, ${property.address?.town?.state?.country?.name}`}
            price_per_night={property.price_per_night}
          />
        ))
      ) : (
        <div>no data</div>
      )}
    </main>
  );
};

export default PropertyList;
