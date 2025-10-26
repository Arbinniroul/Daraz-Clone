const ProductLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div
            className="max-h-7xl "
        >
            <div className=" flex justify-center border-0  my-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-5 ">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ProductLayout;
