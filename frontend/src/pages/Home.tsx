import CarouselBody from "@/components/CarouselBody";
import Navbar from "@/components/Navbar";

const Home = () => {
    return (
        <div>
            <Navbar />
            <CarouselBody />
            <div className="mt-10 flex justify-center">
                <img
                    src="https://img.lazcdn.com/us/domino/017b3cc5-dab5-4d73-aabf-ae7a651c6dfc_NP-1188-140.gif_2200x2200q80.gif_.webp"
                    alt=""
                />
            </div>
        </div>
    );
};

export default Home;
