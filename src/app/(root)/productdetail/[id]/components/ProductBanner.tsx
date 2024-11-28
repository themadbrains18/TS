"use client"

import Image from 'next/image'
import React, { useRef, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import Button from '@/components/ui/Button';
import Icon from '@/components/Icon';
import ProductDetailcheckbox from './ProductDetailcheckbox';
import Link from 'next/link';
import DownloadTemplete from '@/components/popups/DownloadTemplete';
import { ProductDetailProps, TechTemplate } from '@/types/type';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const ProductBanner: React.FC<ProductDetailProps> = ({ template }) => {


    const [showFullDescription, setShowFullDescription] = useState(true);
    const [showPreviews, setShowPreviews] = useState<boolean>(false)
    const { data: session, status } = useSession();



    const maxLength = 300;
    const description = template?.description || '';
    const isLongDescription = description.length > maxLength;

    /**
     * swiper images
     */
    const images = template?.sliderImages


    /**
     * State to manage the currently active image ID
     */
    const [activeImageId, setActiveImageId] = useState(images?.[0]?.id);
    const activeImage = images?.find(image => image?.id === activeImageId)?.imageUrl;

    /**
     * Reference to Swiper instance for custom navigation
     */
    const swiperRef = useRef<SwiperType | null>(null);

    /**
     * pop up handler
     */

    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const router = useRouter()
    const openPopup = async () => {
        if (!session) {
            router.push('/login')
        }
        else if (template?.isPaid == false || template?.price <= 0) {
            setIsPopupOpen(true);
            setIsFirstPopupOpen(true)
        }
    }

    const [isFirstPopupOpen, setIsFirstPopupOpen] = useState<boolean>(true);

    type SoftwareType = {
        image: string;
        label: string;
    };

    const softwareImages: Record<string, SoftwareType> = {
        "Figma": { image: '/icons/figma.svg', label: "Figma Design File" },
        "Adobe XD": { image: '/icons/adobexd.svg', label: "Adobe XD Design File" },
        "PhotoShop": { image: '/icons/photoshop.svg', label: "Photoshop Design File" },
        "Sketch": { image: '/icons/sketch.svg', label: "Sketch Design File" },
        "NextJs": { image: '/icons/nextjs.svg', label: "NextJs Design File" },
        "Tailwind Css": { image: '/icons/tailwind.svg', label: "Tailwind Design File" },
        "ReactJs": { image: '/icons/reactjs.svg', label: "ReactJs Design File" },
    };

    const matchedSoftware = softwareImages[template?.softwareType?.name];

    return (
        <>
            <section className='pb-10'>
                <div className="container">
                    <div>
                        <div className='flex items-center gap-x-2 pt-2.5 md:pt-5 border-t  mb-5'>
                            <Image src={`/icons/mdb.svg`} width={20} height={20} alt='uploadericon' />
                            <p className='text-subparagraph text-sx leading-5 capitalize text-nowrap text-ellipsis overflow-hidden'>by <span className='text-[12px] font-semibold leading-5 text-subheading  capitalize'>{template?.user?.name}</span> <span className='text-primary-100' >|</span> <span className='text-xs text-subheading font-semibold leading-5 capitalize'>{`UI templates`}</span></p>
                        </div>

                        {/* Main Grid Section */}
                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[57.5%,40.5%] lg:gap-x-[30px] animate-fade-up">
                            <div>
                                <div className="lg:max-w-[874px] w-full relative z-10 bg-[#FFFFFF] select-none">

                                    <div className="p-[10px]  md:p-5 h-full group overflow-hidden border border-divider-100">
                                        <div className="overflow-hidden relative h-full">
                                            <div className='absolute z-[1] top-0 left-0 right-0 bottom-0 group-hover:bg-[#28204699]  duration-[0.5s] cursor-pointer'>
                                                <div className='w-full h-full flex justify-center items-center overflow-hidden  '>
                                                    <Link href={`/preview/${template?.id}`} className='text-white text-[18px] font-bold leading-7 opacity-0 group-hover:opacity-100'>Preview</Link>
                                                </div>
                                            </div>
                                            <Image
                                                src={`${activeImage || "/images/product1.png"}`}
                                                width={850}
                                                height={500}
                                                alt="Selected"
                                                className="overflow-hidden group-hover:scale-[1.1] duration-[0.5s]  w-full h-full lg:object-cover rounded-lg shadow-md"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 lg:gap-7 md:p-5 md:border pt-2.5  border-divider-100">
                                        {images?.length > 5 && (
                                            <div className='rotate-[180deg] cursor-pointer' onClick={() => swiperRef.current?.slidePrev()}>
                                                <Icon name='rightarrow' />
                                            </div>
                                        )}
                                        <Swiper
                                            navigation={false}
                                            modules={[Navigation]}
                                            slidesPerView={6}
                                            spaceBetween={10}
                                            loop={true}
                                            breakpoints={{
                                                315: {
                                                    slidesPerView: 3,
                                                },
                                                500: {
                                                    slidesPerView: 5,
                                                },
                                                768: {
                                                    slidesPerView: 7,
                                                },
                                            }}
                                            onBeforeInit={(swiper) => {
                                                swiperRef.current = swiper;
                                            }}
                                            className="mySwiper w-full"
                                        >
                                            {images?.map(({ id, imageUrl }) => (
                                                <SwiperSlide className='w-full' key={id}>
                                                    <div
                                                        onClick={() => setActiveImageId(id)} // Set active image by ID
                                                        className={`cursor-pointer min-w-[50px] w-full border-2 overflow-hidden p-[5px] h-[88px] ${activeImageId === id ? 'border-primary-900 border-[0.5px] md:border-[2px]' : 'border-transparent'} animate-zoom`}
                                                    >
                                                        <Image className="w-full object-contain h-[76px]" src={`${imageUrl}`} height={76} width={120} alt={`Thumbnail ${id}`} />
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                        {/* Custom Next Button */}
                                        {images?.length > 5 && (
                                            <div className='cursor-pointer' onClick={() => swiperRef.current?.slideNext()}>
                                                <Icon name='rightarrow' />
                                            </div>
                                        )}
                                    </div>

                                </div>
                            </div>
                            <div>
                                <h2 className='pb-2.5 md:pb-5 text-[18px] md:text-[28px] leading-8 font-bold text-darkblue max-w-[616px] line-clamp-2  capitalize'>
                                    {template?.title}
                                </h2>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: showFullDescription || !isLongDescription ? template?.description.slice(0, maxLength) : ""
                                    }}
                                    className=' text-[14px] md:text-[16px] font-normal leading-6 text-subparagraph'
                                />
                                <Link href="#description" className=" text-[14px] font-normal leading-5 text-primary-100">
                                    Read More
                                </Link>
                                <div className=' py-5 md:py-10 flex gap-2.5 md:gap-[18px] flex-col' >
                                    {matchedSoftware && (
                                        <ProductDetailcheckbox
                                            image={matchedSoftware?.image}
                                            label={matchedSoftware?.label}
                                            detailText="View Detail"
                                        />
                                    )}
                                </div>
                                <div className='p-2.5 md:p-5 flex items-center bg-divider-100 justify-between ' >
                                    <Button className='py-[5px] px-2.5' variant='primary' >{template?.isPaid && template?.price > 0 ? `$${template?.price}` : 'FREE'}</Button>
                                    <div className='flex gap-5 items-center' >
                                        <h3 className='text-[14px] font-normal leading-5 text-subparagraph' >Total Price</h3>
                                        <span className='text-[20px] leading-7 text-subparagraph font-bold' >{(template?.isPaid && template?.price > 0) ? '$' + template?.price : "$0.00"}</span>
                                    </div>
                                </div>
                                <Button onClick={openPopup} className='w-full mb-2.5 mt-5  md:mt-[30px] md:mb-5 justify-center py-2 md:py-[13px]' variant='primary' > Download </Button>

                                <Button link={`/preview/${template?.id}`} className='w-full justify-center' variant='liquid' >Preview</Button>

                                {
                                    isPopupOpen &&
                                    <DownloadTemplete poster={template.previewImages[0]?.imageUrl} tittle={template.title} isFirstPopupOpen={isFirstPopupOpen} setIsFirstPopupOpen={setIsFirstPopupOpen} id={template?.id} url={template?.sourceFiles} />
                                }
                            </div>
                        </div>
                    </div>
                </div >
            </section >

        </>
    )
}

export default ProductBanner
