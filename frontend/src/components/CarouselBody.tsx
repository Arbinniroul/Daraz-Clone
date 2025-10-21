import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const CarouselBody = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const Images = [
        "https://img.lazcdn.com/us/domino/0792072b-d8eb-48ae-9927-7a179bde5051_NP-1976-688.jpg_2200x2200q80.jpg_.avif",
        "https://img.lazcdn.com/us/domino/416da33e-6c67-4a5d-83b6-b597cb3e976c_NP-1976-688.jpg_2200x2200q80.jpg_.avif",
        "https://img.lazcdn.com/us/domino/9086a7a8-ef00-45f7-83f1-da1bfd5e6c6b_NP-1976-688.jpg_2200x2200q80.jpg_.avif",
        "https://img.lazcdn.com/us/domino/d5bca32c-70ca-4dbd-a8d4-84109f2c70c8_NP-1976-688.jpg_2200x2200q80.jpg_.avif",
    ];

    
    
    const handleCarousel = (direction: string) => {
        if (direction === "left") {
            setCurrentIndex(
                (prevIndex) => (Images.length + prevIndex - 1) % Images.length
            );
        } else {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % Images.length);
        }
    };
    useEffect(() => {
        const interval = setInterval(() => {
            handleCarousel("right");
        }, 5000);

        return () => clearInterval(interval); 
    }, []);

    return (
        <div className=" w-full  cursor-pointer  ">
            <div className="  relative flex items-center   text-white ">
                <div className="absolute  bottom-4 flex justify-center   w-full  space-x-0 sm:space-x-1 md:space-x-3/2 lg:space-x-2 ">
                    {Images.map((_, idx) => (
                        <div
                            key={idx}
                            className={`size-2 sm:size-3 rounded-full ${
                                currentIndex === idx
                                    ? "bg-white"
                                    : "bg-gray-400"
                            }`}
                        ></div>
                    ))}
                </div>
                <div
                    className="absolute   right-0 bg-gray-400/30 p-3 rounded-l-full cursor-pointer hover:bg-gray-400/50 transition lg:block hidden "
                    onClick={() => handleCarousel("right")}
                >
                    <ArrowRight />
                </div>
                <img
                    src={Images[currentIndex]}
                    alt="carousel"
                    className=" aspect-auto h-auto w-screen rounded-md object-cover    "
                />

                <div className="absolute  bg-gray-400/30 p-3 rounded-r-full cursor-pointer hover:bg-gray-400/50 transition lg:block hidden">
                    <ArrowLeft onClick={() => handleCarousel("left")} />
                </div>
                {/* Dots */}
            </div>
        </div>
    );
};

export default CarouselBody;
