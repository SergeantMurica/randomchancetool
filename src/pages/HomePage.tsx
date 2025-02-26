import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white">
                        Welcome to{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
              Fortuna
            </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
                        Your ultimate destination for all things random. Make decisions, play games, and have fun with our suite of random generators.
                    </p>
                    <Link
                        to="/tools"
                        className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                    >
                        Try Our Tools
                    </Link>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4 bg-gray-900/30">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
                        Discover Our Randomizers
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard
                            icon="🎲"
                            title="Dice Roll"
                            description="Roll virtual dice with realistic 3D animation. Perfect for board games or making random choices."
                        />
                        <FeatureCard
                            icon="🪙"
                            title="Coin Flip"
                            description="Flip a virtual coin with beautiful 3D animation. Heads or tails, let fate decide!"
                        />
                        <FeatureCard
                            icon="🎡"
                            title="Prize Wheel"
                            description="Create a customizable wheel with up to 35 options. Great for giveaways, choosing restaurants, or making group decisions."
                        />
                        <FeatureCard
                            icon="🎱"
                            title="Magic 8-Ball"
                            description="Ask a question and shake the virtual 8-ball for mystical answers to life's pressing questions."
                        />
                        <FeatureCard
                            icon="✂️"
                            title="Rock Paper Scissors"
                            description="Play the classic game against our computer opponent. Can you outsmart the algorithm?"
                        />
                        <FeatureCard
                            icon="🌈"
                            title="More Coming Soon!"
                            description="We're constantly adding new randomizers. Stay tuned for more exciting ways to introduce randomness to your life!"
                        />
                    </div>
                </div>
            </section>

            {/* Use Cases Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
                        How People Use Fort<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">una</span>
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <UseCaseCard
                            title="Teachers & Educators"
                            description="Use our randomizers to select students for participation, create random groups, or introduce an element of fun into the classroom."
                        />
                        <UseCaseCard
                            title="Friend Groups"
                            description="Can't decide where to eat or what movie to watch? Let our Prize Wheel make the decision for you and avoid those endless debates."
                        />
                        <UseCaseCard
                            title="Game Night Enthusiasts"
                            description="No dice? No problem! Our dice roller provides a perfect virtual alternative for your board game sessions."
                        />
                        <UseCaseCard
                            title="Decision Makers"
                            description="Sometimes the hardest part is making a choice. Our tools help break decision paralysis in a fun, engaging way."
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-to-r from-purple-800 to-indigo-800">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                        Ready to Add Some Randomness to Your Life?
                    </h2>
                    <p className="text-xl text-gray-300 mb-10">
                        Jump in and explore our collection of random generators. No account needed, no downloads required – just instant fun!
                    </p>
                    <Link
                        to="/tools"
                        className="px-8 py-4 bg-white text-purple-800 font-bold rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                    >
                        Get Started Now
                    </Link>
                </div>
            </section>
        </div>
    );
};

// Helper Components
const FeatureCard: React.FC<{
    icon: string;
    title: string;
    description: string;
}> = ({ icon, title, description }) => {
    return (
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg">
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
            <p className="text-gray-300">{description}</p>
        </div>
    );
};

const UseCaseCard: React.FC<{
    title: string;
    description: string;
}> = ({ title, description }) => {
    return (
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
            <p className="text-gray-300">{description}</p>
        </div>
    );
};

export default HomePage;
