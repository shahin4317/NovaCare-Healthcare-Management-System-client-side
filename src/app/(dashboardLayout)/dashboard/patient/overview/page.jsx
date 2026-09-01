"use client";

import { useSearchParams } from "next/navigation";

const OverviewPage = () => {

    const searchParams = useSearchParams();

    const sessionId =
        searchParams.get("session_id");

    console.log("Stripe Session ID:", sessionId);

    return (
        <div>
            Overview
        </div>
    );
};

export default OverviewPage;