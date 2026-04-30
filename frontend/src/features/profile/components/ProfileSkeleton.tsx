import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ProfileSkeleton = () => (
  <div className="container mx-auto py-10 space-y-8 animate-in fade-in duration-500">
    {/* Header skeleton */}
    <div className="flex flex-col md:flex-row items-center gap-8 bg-card p-8 rounded-2xl border">
      <Skeleton className="h-28 w-28 rounded-full shrink-0" />
      <div className="space-y-3 text-center md:text-left w-full">
        <Skeleton className="h-9 w-52 mx-auto md:mx-0" />
        <Skeleton className="h-4 w-64 mx-auto md:mx-0" />
        <div className="flex gap-2 justify-center md:justify-start">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </div>
    </div>

    {/* Body skeleton */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <Card className="lg:col-span-2 border-none shadow-md ring-1 ring-border">
        <CardHeader className="pb-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-56 mt-1" />
        </CardHeader>
        <CardContent className="space-y-6 px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-11 w-full rounded-lg" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-11 w-full rounded-lg" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-44" />
              <Skeleton className="h-11 w-full rounded-lg" />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Skeleton className="h-11 w-52 rounded-lg" />
          </div>
        </CardContent>
      </Card>
      <div className="space-y-6">
        <Card className="border-none shadow-md ring-1 ring-border">
          <CardHeader>
            <Skeleton className="h-4 w-32" />
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </CardContent>
        </Card>
        <Skeleton className="h-24 w-full rounded-2xl" />
      </div>
    </div>
  </div>
);
