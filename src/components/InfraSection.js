import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInfraData } from "../context/infraDataProvider";

// const infraArray = [
//   {
//     title: "Powder Packing Machine",
//     description:
//       "We offer the highest performing designs of filling, wrapping and powder packing machines and make the one stop solution for the companies looking for high-quality packaging machines at affordable prices.",
//     imgSrc: "infa1.jpg",
//   },
//   {
//     title: "Vertical Form Fill & Seal Machine",
//     description:
//       "Vertical Form Fill Seal Machines (VFFS) are used to pack products in plastic bags made of PE or PP laminated film. As the machines are used to pack products in plastic bags these need to be designed with due attention and high safety measures.",
//     imgSrc: "infa2.jpeg",
//   },
//   {
//     title: "Weigh Filler Machine",
//     description:
//       "For the last 23 years, Akash Pack has been manufacturing and supplying a wide range of packaging machines. Among its different machines, the weigh filler machine is one of the highly demanded products due to its unique performance.",
//     imgSrc: "infa3.jpg",
//   },
//   {
//     title: "Automatic Auger Filler Machine",
//     description:
//       "Looking for high-quality and technologically advanced auger filling machines at the best prices? Akash Pack Tech Ltd. is the right place for you. Having more than two decades of experience in packaging machines, we are known as the top manufacturer and supplier in India.",
//     imgSrc: "infa4.jpg",
//   },
//   {
//     title: "Automatic Pouch Packing Machine",
//     description:
//       "Akash Pack Tech Ltd. is a reputed pouch filling and other packaging machines manufacturer and supplier. Established in 1997, today, the company is known for its unmatched multi track pouch packaging machines solution and industry leading prices.",
//     imgSrc: "infa5.webp",
//   },
//   {
//     title: "Sachet Packing Machine",
//     description:
//       "Akash Pack is a well-known manufacturer and supplier of packaging machines. We deal in a wide range of packaging machines including sachet packing machines. It is perfect for pharmaceutical, nutritional supplement packaging and food products packaging.",
//     imgSrc: "infa6.jpeg",
//   },
//   {
//     title: "Flow Wrap Machine",
//     description:
//       "Akash Pack Tech proudly calls itself the leading manufacturer and supplier of flow wrap machines in India. Flow wrap machines are required to make a horizontal bag from a single roll of film such as biscuit packets.",
//     imgSrc: "infa7.jpg",
//   },
//   {
//     title: "Liquid Packing Machine",
//     description:
//       "Liquid pouch filling machines are widely used to fill an accurate amount of liquid in pouches such as liquid hand wash, refined oil, shampoo etc. Only high-quality and technologically advanced machines can ensure accurate filling with minimum errors and spillage.",
//     imgSrc: "infa8.jpeg",
//   },
// ];

export default function InfraSection() {
  const [start, setStart] = useState(0);
  const [size, setSize] = useState(4);
  const navigate = useNavigate();

  const { infraArray } = useInfraData();

  function increaseIndex() {
    if (start + size < infraArray.length - 1) {
      setStart(start + size);
    } else {
      setStart(0);
    }
  }

  function decreaseIndex() {
    if (start - size >= 0) {
      setStart(start - size);
    } else {
      setStart(infraArray.length - 4);
    }
  }

  function handleNavigate(data) {
    navigate("/infrastructure", { state: { data: data } });
  }

  return (
    <section id="infrastructure" class="pt-20 md:pt-[120px]">
      <div class="container flex flex-col  justify-between w-full">
        <div class="flex text-left">
          <div class="w-full flex flex-col justify-between relative">
            <div class="mb-[60px] lg:mb-10 max-w-[630px]">
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
                Protecting Freshness, Enhancing Quality
              </h2>
              {/* <motion.p
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
                {/* {description}
              </motion.p> */}
            </div>
          </div>
        </div>
        <div class="flex">
          <div class="w-full flex space-x-4 relative">
            <span
              onClick={() => decreaseIndex()}
              class=" absolute top-1/2 font-semibold text-xl text-primary mb-2 block flex cursor-pointer  -translate-x-10"
            >
              <img
                src="arrowdown.png"
                className="rotate-90 h-8 w-8 p-2 rounded-full bg-primary bg-opacity-80 hover:bg-opacity-95 hover:scale-105 hover:ease-in-out hover:duration-300"
              />
            </span>
            <span
              onClick={() => increaseIndex()}
              class="absolute top-1/2 right-0 font-semibold text-xl text-primary mb-2 block cursor-pointer translate-x-14"
            >
              <img
                src="arrowdown.png"
                className="-rotate-90 h-8 w-8 p-2 rounded-full bg-primary bg-opacity-80 hover:bg-opacity-95 hover:scale-105 hover:ease-in-out hover:duration-300"
              />

              <span></span>
            </span>

            <AnimatePresence>
              {infraArray
                .filter((infa, index) => {
                  if (index >= start && index < start + size) {
                    return infa;
                  }
                })
                .map((infa, index) => (
                  <motion.div
                    key={index + start}
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      duration: 1,
                    }}
                    class="
                ud-single-testimonial
                mb-12
                shadow-testimonial
                wow
                fadeInUp
                ease-in-out
              "
                    data-wow-delay=".1s
              "
                  >
                    <div class="max-w-80 h-[500px]  hover:scale-105 hover:duration-500 rounded-lg drop-shadow-xl bg-gray-900 overflow-hidden">
                      <a href="# " className="">
                        <img
                          class="rounded-t-lg w-full h-60 scale-105 "
                          src={infa.url}
                          alt=""
                        />
                      </a>
                      <div class="p-5">
                        <a href="#">
                          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {infa.title}
                          </h5>
                        </a>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                          {infa.summary.slice(0, 110)}...
                        </p>
                        {/* <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                          {infa.description.slice(0, 30)}...
                        </p> */}
                        <span
                          onClick={() => handleNavigate(infa)}
                          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Read more
                          <svg
                            class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
