import Link from "next/link";
import { HouseFill, Stethoscope } from "@gravity-ui/icons";

const NotFound = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#f8fbfc] px-4 py-16">
            <div className="mx-auto w-full max-w-2xl text-center">

                {/* Illustration */}
                <div className="relative mx-auto mb-8 flex h-56 w-56 items-center justify-center">

                    {/* Background Circle */}
                    <div className="absolute inset-0 rounded-full bg-[#eef5f8]" />

                    {/* Medical Illustration */}
                    <div className="relative flex h-32 w-32 items-center justify-center rounded-3xl border border-[#dfe8ec] bg-white shadow-lg">
                        <Stethoscope className="h-16 w-16 text-[#064b78]" />

                        {/* Small Cross */}
                        <div className="absolute -right-4 -top-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#064b78] text-white shadow-md">
                            <span className="text-2xl font-bold">+</span>
                        </div>
                    </div>

                    {/* Decorative dots */}
                    <span className="absolute left-5 top-10 h-3 w-3 rounded-full bg-[#064b78]/20" />
                    <span className="absolute bottom-8 right-8 h-4 w-4 rounded-full bg-[#064b78]/15" />
                    <span className="absolute bottom-14 left-12 h-2 w-2 rounded-full bg-[#12344d]/20" />
                </div>

                {/* Error Code */}
                <p className="text-7xl font-extrabold tracking-tight text-[#064b78] sm:text-8xl">
                    404
                </p>

                {/* Error Message */}
                <h1 className="mt-4 text-2xl font-bold text-[#12344d] sm:text-3xl">
                    Page Not Found
                </h1>

                <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
                    Sorry, the page you are looking for doesn't exist or
                    may have been moved. Let's get you back to NovaCare.
                </p>

                {/* Back Home Button */}
                <div className="mt-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-xl bg-[#064b78] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#053d61] hover:shadow-md active:scale-95"
                    >
                        <HouseFill className="h-4 w-4" />
                        Back Home
                    </Link>
                </div>

                {/* Brand */}
                <p className="mt-8 text-xs font-medium text-gray-400">
                    NovaCare Healthcare Platform
                </p>
            </div>
        </main>
    );
};

export default NotFound;