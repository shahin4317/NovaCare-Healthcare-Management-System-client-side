import {
    HeartPulse,
    GearBranches,
    Skull,
    Person,
    Sparkles,
} from "@gravity-ui/icons";
import Link from "next/link";

const specializations = [
    {
        name: "Cardiology",
        description: "Heart and cardiovascular care",
        icon: HeartPulse,
    },
    {
        name: "Neurology",
        description: "Brain and nervous system care",
        icon: GearBranches,
    },
    {
        name: "Orthopedics",
        description: "Bones, joints and muscles care",
        icon: Skull,
    },
    {
        name: "Pediatrics",
        description: "Healthcare for children",
        icon: Person,
    },
    {
        name: "Dermatology",
        description: "Skin, hair and nail care",
        icon: Sparkles,
    },
];

const MedicalSpecializations = () => {
    return (
        <section className="bg-white py-16 sm:py-20">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-10 text-center">
                    <p className="text-sm font-semibold uppercase tracking-wider text-[#064b78]">
                        Medical Departments
                    </p>

                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#12344d] sm:text-4xl">
                        Medical Specializations
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
                        Find specialized healthcare professionals across
                        different medical fields.
                    </p>
                </div>


                {/* Specialization Cards */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
                    {specializations.map((specialization) => {
                        const Icon = specialization.icon;

                        return (
                            <Link
                                key={specialization.name}
                                href={`/find-doctor?specialization=${encodeURIComponent(
                                    specialization.name
                                )}`}
                                className="group"
                            >
                                <article className="h-full rounded-2xl border border-[#dfe8ec] bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#064b78]/20 hover:shadow-lg">

                                    {/* Icon */}
                                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef5f8] transition-colors duration-300 group-hover:bg-[#064b78]">
                                        <Icon className="h-7 w-7 text-[#064b78] transition-colors duration-300 group-hover:text-white" />
                                    </div>

                                    {/* Name */}
                                    <h3 className="mt-5 text-lg font-bold text-[#12344d]">
                                        {specialization.name}
                                    </h3>

                                    {/* Description */}
                                    <p className="mt-2 text-sm leading-5 text-gray-500">
                                        {specialization.description}
                                    </p>

                                    {/* Bottom */}
                                    <div className="mt-5 text-sm font-semibold text-[#064b78] transition-all duration-300 group-hover:tracking-wide">
                                        Find Doctors →
                                    </div>
                                </article>
                            </Link>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default MedicalSpecializations;