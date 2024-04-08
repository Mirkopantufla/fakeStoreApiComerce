"use client";
import { isAuthenticated } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function IsAuth(Component) {

    return function IsAuth(props) {
        const router = useRouter();
        const auth = isAuthenticated();

        useEffect(() => {
            if (auth) {
                router.push('/products')
            }
        }, []);

        if (auth) {
            return null;
        }

        return <Component {...props} />;
    };
}