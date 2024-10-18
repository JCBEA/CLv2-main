export interface UserDetail {
    detailsid:string;
    first_name: string;
    bday?: Date;
    bio: string;
    profile_pic?: string;
    facebook: string;
    instagram: string;
    twitter:string;
    email?: string;
    address: string;
}

export const fetchUserDetails = async (dynamic:string) => {
    const response = await fetch('/api/creative-services', {
        method: 'GET',
        headers: {
            'Dynamic': dynamic, 
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user details');
    }

    const data = await response.json();
    return data.users; // Adjust based on your API response structure
};