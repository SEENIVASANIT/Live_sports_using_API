/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment, useContext, useEffect, useState } from "react";
import { Disclosure, Menu, Switch, Transition } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
// import SettingModal from "../views/settings";
const classNames = (...classes: string[]): string =>
  classes.filter(Boolean).join(" ");

const navigation = [
  { name: "Dashboard", href: "/dashboard", current: false },
  { name: "Signup", href: "/signup", current: false },
  { name: "Signin", href: "/signin", current: false },
];

const Appbar = () => {
  const { pathname } = useLocation();
  const [auth, setAuth] = useState(false);
  const [nav, setNav] = useState(navigation);
  // const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("userData") || "";
    const parsedUser = user == "" ? {} : JSON.parse(user);
   
    if (parsedUser.id) {
      setAuth(true);
      setNav([]);
    }
  }, []);

 
  return (
    <>
      <Disclosure
        as="nav"
        className="border-b bg-blue-400 h-25
        "
      >
        {({ open }) => (
          <div className="mx-auto px-4 sm:px-6 lg:px-4 py-2">
            {open && (
              <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white   divide-green-500 dark:dividde-green-300 ">
                  <div className="pt-5 pb-6 px-5">
                    <div className="flex items-center justify-between">
                      
                      <h1 className="text-4xl text-gray-800 font-semibold text-left w-full ml-6 my-3 font-serif">Sports News</h1>
                     
                      <div className="-mr-2">
                        <Disclosure.Button className="bg-white dark:bg-slate-600 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-green-600 dark:hover:text-green-500 hover:bg-gray-100 dark:hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-600">
                          <span className="sr-only">Menu</span>
                       
                          <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </Disclosure.Button>
                      </div>
                    </div>
                  </div>
                  <div className="py-6 px-5 space-y-6">
                      {!auth &&(<div className="grid grid-cols-1 gap-4">
                       <Link
                          
                          to={'/dashboard'}
                          className="text-base font-medium text-gray-900 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-500"
                        >
                          {'Dashboard'}
                        </Link>
                        <Link
                          
                          to={"/signup"}
                          className="text-base font-medium text-gray-900 dark:text-slate-300 hover:text-gray-400 dark:hover:text-gray-400"
                        >
                          {"Signup"}
                        </Link>
                        <Link
                          
                          to={"/signin"}
                          className="text-base font-medium text-gray-900 dark:text-slate-300 hover:text-gray-400 dark:hover:text-gray-400"
                        >
                          {"Signin"}
                        </Link>
                     
                    </div>)}
                    
                    {auth && (
                      <>
                      <div className="flex justify-between">
                   
                      <Link
                          
                          to={"/signin"}
                          
                          className="text-base font-bold text-gray-900 dark:text-slate-300 hover:text-gray-400 dark:hover:text-gray-400"
                        >
                          {"Log out"}
                        </Link>
                      <Link
                          
                          to={""}
                          
                          className="text-base  text-gray-900 font-bold dark:text-slate-300 hover:text-gray-400 dark:hover:text-gray-400"
                        >
                          {"Reset Password"}
                        </Link>
                        <button
                        // onClick={() => setIsOpen(true)}
                        className="text-gray-900 dark:text-slate-300 hover:text-gray-400 font-bold dark:hover:text-gray-400"
                      >
                        Preferences
                      </button>
                      </div>
                      </>
                    )}
                    
                  </div>
                </div>
              </div>
            )}
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center justify-between w-full">
                <div className="flex-shrink-0">
                  <Link to={"/"}>
                    <h2 className="text-4xl text-gray-800 font-semibold text-left w-full ml-6 my-3 font-serif">Sports News</h2>
                  </Link>
                 
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {nav.map((item) => {
                      const isCurrent = pathname.includes(item.href);
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            isCurrent
                              ? "bg-slate-50 dark:bg-white-700 text-black-700 dark:text-white-500"
                              : "text-white-700 dark:text-slate-300 dark:hover:text-white hover:text-white-600",
                            "rounded-md px-3 py-2 text-sm font-medium "
                          )}
                          aria-current={isCurrent ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center gap-2 md:ml-6">
         
                  {auth ? (
                    <>
                           <svg xmlns="http://www.w3.org/2000/svg"  fill="none"       viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="cursor-pointer w-9 h-9 rounded-full bg-white p-1 text-gray-400 hover:text-black
                                    dark:bg-slate-600 dark:text-slate-300 dark:hover:text-black">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"  />
</svg>
                    <Menu as="div" className="relative ml-3">
                      <div className="flex p-3  justify-between">
            
                        <Menu.Button
                          className="rounded-full  bg-white p-1 text-gray-400 hover:text-black 
                                    dark:bg-slate-600 dark:text-slate-300 dark:hover:text-black"
                        >
                          <UserCircleIcon
                            className="w-8 h-8"
                            aria-hidden="true"
                          />
                         

                        </Menu.Button>
                        

                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-300 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href={"/signin"}
                                  className={classNames(
                                    active
                                      ? "bg-slate-200/50 dark:bg-slate-600/50"
                                      : "",
                                    "w-full text-left block px-4 py-2 text-sm"
                                  )}
                                >
                                  {"Log out"}
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href={"/"}
                                  className={classNames(
                                    active
                                      ? "bg-slate-200/50 dark:bg-slate-600/50"
                                      : "",
                                    "w-full text-left block px-4 py-2 text-sm"
                                  )}
                                >
                                  {"Reset Password"}
                                </a>
                              )}
                            </Menu.Item>
                        
                                                  </Menu.Items>
                      </Transition>
                    </Menu>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                
                <Disclosure.Button className="bg-white dark:bg-slate-600 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-green-600 dark:hover:text-green-500 hover:bg-gray-100 dark:hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white-600">
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </Disclosure.Button>
              </div>
            </div>
            {/* <SettingModal open={isOpen} setOpen={setIsOpen} /> */}
          </div>
        )}
      </Disclosure>
    </>
  );
};

export default Appbar;
