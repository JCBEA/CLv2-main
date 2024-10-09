import { Icon } from "@iconify/react/dist/iconify.js";
import { Input, Select, TextArea } from "./Signup";

export const Step2 = ({ formData, handleChange, nextStep, prevStep }: any) => {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <h2 className="font-bold text-xl">Step 2: Personal Details</h2>

      {/* Creative Field Dropdown */}
      <Select
        name="creativeField"
        value={formData.creativeField}
        onChange={handleChange}
        placeholder="Select your creative field"
        icon="mdi:palette"
        options={[
          { value: "Photographer", label: "Photographer" },
          { value: "Animator", label: "Animator" },
          { value: "Fashion designer", label: "Fashion designer" },
          { value: "Illustrator", label: "Illustrator" },
          { value: "Interior Designer", label: "Interior Designer" },
          { value: "Web Designer", label: "Web Designer" },
          { value: "Art Teacher", label: "Art Teacher" },
          { value: "Curator", label: "Curator" },
          { value: "Industrial designer", label: "Industrial designer" },
        ]}
      />


      {/* Address Input */}
      <Input
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Address"
        icon="mdi:home-outline"
      />

      {/* Mobile Number Input */}
      <Input
        name="mobileNo"
        value={formData.mobileNo}
        onChange={handleChange}
        placeholder="Mobile Number"
        type="tel"
        icon="mdi:cellphone"
      />

      {/* Bio Textarea */}
      <TextArea
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        placeholder="Bio"
        icon="mdi:note-outline"
      ></TextArea>
    </div>
  );
};
