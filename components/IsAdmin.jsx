"use client";
import { isAdministrator } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function IsAdmin(Component) {

    return function IsAdmin(props) {
        const router = useRouter();
        const admin = isAdministrator();

        useEffect(() => {
            if (!admin) {
                router.push('/products')
            }
        }, []);

        if (!admin) {
            return null;
        }

        return <Component {...props} />;
    };
}