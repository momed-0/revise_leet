export function HomePageSkeleton() {
  return (
    <div className={`max-w-screen-xl mx-auto py-10 lg:py-16 px-6 xl:px-0 flex flex-col lg:flex-row gap-12`}>
      {/* Main Content Skeleton */}
      <div className="flex-1">
        <div className="sticky top-0 z-10 bg-white/90 backdrop-blur px-6 py-4 border-b">
          <div className="max-w-screen-xl mx-auto">
            <div className="h-8 w-1/3 bg-gray-200 rounded mb-4 animate-pulse"></div>
            <div className="flex flex-wrap gap-4">
              <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-40 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="w-full mt-6 space-y-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-100 animate-pulse"
            >
              <div className="h-6 w-1/4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-full bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Tags Sidebar Skeleton */}
      <div className="lg:w-1/4 shrink-0 space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-10 w-full bg-gray-200 rounded animate-pulse"
          ></div>
        ))}
      </div>
    </div>
  );
}


export function SubmissionDetailsSkeleton() {
  return (
    <div className="max-w-screen-xl mx-auto py-10 lg:py-16 px-6 xl:px-0 flex flex-col lg:flex-col gap-12">
      {/* Title and Description Skeleton */}
      <div className="mb-8 flex-1">
        <div className="h-8 w-1/3 bg-gray-200 rounded mb-4 animate-pulse"></div>
        <div className="h-6 w-1/4 bg-gray-200 rounded mb-4 animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Solutions Section Skeleton */}
      <div className="flex-1">
        <div className="h-6 w-1/4 bg-gray-200 rounded mb-4 animate-pulse"></div>
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-100 animate-pulse"
            >
              <div className="h-6 w-1/4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-full bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}