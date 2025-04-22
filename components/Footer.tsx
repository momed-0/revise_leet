export default function Footer() {
    return (
        <footer className=" rounded-lg shadow-sm m-4 dark:bg-gray-800">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025. Made By Mohammed.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                <li>
                    <a href="https://www.linkedin.com/in/mohammed-n-1347461b3" className="hover:underline me-4 md:me-6">LinkedIn</a>
                </li>
                <li>
                    <a href="https://github.com/momed-0/" className="hover:underline me-4 md:me-6">Github</a>
                </li>
                <li>
                    <a href="https://leetcode.com/u/superman123_2/" className="hover:underline me-4 md:me-6">Leetcode</a>
                </li>
                <li>
                    <a href="mailto:mohammedn78501@gmail.com" className="hover:underline">Contact</a>
                </li>
            </ul>
            </div>
        </footer>

    )
}