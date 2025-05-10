"use client"

import { usePathname, useRouter } from "next/navigation"
import * as React from "react"
import Image from "next/image"
import { ModeToggle } from "./ui/themeToggle"
import { logout } from "@/app/api/auth"

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [showSignOut, setShowSignOut] = React.useState(false)
  const hideBackButton = pathname === "/home"  || pathname === "/" || pathname === "/login";
  const handleBack = () => {
    if (!hideBackButton) {
      router.push("/home")
    }
  }

  const handleSignOut = async () => {
      const {error} = await logout()
      if(error == null) {
        // Save authentication state in cookies
        document.cookie = "auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        router.push("/login")
      } else {
        console.error("Failed to logout")
      }

  }

  return (
    <header className="relative w-full px-4 py-3 border-b flex items-center justify-between bg-white dark:bg-gray-900">
      <div className="flex items-center gap-2">
        {!hideBackButton && (
           <button onClick={handleBack} className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition flex items-center">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
           </svg>
           <span className="ml-1 font-bold text-lg">Back</span>
         </button>
         
        )}
      </div>
      <div className= "flex items-center gap-4">
        <ModeToggle />
         { pathname !== "/login" && (
            <div
              className="relative flex items-center"
              onMouseEnter={() => setShowSignOut(true)}
              onMouseLeave={() => setShowSignOut(false)}
            >
              <Image
                src="/avatar.png" 
                alt="User Avatar"
                width={32}
                height={32}
                className="rounded-full border dark:border-gray-700"
              />
              <button
                onClick={handleSignOut}
                className={`ml-2 text-sm px-3 py-1 rounded transition-all duration-200 ${
                  showSignOut ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                }  bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300`}
              >
                Sign Out
              </button>
            </div>
          ) 
        }
      </div>
    </header>
  )
}