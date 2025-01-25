import ApplicationLogo from "@/Components/App/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col items-center min-h-screen pt-6 bg-gray-100 sm:justify-center sm:pt-0 dark:bg-gray-900">
      <div>
        <Link href="/">
          <ApplicationLogo className="w-20 h-20 text-gray-500 fill-current" />
        </Link>
      </div>

      <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg dark:bg-gray-800">
        {children}
      </div>
    </div>
  );
}
