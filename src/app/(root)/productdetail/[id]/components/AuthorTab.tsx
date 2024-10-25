import NavCard from '@/components/cards/NavCard';
import Icon from '@/components/Icon';
import Button from '@/components/ui/Button';
import useFetch from '@/hooks/useFetch';
import { TechTemplate } from '@/types/type';
import Image from 'next/image';
import React, { Fragment, useEffect } from 'react';

interface UserDetailProps {
  userDetail: {
    name: string;
  };
}

interface ApiResponse {
  data: TechTemplate[];
}

const AuthorTab: React.FC<UserDetailProps> = ({ userDetail }) => {
  const { data, fetchData } = useFetch<ApiResponse>();

  const getUserTemplates = async () => {
    try {
      await fetchData(`/templates-by-userid`);
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  useEffect(() => {
    getUserTemplates();
  }, []);

  return (
    <div className="mt-10 lg:mt-20">
      <div className="flex justify-between flex-col md:flex-row items-center md:items-end">
        <div className="flex items-start md:items-end gap-x-5 w-full md:w-auto">
          <div className="p-[1px] border-2 border-divider-100 inline-block">
            <Image
              className="max-w-11 max-h-11 tab:max-w-full tab:max-h-full"
              src="/icons/mdbbiglogo.svg"
              width={94}
              height={94}
              alt="logo"
            />
          </div>
          <div>
            <h3 className="text-lg tab:text-xl text-subheading leading-7 font-bold">{userDetail?.name}</h3>
            <p className="pt-[6px] text-sm md:text-base pb-[14px] text-subparagraph font-semibold">
              Id gravida magna sed ultrices facilisi nullam cursus pretium et.
            </p>
            <div className="pr-[10px] border-r border-divider-100 inline-block">
              <p className="font-semibold leading-6 inline-block">4.9</p>
              <Icon className="w-6 h-6 inline-block" name="star" />
            </div>
          </div>
        </div>
        <Button variant="primary" className="py-2 px-[18px] md:py-3 md:px-[30px] mt-[10px] md:mt-0">
          view profile
        </Button>
      </div>

      <div className="md:border-y md:border-divider-100 my-5 md:py-10 md:my-10">
        <h3 className="text-xl font-bold leading-7">About Author</h3>
        <p className="pt-5 leading-6 text-subparagraph text-sm tab:text-base">
          Eget massa, urna, nisi, pellentesque sit blandit donec ut non. Ut enim velit nec lectus suscipit sed.
          Turpis viverra et tortor amet, suspendisse odio risus dolor nunc. Eget amet, eu augue lectus purus
          aliquam at semper libero.
        </p>
      </div>

      <div>
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold leading-7">36 Projects</h3>
          <Button variant="solidicon" icon iconClass="w-5 h-5 py-1 fill-primary-100" link="/product">
            view all products
          </Button>
        </div>
        <div className="max-w-[1560px] overflow-scroll hiddenscroll">
          <div className="flex items-center justify-between gap-x-[10px] md:gap-x-[30px] mt-5">
            {data && data?.length > 0 && data?.map((item) => (
              <Fragment key={item.id}>
                <NavCard
                  icon={item.icon}
                  image={item.image}
                  imageclass="max-w-full"
                  title={item.title}
                />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorTab;
