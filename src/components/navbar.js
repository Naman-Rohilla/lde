export default function Navbar() {
  return (
    <div
      className="
        ud-header
        bg-transparent
        absolute
        top-0
        left-0
        
        w-full
        flex
        items-center
      "
      style={{
        zIndex: 999,
      }}
    >
      <div className="container">
        <div className="flex -mx-4 items-center justify-between relative">
          <div className="flex px-4 justify-between items-center w-full">
            <div className="px-4 w-60 max-w-full">
              <a href="/" className="navbar-logo w-full block py-5 text-white">
                Required Logo
              </a>
            </div>
            <div>
              <button
                id="navbarToggler"
                className="
                  block
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  lg:hidden
                  focus:ring-2
                  ring-primary
                  px-3
                  py-[6px]
                  rounded-lg
                  
                "
              >
                <span className="relative w-[30px] h-[2px] my-[6px] block bg-white"></span>
                <span className="relative w-[30px] h-[2px] my-[6px] block bg-white"></span>
                <span className="relative w-[30px] h-[2px] my-[6px] block bg-white"></span>
              </button>
              <nav
                id="navbarCollapse"
                className="
                  absolute
                  py-5
                  lg:py-0 lg:px-4
                  xl:px-6
                  bg-white
                  lg:bg-transparent
                  shadow-lg
                  rounded-lg
                  max-w-[250px]
                  w-full
                  lg:max-w-full lg:w-full
                  right-4
                  top-full
                  hidden
                  lg:block lg:static lg:shadow-none
                "
              >
                <ul className="block lg:flex">
                  <li className="relative group">
                    <a
                      href="#home"
                      className="
                        ud-menu-scroll
                        text-base text-dark
                        lg:text-white
                        lg:group-hover:opacity-70
                        lg:group-hover:text-white
                        group-hover:text-primary
                        py-2
                        lg:py-6 lg:inline-flex lg:px-0
                        flex
                        mx-8
                        lg:mr-0
                      "
                    >
                      Home
                    </a>
                  </li>
                  <li className="relative group">
                    <a
                      href="#product"
                      className="
                        ud-menu-scroll
                        text-base text-dark
                        lg:text-white
                        lg:group-hover:opacity-70
                        lg:group-hover:text-white
                        group-hover:text-primary
                        py-2
                        lg:py-6 lg:inline-flex lg:px-0
                        flex
                        mx-8
                        lg:mr-0 lg:ml-7
                        xl:ml-12
                      "
                    >
                      Product
                    </a>
                  </li>

                  <li className="relative group">
                    <a
                      href="#infrastructure"
                      className="
                        ud-menu-scroll
                        text-base text-dark
                        lg:text-white
                        lg:group-hover:opacity-70
                        lg:group-hover:text-white
                        group-hover:text-primary
                        py-2
                        lg:py-6 lg:inline-flex lg:px-0
                        flex
                        mx-8
                        lg:mr-0 lg:ml-7
                        xl:ml-12
                      "
                    >
                      Infrastructure
                    </a>
                  </li>

                  <li className="relative group">
                    <a
                      href="#team"
                      className="
                        ud-menu-scroll
                        text-base text-dark
                        lg:text-white
                        lg:group-hover:opacity-70
                        lg:group-hover:text-white
                        group-hover:text-primary
                        py-2
                        lg:py-6 lg:inline-flex lg:px-0
                        flex
                        mx-8
                        lg:mr-0 lg:ml-7
                        xl:ml-12
                      "
                    >
                      Team
                    </a>
                  </li>
                  <li className="relative group">
                    <a
                      href="#contact"
                      className="
                        ud-menu-scroll
                        text-base text-dark
                        lg:text-white
                        lg:group-hover:opacity-70
                        lg:group-hover:text-white
                        group-hover:text-primary
                        py-2
                        lg:py-6 lg:inline-flex lg:px-0
                        flex
                        mx-8
                        lg:mr-0 lg:ml-7
                        xl:ml-12
                      "
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="sm:flex justify-end hidden pr-16 lg:pr-0">
              <a
                href="signup.html"
                className="
                  text-base
                  font-medium
                  text-white
                  bg-white bg-opacity-20
                  rounded-lg
                  py-3
                  px-6
                  hover:bg-opacity-100 hover:text-dark
                  signUpBtn
                  duration-300
                  ease-in-out
                "
              >
                Connect With Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
