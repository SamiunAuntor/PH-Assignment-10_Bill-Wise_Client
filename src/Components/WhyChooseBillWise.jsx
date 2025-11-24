import React from "react";
import { Fade, Zoom } from "react-awesome-reveal";
import wcu1 from "../assets/wcu-1.png";
import wcu2 from "../assets/wcu-2.png";
import wcu3 from "../assets/wcu-3.png";
import wcu4 from "../assets/wcu-4.png";

const WhyChooseBillWise = () => {
    const features = [
        {
            img: wcu4,
            title: "Secure Payments",
            desc: "Your bill transactions are encrypted and protected.",
        },
        {
            img: wcu3,
            title: "One-click Bill History",
            desc: "Instantly access all your previous payments.",
        },
        {
            img: wcu2,
            title: "Monthly Bill Control",
            desc: "Track your spending and avoid unexpected charges.",
        },
        {
            img: wcu1,
            title: "Personalized Dashboard",
            desc: "Everything tailored to your bill payment needs.",
        },
    ];

    return (
        <div className="w-11/12 mx-auto py-16">

            {/* Title */}
            <Fade triggerOnce>
                <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-700">
                    Why Choose <span className="text-blue-500">BillWise?</span>
                </h2>
                <p className="text-center text-gray-600 mt-2">
                    Manage and track your bills with ease and confidence.
                </p>
            </Fade>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                {features.map((item, index) => (
                    <Zoom triggerOnce key={index}>
                        <div className="bg-white shadow-md p-6 rounded-2xl border border-blue-100 hover:shadow-xl hover:-translate-y-2 transition duration-300 flex flex-col h-[490px] md:h-[430px]">

                            {/* Image */}
                            <img
                                src={item.img}
                                alt={item.title}
                                className="w-full h-85  object-cover rounded-xl mb-4 md:h-70"
                            />

                            {/* Title */}
                            <h3 className="text-xl font-bold text-blue-600 mt-2 text-center">
                                {item.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 mt-2 text-center">
                                {item.desc}
                            </p>
                        </div>
                    </Zoom>
                ))}
            </div>
        </div>
    );
};

export default WhyChooseBillWise;
