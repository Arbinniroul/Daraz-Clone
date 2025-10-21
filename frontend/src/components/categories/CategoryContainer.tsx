import CategoryComponent from "./CategoryComponent";


const CategoryContainer = () => {
  return (
      <div className="container w-full flex flex-col gap-2   ">
          <span className="font-semibold text-2xl tracking-wide px-3 mb-2 mt-2 hidden lg:block">
              Categories
          </span>
          <span className="font-semibold text-2xl tracking-wide px-15 mb-4 mt-2 block lg:hidden">
              Popular categories for you
          </span>
          <CategoryComponent />
      </div>
  );
}

export default CategoryContainer