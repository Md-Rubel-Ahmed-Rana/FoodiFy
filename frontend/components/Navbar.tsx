import Link from "next/link";
import { ThemeToggle } from "./theme-switcher";
import { FaCartShopping } from "react-icons/fa6";

const Navbar = () => {
  return (
    <div className="px-4 py-3 dark:bg-transparent shadow bg-green-500  flex justify-between items-center">
      <h1 className="text-2xl text-white font-semibold">Foodify</h1>
      <ul className="flex items-center gap-3 text-lg font-semibold text-white">
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/"}>Recipes</Link>
        </li>
        <li>
          <Link href={"/"}>Restaurants</Link>
        </li>
        <li>
          <Link href={"/account/login"}>Sign</Link>
        </li>
        <li>
          <Link href={"/account/register"}>Signup</Link>
        </li>
      </ul>
      <div className="flex items-center gap-4">
        <Link className="border p-1 rounded-md" href={"/cart"}>
          <FaCartShopping size={20} color="white" />
        </Link>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
