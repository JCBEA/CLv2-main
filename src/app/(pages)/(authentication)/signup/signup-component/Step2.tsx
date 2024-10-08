import { Input } from "./Signup";


export const Step2 = ({ formData, handleChange, nextStep, prevStep }: any) => {
  return (
    <div className="w-full h-full flex flex-col gap-6">
      <h2 className="font-bold text-xl">Step 2: Personal Details</h2>

      {/* Creative Field Input */}
      <Input
        name="creativeField"
        value={formData.creativeField}
        onChange={handleChange}
        placeholder="Creative Field"
        icon="mdi:palette" // Use an appropriate icon for the creative field
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
      <textarea 
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        placeholder="Bio"
        className="border border-gray-300 rounded-md p-2" // Apply styles to the textarea
      ></textarea>
    </div>
  );
};
