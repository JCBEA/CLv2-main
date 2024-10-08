// src/services/hoc/withAuth.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { decryptToken } from '@/services/authservice'; 
import { supabase } from '@/services/supabaseClient';

// Define the UserDetail interface again here or import it
interface UserDetail {
    id: string;
    first_name: string;
    creative_field: string;
    address: string;
    mobileNo: string;
    bio: string;
    instagram: string;
    facebook: string;
    twitter: string;
    portfolioLink: string;
}

const withAuth = (WrappedComponent: React.ComponentType<{ userDetail: UserDetail | null }>) => {
    return function AuthComponent() {
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [loading, setLoading] = useState(true);
        const [userDetail, setUserDetail] = useState<UserDetail | null>(null); // Use the defined UserDetail type
        const router = useRouter();

        useEffect(() => {
            const token = localStorage.getItem('token'); 

            const checkAuthentication = async () => {
                if (!token) {
                    console.log("No token found. Redirecting to login.");
                    router.push('/signup');
                    return;
                }

                try {
                    const payload = await decryptToken(token); 
                    console.log("Decrypted Payload:", payload);

                    const { data, error } = await supabase
                        .from("userDetails")
                        .select("*")
                        .eq("detailsid", payload.id)
                        .single();

                    if (error || !data) {
                        console.log("User details not found. Redirecting to login.");
                        router.push('/signup');
                        return;
                    }

                    console.log("Fetched user details:", data);
                    setUserDetail(data); 
                    setIsAuthenticated(true); 
                } catch (error) {
                    console.error("Token verification or data fetching failed:", error);
                    router.push('/signup');
                } finally {
                    setLoading(false); 
                }
            };

            checkAuthentication();
        }, [router]);

        if (loading) {
            return <div>Loading...</div>; 
        }

        if (!isAuthenticated) {
            return null;
        }

        return <WrappedComponent userDetail={userDetail} />; // Pass userDetail as a prop
    };
};

export default withAuth;