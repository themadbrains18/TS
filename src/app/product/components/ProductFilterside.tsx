"use client"

import Icon from '@/components/Icon'
import Accordion from '@/components/ui/Accordion';
import CheckboxFilter from '@/components/ui/ProductFilterchekbox';
import React, { useState } from 'react'

const ProductFilterside = () => {

    const Discount = [
        {
            "id": 1,
            "discount": "80% Above"
        },
        {
            "id": 2,
            "discount": "40-60% Below"
        },
        {
            "id": 3,
            "discount": "20% Below"
        },
        {
            "id": 4,
            "discount": "20-40% Below"
        },
        {
            "id": 5,
            "discount": "60-80% Below"
        }
    ]

    const [items, setItems] = useState<string[]>([]);
    const removeItem = (index: number) => {
        setItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems.splice(index, 1);
            return updatedItems;
        });
    };

    return (
        <>
            <div className='max-w-[357px] w-full py-[30px]  px-[20px]  bg-white' >
                <div className='flex justify-between items-center border-b pb-5 mb-5 ' >
                    <div className='flex gap-[5px] items-center '  >
                        <Icon name='filter' />
                        <h3 className='lg:text-[18px] leading-[28px] font-normal text-subparagraph ' >Filters</h3>
                    </div>
                    |
                </div>


                <Accordion className='border-none' title='Price Range' >
                    <div className='border-b pb-5 mb-5'>
                        {Discount.map((item, index) => {
                            return (
                                <div key={Date.now() + index}>
                                    {/* Checkbox filter for discount options */}
                                    <CheckboxFilter
                                        labelclass="gap-[10px]"
                                        value={item?.discount}
                                        id={item?.discount}
                                        setItems={setItems}
                                        items={items}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </Accordion>
            </div>
        </>
    )
}

export default ProductFilterside