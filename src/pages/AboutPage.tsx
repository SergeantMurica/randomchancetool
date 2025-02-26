import React from "react";

const AboutPage: React.FC = () => {
    return (
        <div className="min-h-screen py-10 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-10 text-center text-white">
                    About Random<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">Fun</span>
                </h1>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-lg">
                    <h2 className="text-2xl font-bold mb-4 text-white">Our Story</h2>
                    <p className="text-gray-300 mb-6">
                        Fortuna was created with a simple mission: to make decision-making fun and accessible to everyone.
                        We believe that sometimes the best way to make a choice is to leave it up to chance!
                    </p>

                    <h2 className="text-2xl font-bold mb-4 text-white">Why Use Randomizers?</h2>
                    <p className="text-gray-300 mb-6">
                        Randomness helps us break free from our usual patterns and biases. Whether you're stuck in a decision loop,
                        looking to spice up game night, or just curious about what fate has in store, our tools provide a playful way
                        to introduce chance into your life.
                    </p>

                    <h2 className="text-2xl font-bold mb-4 text-white">Our Technology</h2>
                    <p className="text-gray-300 mb-6">
                        Built with React and TypeScript, our randomizers use high-quality pseudo-random number generation to ensure fair and
                        unpredictable results. The 3D animations are powered by modern CSS transformations for a smooth, engaging experience
                        across all devices.
                    </p>

                    <h2 className="text-2xl font-bold mb-4 text-white">Contact Us</h2>
                    <p className="text-gray-300">
                        Have suggestions for new randomizers? Found a bug? Or just want to say hello?
                        Reach out to us at <a href="mailto:hello@Fortuna.com" className="text-purple-400 hover:text-purple-300">Placholder@notready.com</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
