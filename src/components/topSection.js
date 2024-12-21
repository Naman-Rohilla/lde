import { useState } from "react";

const topArray = [
  {
    imgId: 1,
    imgSrc: "pack1.jpg",
  },
  {
    imgId: 2,
    imgSrc: "pack2.jpg",
  },
];

export default function TopSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { imgId, imgSrc } = topArray[currentIndex];
  console.log(imgId, imgSrc, "hi");

  function increaseIndex() {
    if (currentIndex < topArray.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  }

  function decreaseIndex() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(topArray.length - 1);
    }
  }

  return (
    <div
      id="home"
      class="relative pt-[120px] md:pt-[130px] lg:pt-[160px]  pb-20"
    >
      <div className="absolute top-0 h-full w-screen">
        <img src={imgSrc} className="bg-cover w-full h-full" />
      </div>
      <div className="absolute top-0 h-full w-screen z-2 bg-primary opacity-90"></div>
      <div
        className="absolute top-1/2 pl-2"
        style={{
          zIndex: 200,
        }}
      >
        <img
          src="arrowdown.png"
          className="rotate-90 h-14 w-14 p-2  rounded-full hover:bg-primary"
          onClick={() => decreaseIndex()}
        />
      </div>
      <div
        className="absolute top-1/2 right-0 pr-2"
        style={{
          zIndex: 200,
        }}
      >
        <img
          src="arrowdown.png"
          className="-rotate-90 h-14 w-14 p-2 rounded-full hover:bg-primary"
          onClick={() => increaseIndex()}
        />
      </div>
      <div
        class="container relative mt-10"
        style={{
          zIndex: 100,
        }}
      >
        <div class="flex -mx-4 items-end">
          <div class="w-full px-4 ">
            <div
              class="
                hero-content
                
                max-w-[780px]
                mx-auto
                wow
                fadeInUp
                
              "
              data-wow-delay=".2s"
            >
              <h1
                class="
                  text-white
                  font-bold
                  text-3xl
                  sm:text-4xl
                  md:text-[45px]
                  leading-snug
                  sm:leading-snug
                  md:leading-snug
                  mb-8
                  text-center
                  md:text-left
                "
              >
                Premium Food Packaging Solutions for Freshness and Convenience
              </h1>
              <p
                class="
                  text-base
                  sm:text-lg sm:leading-relaxed
                  md:text-xl md:leading-relaxed
                  text-center
                  md:text-left
                  px-10
                  md:px-0
                  mb-10
                  text-[#e4e4e4]
                  max-w-[600px]
                "
              >
                Reliable packaging services to keep your food fresh and secure.
                Ensuring quality and safety with eco-friendly, customized
                packaging options.
              </p>
              <ul class="flex md:justify-start justify-center mb-10">
                <li>
                  <a
                    // href="https://links.tailgrids.com/play-download"
                    class="
                      py-4
                      px-6
                      sm:px-10
                      inline-flex
                      items-center
                      justify-center
                      text-center text-dark text-base
                      bg-white
                      hover:text-primary hover:shadow-lg
                      font-medium
                      rounded-lg
                      transition
                      duration-300
                      ease-in-out
                    "
                  >
                    Subscribe Now
                  </a>
                </li>
                <li>
                  <a
                    // href="https://github.com/tailgrids/play-tailwind"
                    // target="_blank"

                    class="
                      text-base
                      font-medium
                      text-white
                      py-4
                      px-6
                      sm:px-10
                      flex
                      items-center
                      hover:opacity-70
                      transition
                      duration-300
                      ease-in-out
                    "
                  >
                    Follow us on Instagram
                    <span class="pl-2">
                      <svg
                        width="20"
                        height="8"
                        viewBox="0 0 20 8"
                        class="fill-current"
                      >
                        <path d="M19.2188 2.90632L17.0625 0.343819C16.875 0.125069 16.5312 0.0938193 16.2812 0.281319C16.0625 0.468819 16.0312 0.812569 16.2188 1.06257L18.25 3.46882H0.9375C0.625 3.46882 0.375 3.71882 0.375 4.03132C0.375 4.34382 0.625 4.59382 0.9375 4.59382H18.25L16.2188 7.00007C16.0312 7.21882 16.0625 7.56257 16.2812 7.78132C16.375 7.87507 16.5 7.90632 16.625 7.90632C16.7812 7.90632 16.9375 7.84382 17.0312 7.71882L19.1875 5.15632C19.75 4.46882 19.75 3.53132 19.2188 2.90632Z" />
                      </svg>
                    </span>
                  </a>
                </li>
              </ul>
              <div
                class="wow flex justify-center md:justify-start fadeInUp text-white"
                data-wow-delay=".3s"
              >
                Required Client logo or some brand
              </div>
            </div>
          </div>

          <div class="w-full px-4 hidden md:flex">
            <div
              class="mx-auto max-w-[845px] relative z-10 wow fadeInUp"
              data-wow-delay=".25s"
            >
              <div class="-mt-14">
                <img
                  src="vectorMachine.svg"
                  alt="hero"
                  class="max-w-full mx-auto rounded-t-xl rounded-tr-xl"
                  style={{
                    height: 600,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
