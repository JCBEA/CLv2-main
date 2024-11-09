import { motion } from "framer-motion";
import { useState } from "react";
import { Logo } from "./Logo";
import { Icon } from "@iconify/react/dist/iconify.js";

interface InputFieldProps {
  icon: any;
  placeholder: string;
  type?: string;
  name: string;
}

const InputField: React.FC<InputFieldProps> = ({
  icon,
  placeholder,
  type = "text",
  name,
}) => (
  <div className="relative w-full group">
    <input
      className="w-full h-12 bg-transparent border-b-2 border-secondary-2/30 px-12 
                 text-primary-2 placeholder:text-primary-2/50 outline-none transition-all duration-300
                 focus:border-secondary-2 [&:-webkit-autofill]:transition-[background-color_5000s_ease-in-out_0s]"
      type={type}
      name={name}
      placeholder={placeholder}
      autoComplete="off"
      required
    />
    <Icon
      icon={icon}
      className="absolute left-0 top-1/2 -translate-y-1/2 text-primary-2/50 w-6 h-6
                 group-focus-within:text-secondary-2 transition-colors duration-300"
      width="25"
      height="25"
    />
  </div>
);

// New Gender Selection Component
const GenderSelect = () => {
  const [selectedGender, setSelectedGender] = useState("");
  
  return (
    <div className="relative w-full group">
      <select
        className="w-full h-12 bg-transparent border-b-2 border-secondary-2/30 px-12 
                   text-primary-2 outline-none transition-all duration-300
                   focus:border-secondary-2 appearance-none cursor-pointer"
        value={selectedGender}
        onChange={(e) => setSelectedGender(e.target.value)}
        required
      >
        <option value="" disabled>Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="prefer-not-to-say">Prefer not to say</option>
      </select>
      <Icon
        icon="mdi:gender-male-female"
        className="absolute left-0 top-1/2 -translate-y-1/2 text-primary-2/50 w-6 h-6
                   group-focus-within:text-secondary-2 transition-colors duration-300"
        width="25"
        height="25"
      />
      <Icon
        icon="mdi:chevron-down"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-2/50 w-4 h-4
                   pointer-events-none transition-colors duration-300"
        width="16"
        height="16"
      />
    </div>
  );
};

export const RegisterModal = ({
  setShowPofconModal,
}: {
  setShowPofconModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = () => {
    setIsExiting(true);
  };

  const handleAnimationComplete = () => {
    if (isExiting) {
      setShowPofconModal(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.3 }}
      onClick={handleClose}
      onAnimationComplete={handleAnimationComplete}
    >
      <motion.div
        className="relative w-full max-w-4xl h-fit bg-secondary-1 rounded-2xl overflow-hidden shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative circles */}
        <div className="absolute -left-32 -top-32 w-64 h-64 bg-primary-2/20 rounded-full" />
        <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-primary-2/30 rounded-full" />

        <div className="relative grid md:grid-cols-2 gap-8 md:p-10 p-6">
          {/* Left side - Form */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-primary-2">
                Register for POFCON
              </h2>
              <p className="text-primary-2/70">
                Fill out the form below to secure your spot
              </p>
            </div>

            <form className="py-10 flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  icon="icon-park-solid:edit-name"
                  placeholder="First Name"
                  name="firstName"
                />
                <div className="relative w-full">
                  <input
                    className="w-full h-12 bg-transparent border-b-2 border-secondary-2/30 px-4 
                             text-primary-2 placeholder:text-primary-2/50 outline-none transition-all duration-300
                             focus:border-secondary-2 [&:-webkit-autofill]:transition-[background-color_5000s_ease-in-out_0s]"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    autoComplete="off"
                    required
                  />
                </div>
              </div>

              <InputField
                icon="mdi:address-marker"
                placeholder="Mailing Address"
                name="address"
              />

              <InputField
                icon="mdi:email"
                placeholder="Email Address"
                type="email"
                name="email"
              />

              <div className="grid grid-cols-2 gap-4">
                <InputField
                  icon="bxs:contact"
                  placeholder="Contact Number"
                  name="contact"
                />
                <GenderSelect />
              </div>

              <motion.button
                type="submit"
                className="w-full py-3 mt-6 bg-primary-2 text-secondary-1 rounded-lg 
                         font-semibold uppercase tracking-wide transition-all duration-300
                         hover:bg-primary-2/90 focus:ring-2 focus:ring-primary-2/50 focus:ring-offset-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Register Now
              </motion.button>
            </form>
          </div>

          {/* Right side - Logo and decorative content */}
          <div className="hidden h-full md:flex flex-col -mt-10 items-center justify-center relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="w-full h-fit max-w-xs"
            >
              <Logo color="text-primary-2" width="auto" height="auto" />
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold text-primary-2">
                  Join us at POFCON
                </h3>
                <p className="text-primary-2/70">
                  Connect with fellow professionals and expand your network
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-primary-2/70 hover:text-primary-2 transition-colors"
        >
          <Icon icon="mdi:close" width="24" height="24" />
        </button>
      </motion.div>
    </motion.div>
  );
};