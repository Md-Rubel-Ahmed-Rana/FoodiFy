import { ThemeToggle } from "./theme-switcher";

const Navbar = () => {
  return (
    <div className="px-4 py-2  flex justify-between items-center">
      <h1 className="text-2xl font-semibold">FoodiFy</h1>
      <ThemeToggle />
    </div>
  );
};

export default Navbar;
