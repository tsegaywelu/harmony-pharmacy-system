import { Input } from 'antd';
import React from 'react';
import { FaTimes } from 'react-icons/fa';

function Filters({
    showFilters,
    setShowFilters,
    filters,
    setsFilters,
}) {
    const categories = [
        {
            name: "Electronics",
            value: "electronics"
        },
        {
            name: "Home",
            value: "home"
        },
        {
            name: "Fashion",
            value: "fashion"
        },
        {
            name: "Sports",
            value: "sports"
        }
    ];

    const ages = [
        {
            name: "0-2 years old",
            value: "0-2",
        },
        {
            name: "3-5 years old",
            value: "3-5",
        },
        {
            name: "6-8 years old",
            value: "6-8",
        },
        {
            name: "9-12 years old",
            value: "9-12",
        },
        {
            name: "13+ years old",
            value: "13-20",
        }
    ];

    return (
        <div className='w-72 flex flex-col'>
            <div className='flex justify-between'>
                <h1 className='text-orange-900 text-xl'>Filters</h1>
                <button>
                    <FaTimes className='r1-close line text-xl cursor-pointer'
                        onClick={() => setShowFilters(!showFilters)} />
                </button>
            </div>
            <div className='flex flex-col gap mt-5'>
                <h1 className='text-gray-600'>Categories</h1>
                <div className='flex flex-col'>
                    {categories.map((category) => (
                        <div className='flex items-center gap-2' key={category.value}>
                            <Input
                                type="checkbox"
                                name="Category"
                                className="max-width"
                                checked={filters.category.includes(category.value)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setsFilters({
                                            ...filters,
                                            category: [...filters.category, category.value],
                                        });
                                    } else {
                                        setsFilters({
                                            ...filters,
                                            category: filters.category.filter(
                                                (item) => item !== category.value
                                            ),
                                        });
                                    }
                                }}
                            />
                            <label htmlFor='category'>{category.name}</label>
                        </div>
                    ))}
                </div>
            </div>
            <h1 className='text-gray-600 mt-5'>Ages</h1>
            <div className='flex flex-col'>
                {ages.map((age) => (
                    <div className='flex gap-2 items-center' key={age.value}>
                        <Input
                            type='checkbox'
                            name='age'
                            className='max-width'
                            checked={filters.age.includes(age.value)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setsFilters({
                                        ...filters,
                                        age: [...filters.age, age.value]
                                    });
                                } else {
                                    setsFilters({
                                        ...filters,
                                        age: filters.age.filter(
                                            (item) => item !== age.value
                                        ),
                                    });
                                }
                            }}
                        />
                        <label htmlFor='age'>{age.name}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Filters;