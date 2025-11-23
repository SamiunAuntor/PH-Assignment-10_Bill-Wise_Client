import React, { useState, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";

// Background images
import bg1 from "../assets/bg1.jpg";
import bg2 from "../assets/bg2.jpg";
import bg3 from "../assets/bg3.png";
import bg4 from "../assets/bg4.png";
import bg5 from "../assets/bg5.png";
import bg6 from "../assets/bg6.png";

const Banner = () => {
    const slides = [
        { text: "Track Your Utility Bills Effortlessly", bg: bg1 },
        { text: "Pay On Time, Every Time", bg: bg2 },
        { text: "All Your Bills in One Dashboard", bg: bg3 },
        { text: "Avoid Late Fees Automatically", bg: bg4 },
        { text: "Get Insights on Your Usage Patterns", bg: bg5 },
        { text: "Stay Organized & Stress-Free", bg: bg6 },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [showText, setShowText] = useState(true);

    useEffect(() => {
        const slideDuration = 5000;

        const interval = setInterval(() => {
            setShowText(false);
            setTimeout(() => {
                setCurrentSlide((prev) => (prev + 1) % slides.length);
                setShowText(true);
            }, 300);
        }, slideDuration);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="pt-10">
            <div
                className="relative w-11/12 mx-auto pt-8 rounded-xl overflow-hidden h-[40vh] md:h-[80vh]"
            >

                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                            }`}
                        style={{
                            backgroundImage: `url(${slide.bg})`,
                            backgroundSize: "100% 100%",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}
                    >
                        {/* Overlay */}
                        <div className="w-full h-full bg-black/40 flex items-center justify-center px-4">
                            {index === currentSlide && showText && (
                                <h1 className="text-3xl md:text-5xl font-bold text-white text-center">
                                    <Typewriter
                                        words={[slide.text]}
                                        loop={1}
                                        cursor
                                        cursorStyle="|"
                                        typeSpeed={70}
                                        deleteSpeed={50}
                                        delaySpeed={500}
                                    />
                                </h1>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Banner;
