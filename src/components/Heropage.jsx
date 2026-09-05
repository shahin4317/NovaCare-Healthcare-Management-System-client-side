"use client";

import Image from "next/image";
import doctor from "@/image/doctor.png";
import {
    Cpu,
    HandOk,
    Heart,
    HeartPulse,
} from "@gravity-ui/icons";
import Link from "next/link";

const Heropage = () => {
    return (
        <section className="relative mx-auto min-h-[650px] w-full overflow-hidden bg-[#8eb5c6]">

            {/* Main Content */}
            <div className="relative z-10 px-5 pt-16 sm:px-8 sm:pt-20 lg:max-w-[750px] lg:px-12 lg:pt-[95px] xl:px-16">

                <h1 className="text-[40px] font-semibold leading-[1.08] tracking-[-1.5px] text-white sm:text-[50px] lg:text-[60px] lg:tracking-[-2px]">
                    Smarter intelligence for
                    <br />
                    better patient care
                </h1>

                <p className="mt-5 max-w-[600px] text-[16px] leading-[1.5] text-white sm:text-[18px] lg:text-[19px]">
                    Streamlined clinical workflows boost efficiency, cut wait times,
                    and enable faster, patient-centered care experiences
                </p>
                <Link href={'/find-doctor'}>
                    <button className="mt-7 rounded-md bg-[#064b78] px-6 py-3.5 text-[14px] font-semibold text-white transition hover:bg-[#053d61] sm:px-7 sm:py-4 sm:text-[15px]">
                        Explore more
                    </button>
                </Link>




                {/* Feature Cards */}
                <div className="mt-20 hidden p-4 lg:block">

                    {/* First Row */}
                    <div className="flex gap-5">

                        {/* Accurate diagnosis */}
                        <div className="flex h-[58px] w-[285px] items-center gap-2.5 rounded-md bg-white px-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eef5f8]">
                                <HandOk className="h-4 w-4 text-[#064b78]" />
                            </div>

                            <p className="text-[19px] font-medium text-[#064b78]">
                                Accurate diagnosis
                            </p>
                        </div>

                        {/* Modern medical care */}
                        <div className="flex h-[58px] w-[305px] items-center gap-2.5 rounded-md bg-white px-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eef5f8]">
                                <HeartPulse className="h-4 w-4 text-[#064b78]" />
                            </div>

                            <p className="text-[19px] font-medium text-[#064b78]">
                                Modern medical care
                            </p>
                        </div>

                    </div>


                    {/* Second Row */}
                    <div className="mt-5 flex gap-5">

                        {/* Expert care */}
                        <div className="flex h-[58px] w-[208px] items-center gap-2.5 rounded-md bg-white px-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eef5f8]">
                                <Heart className="h-4 w-4 text-[#064b78]" />
                            </div>

                            <p className="text-[19px] font-medium text-[#064b78]">
                                Expert care
                            </p>
                        </div>

                        {/* Advanced technology */}
                        <div className="flex h-[58px] w-[315px] items-center gap-2.5 rounded-md bg-white px-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#eef5f8]">
                                <Cpu className="h-4 w-4 text-[#064b78]" />
                            </div>

                            <p className="text-[19px] font-medium text-[#064b78]">
                                Advanced technology
                            </p>
                        </div>

                    </div>

                </div>

            </div>


            {/* Doctor Image */}
            <div
                className="
          absolute
          bottom-0
          right-[-80px]
          h-[430px]
          w-[500px]

          sm:right-[-60px]
          sm:h-[500px]
          sm:w-[570px]

          lg:right-[-20px]
          lg:h-[650px]
          lg:w-[700px]

          xl:right-[20px]
          xl:h-[680px]
          xl:w-[760px]
        "
            >

                <Image
                    src={doctor}
                    alt="Doctor"
                    fill
                    priority
                    className="object-contain object-bottom"
                />

            </div>

            {/* Bottom Statistics */}
            <div
                className="
          absolute
          bottom-[15px]
          right-[10px]
          z-20
          flex
          gap-2

          sm:bottom-[20px]
          sm:right-[20px]
          sm:gap-3

          lg:bottom-[40px]
          lg:right-[20px]
        "
            >

                {/* Card 1 */}
                <div className="h-[100px] w-[135px] rounded-lg bg-white/85 p-4 backdrop-blur-sm sm:h-[110px] sm:w-[150px] sm:p-4 lg:h-[125px] lg:w-[170px] lg:p-5">

                    <p className="text-[27px] font-medium leading-none text-[#064b78] sm:text-[30px] lg:text-[34px]">
                        18%
                    </p>

                    <p className="mt-2 text-[12px] leading-4 text-gray-600 sm:mt-3 sm:text-[13px] sm:leading-5 lg:text-[14px]">
                        Reduced patient
                        <br />
                        wait times
                    </p>

                </div>


                {/* Card 2 */}
                <div className="h-[100px] w-[135px] rounded-lg bg-white/85 p-4 backdrop-blur-sm sm:h-[110px] sm:w-[150px] sm:p-4 lg:h-[125px] lg:w-[170px] lg:p-5">

                    <p className="text-[27px] font-medium leading-none text-[#064b78] sm:text-[30px] lg:text-[34px]">
                        20%
                    </p>

                    <p className="mt-2 text-[12px] leading-4 text-gray-600 sm:mt-3 sm:text-[13px] sm:leading-5 lg:text-[14px]">
                        Improved care
                        <br />
                        efficiency
                    </p>

                </div>

            </div>

        </section>
    );
};

export default Heropage;