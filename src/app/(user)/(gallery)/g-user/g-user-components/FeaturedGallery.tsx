// Install Tailwind by running: npm install tailwindcss postcss autoprefixer

// Import Tailwind CSS in your global styles (globals.css)
import Image from "next/image";

export default function Featured() {
  return (
    <div className="bg-white p-8">
      <h2 className="text-2xl font-bold mb-6">FEATURED</h2>

      {/* First Large Image Section */}
      <div className="flex mb-8">
        <Image
          src="/images/indiworks/1.png"
          alt="Flowers 2020"
          width={800}
          height={400}
          className="object-cover w-full h-80"
        />
        <div className="pl-8 flex flex-col justify-center">
          <h3 className="font-bold text-2xl">FLOWERS 2020</h3>
          <p className="text-sm mt-4">
            Her serene expression, framed by delicate petals in shades of soft, muted background,
            contrasts with the rich, radiant colors around her, creating an effect of quiet beauty.
            The intricate details of the flowers symbolize a harmonious symphony, while her gentle
            gaze exudes a sense of innocence and quiet strength.
          </p>
        </div>
      </div>

      {/* Bottom Two Images Section */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Second Image Section */}
        <div className="flex">
          <Image
            src="/images/indiworks/2.png"
            alt="Flowers 2020"
            width={400}
            height={200}
            className="object-cover w-full h-48"
          />
          <div className="pl-4">
            <h3 className="font-bold text-xl">FLOWERS 2020</h3>
            <p className="text-sm mt-2">
              Her serene expression, framed by delicate petals in shades of soft, muted background,
              contrasts with the rich, radiant colors around her, creating an effect of quiet beauty.
              The intricate details of the flowers symbolize a harmonious symphony, while her gentle
              gaze exudes a sense of innocence and quiet strength.
            </p>
          </div>
        </div>

        {/* Third Image Section */}
        <div className="flex">
          <Image
            src="/images/indiworks/3.png"
            alt="Flowers 2020"
            width={400}
            height={200}
            className="object-cover w-full h-48"
          />
          <div className="pl-4">
            <h3 className="font-bold text-xl">FLOWERS 2020</h3>
            <p className="text-sm mt-2">
              Her serene expression, framed by delicate petals in shades of soft, muted background,
              contrasts with the rich, radiant colors around her, creating an effect of quiet beauty.
              The intricate details of the flowers symbolize a harmonious symphony, while her gentle
              gaze exudes a sense of innocence and quiet strength.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button className="bg-black text-white px-6 py-2 rounded">
          ADD MORE
        </button>
      </div>
    </div>
  );
}
