// ProfileModal.tsx

"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { UserDetail } from "./UserProfile";

interface ProfileModalProps {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    userDetails: UserDetail; // Add userDetails prop
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ 
    openModal, 
    setOpenModal,
    userDetails, // Accept userDetails
}) => {
    const [formData, setFormData] = useState<UserDetail>(userDetails); // Set initial state with userDetails

    // Update form data when userDetails changes
    useEffect(() => {
        setFormData(userDetails);
    }, [userDetails]);

    const closeModal = () => {
        setOpenModal(false); // Close the modal
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        // Handle saving logic here
        console.log("User details saved:", formData);
        // Close modal after saving
        setOpenModal(false);
    };

    return (
        <div className={`modal ${openModal ? "open" : ""}`}>
            <div className="modal-content">
                <Icon className="cursor-pointer" onClick={closeModal} icon="line-md:menu-to-close-alt-transition" width="25" height="25" />
                <h1>Edit Profile</h1>
                {/* Input fields for editing user details */}
                <div>
                    <small>Location</small>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <small>Contact Number</small>
                    <input
                        type="text"
                        name="mobileNo"
                        value={formData.mobileNo}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <small>About me</small>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <small>Creative Field</small>
                    <input
                        type="text"
                        name="creative_field"
                        value={formData.creative_field}
                        onChange={handleInputChange}
                    />
                </div>
                <button onClick={handleSave}>Save Changes</button>
            </div>
        </div>
    );
};
