import { Input } from "./Signup";


export const Step1 = ({ formData, handleChange, nextStep }: any) => {
  return (
    <div className="w-full h-full flex flex-col gap-6">
      <h2 className="font-bold text-xl">Step 1: Basic Information</h2>

      {/* Full Name Input */}
      <Input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Full Name"
        icon="mdi:account-outline"
      />
      {/* Username Input */}
      <Input
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        icon="mdi:user-outline"
      />

      {/* Email Input */}
      <Input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email address"
        icon="material-symbols:mail-outline"
        type="email"
      />

      {/* Password Input */}
      <Input
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        icon="mynaui:key"
        type="password"
      />

      {/* Next Button */}
      <button
        type="button"
        onClick={nextStep}
        className="bg-secondary-2 text-white px-4 py-2 rounded mt-4"
      >
        Next
      </button>
    </div>
  );
};
