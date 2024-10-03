
import { Signin } from "@/app/user-interface/signin/Signin";
import { Infinite } from "@/components/reusable-component/Infinite";
import { Subscribe } from "@/components/reusable-component/Subscribe";
import { Transcribed } from "@/components/reusable-component/Transcribed";
import React from "react";

export default function Login() {
    return (
        <>
            <Signin />  
            <Transcribed />
            <Infinite />
            <Subscribe />
        </>
    )
}