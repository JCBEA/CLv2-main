// src/app/user/profile/page.tsx
"use client"; // Ensure this is the very first line

import { Infinite } from "@/components/reusable-component/Infinite";
import { Subscribe } from "@/components/reusable-component/Subscribe";
import { UserProfile } from "./profile/UserProfile";
import withAuth from "@/services/hoc/withAuth";

function Profile() {
    return (
        <div className="min-h-dvh w-full">
            <UserProfile />
            <Infinite />
            <Subscribe />
        </div>
    );
}


export default withAuth(Profile);
