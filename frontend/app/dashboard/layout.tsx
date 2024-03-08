"use client";
import Sidebar from "@/components/DashboardElements/Sidebar";
import Spinner from "@/components/DashboardElements/Spinner";
import { apiGetUser } from "@/lib/apiRequests";
import { useQuery } from "@tanstack/react-query";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    isLoading,
    error,
    data: user,
  } = useQuery<any>({
    queryKey: ["user"],
    queryFn: () => apiGetUser(),
  });

  if (isLoading) return <Spinner />;
  const self = user.data[0];

  return (
    <main className="flex flex-col min-h-screen">
      <section className="">
        <div className="flex">
          <Sidebar name={self?.full_name} />
          <div className="col-span-5 w-full mt-7 mx-8">{children}</div>
        </div>
      </section>
    </main>
  );
}
