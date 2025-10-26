import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import type { AppDispatch, RootState } from "@/store";
import { getCategories } from "@/store/slices/categorySlice";
import type { Category } from "@/types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CategoryBar = () => {
    const {category}=useSelector((state:RootState)=>state.categories);
    const dispatch=useDispatch<AppDispatch>();
    useEffect(()=>{
         dispatch(getCategories()).unwrap()
    },[dispatch,])

    return (
        <div className="w-full  bg-[#ffffff]">
            <div className="container mx-64">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>
                                Categories
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                {category.map((categories: Category) => (
                                    <NavigationMenuLink
                                        key={categories.id}
                                        href={`products/category/${categories.id}`}
                                        className="px-4 py-2 block hover:bg-gray-100"
                                    >
                                        {categories.name}
                                    </NavigationMenuLink>
                                ))}
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </div>
    );
};

export default CategoryBar;
