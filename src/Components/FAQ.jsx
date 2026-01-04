import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "How long does it take for a bill to be processed?",
            answer: "Most bills are processed instantly. However, depending on the provider, it may take up to 24 hours for the payment to reflect in their system.",
        },
        {
            question: "Is it safe to save my card details on BillWise?",
            answer: "Absolutely. We use 256-bit SSL encryption and follow PCI-DSS compliance standards to ensure your data is never compromised.",
        },
        {
            question: "Can I get a refund if I pay the wrong amount?",
            answer: "Refunds depend on the utility provider's policy. Please contact our 24/7 support team immediately if you make a mistake.",
        },
        {
            question: "Are there any extra service charges?",
            answer: "We believe in transparency. Most government utility bills are free, while some private providers may carry a small convenience fee starting at $0.50.",
        },
        {
            question: "What happens if my payment fails but money is deducted?",
            answer: "Don't worry! If a transaction fails, the deducted amount is automatically reversed to your original payment method within 3-5 business days.",
        },
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-16">
            <div className="max-w-3xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-black text-blue-700 mb-4">Frequently Asked <span className="text-blue-500">Questions</span> </h2>
                    <p className="text-gray-600">Have questions? We're here to help you understand how BillWise works.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex items-center justify-between p-5 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                            >
                                <span className="font-semibold text-gray-800">{faq.question}</span>
                                {openIndex === index ? (
                                    <ChevronUp className="text-green-600 w-5 h-5" />
                                ) : (
                                    <ChevronDown className="text-gray-400 w-5 h-5" />
                                )}
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="p-5 text-gray-600 bg-white border-t border-gray-200">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;