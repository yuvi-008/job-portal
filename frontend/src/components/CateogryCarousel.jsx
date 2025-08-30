import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CategoryCarousel = () => {
  const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Science",
    "DevOps Engineer",
    "UI/UX Designer",
    "Mobile Developer",
    "QA Engineer",
    "Product Manager",
    "Data Analyst",
  ];

  const scrollLeft = () => {
    const container = document.getElementById("category-container");
    if (container) {
      container.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    const container = document.getElementById("category-container");
    if (container) {
      container.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-purple-400 mb-4">Popular Job Categories</h2>
          <p className="text-xl text-gray-300">Explore opportunities in your field</p>
        </div>

        <div className="relative">
          {/* Left Arrow */}
          <Button
            onClick={scrollLeft}
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-700/80 hover:bg-gray-600 text-white border border-gray-500 rounded-full w-12 h-12 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          {/* Categories Container */}
          <div
            id="category-container"
            className="flex gap-6 overflow-x-auto scrollbar-hide px-16 py-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((category, index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-gray-600/90 border-2 border-gray-500 hover:border-blue-400 rounded-2xl px-8 py-6 text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl group"
              >
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {category}
                </h3>
                <div className="w-16 h-16 bg-blue-500/20 rounded-full mx-auto mt-4 flex items-center justify-center group-hover:bg-blue-500/30 transition-all duration-300">
                  <span className="text-blue-400 text-2xl font-bold">
                    {category.charAt(0)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <Button
            onClick={scrollRight}
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-700/80 hover:bg-gray-600 text-white border border-gray-500 rounded-full w-12 h-12 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>

        {/* Scroll Indicators */}
        <div className="flex justify-center mt-8 gap-2">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="w-3 h-3 bg-gray-500 rounded-full hover:bg-blue-400 transition-colors cursor-pointer"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCarousel