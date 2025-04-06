export default function EmptyPage({text}: {text: string}) {
    return (
        <div className="flex flex-col items-center justify-center mt-20">
          <img
            src="/nothing.svg" 
            alt="No Submissions"
            className="w-64 h-64"
          />
          <h2 className="mt-6 text-xl font-semibold text-gray-700">
            No Data found
          </h2>
          <p className="mt-2 text-gray-500">
            {text}
          </p>
        </div>
      );
}
