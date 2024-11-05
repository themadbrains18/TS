import Image from 'next/image';
import React, { FC, useState } from 'react';
import downloadtemp from "@/../public/images/download.png";
import Icon from '../Icon';
import Button from '../ui/Button';
import { downloadcard } from '@/types/type';
import { cn } from '@/libs/utils';

const DownloadCard: FC<downloadcard> = ({
    date,
    image,
    tittle,
    bgClass,
    bgParentClass,
    dateClass,
    downloadClass,
    parentClass,
    tittleClass,
    premium,
    url
}) => {
    const [imgSrc, setImgSrc] = useState(image || downloadtemp); // Set initial image as `image` prop or fallback

    return (
        <section className={cn`p-[10px] md:p-5 bg-white ${parentClass}`}>
            <div className={cn`p-[10px] md:p-4 bg-primary-300 cursor-pointer ${bgParentClass}`}>
                <Image
                    className={cn` min-h-[234px] max-h-[234px] tab:max-h-full lg:max-h-[342px] lg:min-h-[342px]  w-full ${bgClass}`}
                    src={imgSrc}
                    width={415}
                    height={342}
                    alt='download template'
                    onError={() => setImgSrc(downloadtemp)} // Fallback to default image
                />
            </div>
            <div className='p-[10px] md:px-5  md:py-[15px] flex justify-between items-center'>
                <div>
                    <h3 className={cn`text-subheading text-base md:text-xl leading-6 md:leading-7 font-semibold capitalize max-w-[300px] truncate ${tittleClass}`}>{tittle}</h3>
                    <p className={cn`text-subheading text-xs leading-5 font-normal ${dateClass}`}>{date}</p>
                </div>
                <div className='flex items-center gap-x-[10px] max-w-[108px] w-full justify-end'>
  <div className='border border-divider-200 bg-primary-200'>
    {premium && (
        <Icon className='w-6 h-6 m-1 cursor-pointer' name='premium' />
    )}
  </div>
      <a href={url} download>
  <Button
  variant='primary'
  className={cn`p-2 max-w-[66px] w-full flex justify-center ${downloadClass}`}
  downloadicon={true}
  iconClass='w-5 h-5'
  />
  </a>
</div>

            </div>
        </section>
    );
};

export default DownloadCard;
