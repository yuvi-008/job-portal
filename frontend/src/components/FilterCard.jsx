import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobslice';

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue));
    },[selectedValue]);
    return (
        <div className='w-full bg-gray-700/90 p-6 rounded-2xl border border-gray-600 shadow-xl backdrop-blur-sm'>
            <h1 className='font-bold text-xl text-white mb-6 border-b border-gray-500 pb-3'>Filter Jobs</h1>
            <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-6">
                {
                    fitlerData.map((data, index) => (
                        <div key={index} className="space-y-4">
                            <h2 className='font-semibold text-lg text-blue-400 border-l-4 border-blue-500 pl-3'>{data.fitlerType}</h2>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div key={idx} className='flex items-center space-x-3 pl-3'>
                                            <RadioGroupItem value={item} id={itemId} className="text-blue-500 border-gray-500" />
                                            <Label htmlFor={itemId} className="text-gray-200 cursor-pointer hover:text-blue-400 transition-colors font-medium">
                                                {item}
                                            </Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard