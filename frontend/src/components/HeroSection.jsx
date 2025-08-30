import React from 'react'
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
      dispatch(setSearchedQuery(query));
      navigate("/browse");
  }
  return (
    <div className='text-center py-20 px-4'>
      <div className='max-w-4xl mx-auto'>
        <div className='flex flex-col gap-8'>
          <span className='mx-auto px-6 py-3 rounded-full bg-blue-600/20 text-blue-400 font-medium border border-blue-500/30 backdrop-blur-sm'>Where Jobs Meet Ambitions</span>
          <h1 className='text-5xl md:text-6xl font-bold text-white leading-tight'>
            Smart Search, Easy Apply &<br />
            Get Hired in <span className='text-blue-400 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent'>No Time</span>
          </h1>

          <p className='text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed'>
            Get personalized job recommendations, apply with one click, and boost your chances with real-time hiring insights.
          </p>

          <div className='flex w-full max-w-2xl shadow-2xl border border-gray-600 bg-gray-800/50 backdrop-blur-sm pl-6 rounded-2xl items-center gap-4 mx-auto'>
            <input 
              type="text"
              placeholder='Find Your Dream Job'
              onChange = {(e)=> setQuery(e.target.value)}
              className='outline-none border-none w-full bg-transparent text-white placeholder:text-gray-400 text-lg py-4'
            />
            <Button 
              onClick = {searchJobHandler} 
              className = "rounded-r-2xl bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <Search className = "h-6 w-6 mr-2"/>
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
