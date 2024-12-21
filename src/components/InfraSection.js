import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const infraArray = [
  {
    title: "Powder Packing Machine",
    description:
      "We offer the highest performing designs of filling, wrapping and powder packing machines and make the one stop solution for the companies looking for high-quality packaging machines at affordable prices.",
    imgSrc: "infa1.jpg",
  },
  {
    title: "Vertical Form Fill & Seal Machine",
    description:
      "Vertical Form Fill Seal Machines (VFFS) are used to pack products in plastic bags made of PE or PP laminated film. As the machines are used to pack products in plastic bags these need to be designed with due attention and high safety measures.",
    imgSrc: "infa2.jpeg",
  },
  {
    title: "Weigh Filler Machine",
    description:
      "For the last 23 years, Akash Pack has been manufacturing and supplying a wide range of packaging machines. Among its different machines, the weigh filler machine is one of the highly demanded products due to its unique performance.",
    imgSrc: "infa3.jpg",
  },
  {
    title: "Automatic Auger Filler Machine",
    description:
      "Looking for high-quality and technologically advanced auger filling machines at the best prices? Akash Pack Tech Ltd. is the right place for you. Having more than two decades of experience in packaging machines, we are known as the top manufacturer and supplier in India.",
    imgSrc: "infa4.jpg",
  },
  {
    title: "Automatic Pouch Packing Machine",
    description:
      "Akash Pack Tech Ltd. is a reputed pouch filling and other packaging machines manufacturer and supplier. Established in 1997, today, the company is known for its unmatched multi track pouch packaging machines solution and industry leading prices.",
    imgSrc: "infa5.webp",
  },
  {
    title: "Sachet Packing Machine",
    description:
      "Akash Pack is a well-known manufacturer and supplier of packaging machines. We deal in a wide range of packaging machines including sachet packing machines. It is perfect for pharmaceutical, nutritional supplement packaging and food products packaging.",
    imgSrc: "infa6.jpeg",
  },
  {
    title: "Flow Wrap Machine",
    description:
      "Akash Pack Tech proudly calls itself the leading manufacturer and supplier of flow wrap machines in India. Flow wrap machines are required to make a horizontal bag from a single roll of film such as biscuit packets.",
    imgSrc: "infa7.jpg",
  },
  {
    title: "Liquid Packing Machine",
    description:
      "Liquid pouch filling machines are widely used to fill an accurate amount of liquid in pouches such as liquid hand wash, refined oil, shampoo etc. Only high-quality and technologically advanced machines can ensure accurate filling with minimum errors and spillage.",
    imgSrc: "infa8.jpeg",
  },
];

export default function InfraSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { title, description, imgSrc } = infraArray[currentIndex];

  function increaseIndex() {
    if (currentIndex < infraArray.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  }

  function decreaseIndex() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(infraArray.length - 1);
    }
  }

  return (
    <section id="infrastructure" class="pt-20 md:pt-[120px]">
      <div class="container flex flex-col md:flex-row justify-between w-full">
        <div class="flex">
          <div class="w-full ">
            <AnimatePresence>
              <motion.div
                key={currentIndex}
                initial={{
                  x: -10,
                  opacity: 0,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                }}
                transition={{
                  duration: 1,
                }}
                class="
                ud-single-testimonial
                p-8
                bg-white
                mb-12
                shadow-testimonial
                wow
                fadeInUp
                h-96
                w-96
                md:h-[600px]
                md:w-[600px]
                rounded-full
                p-20
              "
                data-wow-delay=".1s
              "
              >
                <img
                  src={imgSrc}
                  className="h-full w-full bg-cover rounded-full"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div class="flex text-center md:text-right">
          <div class="w-full flex flex-col justify-between">
            <div class="mb-[60px] lg:mb-20 max-w-[630px]">
              <span class="font-semibold text-lg text-primary mb-2 block">
                Infrastructure
              </span>
              <h2
                class="
                  font-bold
                  text-3xl
                  sm:text-4xl
                  md:text-[42px]
                  text-dark
                  mb-4
                "
              >
                {title}
              </h2>
              <motion.p
                key={currentIndex}
                initial={{
                  x: -10,
                  opacity: 0,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                }}
                transition={{
                  duration: 1,
                }}
                class="
                  text-lg
                  sm:text-xl
                  leading-relaxed
                  sm:leading-relaxed
                  text-body-color
                "
              >
                {description}
              </motion.p>
            </div>
            <div class="mb-[60px] lg:mb-20 max-w-[630px] flex justify-end space-x-4">
              <span
                onClick={() => increaseIndex()}
                class="font-semibold text-lg text-primary mb-2 block flex cursor-pointer"
              >
                {"<"} Previous
              </span>
              <span
                onClick={() => decreaseIndex()}
                class="font-semibold text-lg text-primary mb-2 block cursor-pointer"
              >
                Next {">"}
                <span></span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
