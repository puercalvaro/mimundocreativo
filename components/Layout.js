import { Fragment, useContext, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import PropTypes from "prop-types";
import SigninPopupModal from "./SigninPopupModal";
import { Menu, Transition } from "@headlessui/react";
import SecondaryButton from "@/components/SecondaryButton";
import NavItem from "@/components/navItems";
import { useSession, signIn, signOut } from "next-auth/react"

import {
  HeartIcon,
  HomeIcon,
  LogoutIcon,
  PlusIcon,
  UserIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";

const menuItems = [
  {
    label: "List a new home",
    icon: PlusIcon,
    href: "/addProducts",
  },
  {
    label: "My homes",
    icon: HomeIcon,
    href: "/products",
  },
  {
    label: "Favorites",
    icon: HeartIcon,
    href: "/favorites",
  },
  {
    label: "Logout",
    icon: LogoutIcon,
    onClick: () => null,
  },
];


const Layout = ({ children = null }) => {
  const { data: session } = useSession()

  if (session && session.user.role === "admin") {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const [navActive, setNavActive] = useState(null);
  const [activeIdx, setActiveIdx] = useState(-1);

  const MENU_LIST = [
    { text: "Tienda", href: "/products" },
    { text: "Carrito", href: "/cart" },
    { text: "Añadir producto", href: "/addProducts" },
  ];

  return (
    <>
      <Head>
        <title>Mi Mundo Creativo</title>
        <meta name="title" content="SupaaShopp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col font-['Poppins'] bg-[linear-gradient(90deg, #161122 21px, transparent 1%) center, linear-gradient(#161122 21px, transparent 1%) center, #a799cc]">
        <header className="static top-0 z-30 w-full h-16 shadow-lg md:h-28">
        
          <div className="container h-full mx-auto">
            
            <div className="flex items-center justify-between h-full px-5 space-x-5 md:static">
              <Link href="/">
                <a className="flex items-center space-x-1">
                  <span className="text-2xl font-semibold tracking-wide text-white">
                    <span className="text-3xl text-success">MiMundoCreativo</span>

                  </span>
                </a>
              </Link>

              <nav
        className={`nav ${
          navActive ? "active" : ""
        }
        `}
      >
        <div
          className={`md:hidden active menu__icon ${
            navActive ? "active" : "inactive"
          }`}
          onClick={() => setNavActive(!navActive)}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`menu ${navActive ? "active" : ""}`}>
        <button className="p-2 text-2xl tracking-wide text-success">
            <h1>{session.user.name.split(" ", 1)}</h1>
          </button>
          {MENU_LIST.map((menu, idx) => (
            <button className="p-2 text-2xl font-semibold tracking-wide text-success"
              onClick={() => {
                setActiveIdx(idx);
                setNavActive(false);
              }}
              key={menu.href}
            >
              
              <NavItem {...menu} active={idx === activeIdx} />
            </button>
            
          ))}
          
          <button className="p-2 text-2xl font-semibold tracking-wide text-success" 
          onClick={signOut}>
            Salir
          </button>
          
        </div>
      </nav>
            </div>

          <script type="text/javascript" src="navi.js"></script>
          </div>
        </header>
              
        <main className="container flex-grow mx-auto">
          <div className="px-2">
            {typeof children === "function" ? children(openModal) : children}
          </div>
        </main>
        <SigninPopupModal show={showModal} onClose={closeModal} />
      </div>
    </>
  );
} else {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const [navActive, setNavActive] = useState(null);
  const [activeIdx, setActiveIdx] = useState(-1);

  const MENU_LIST = [
    { text: "Tienda", href: "/products" },
    { text: "Carrito", href: "/cart" },
  ];

  return ( !session? <a/> :
    <>
      <Head>
        <title>Mi Mundo Creativo</title>
        <meta name="title" content="SupaaShopp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col font-['Poppins'] bg-[linear-gradient(90deg, #161122 21px, transparent 1%) center, linear-gradient(#161122 21px, transparent 1%) center, #a799cc]">
        <header className="static top-0 z-30 w-full h-16 shadow-lg md:h-28">
        
          <div className="container h-full mx-auto">
            
            <div className="flex items-center justify-between h-full px-5 space-x-5 md:static">
              <Link href="/">
                <a className="flex items-center space-x-1">
                  <span className="text-2xl font-semibold tracking-wide text-white">
                    <span className="text-3xl text-success">MiMundoCreativo</span>

                  </span>
                </a>
              </Link>

              <nav
        className={`nav ${
          navActive ? "active" : ""
        }
        `}
      >
        <div
          className={`md:hidden active menu__icon ${
            navActive ? "active" : "inactive"
          }`}
          onClick={() => setNavActive(!navActive)}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        
        <div className={`menu ${navActive ? "active" : ""}`}>
        {session ? <button className="p-2 text-2xl tracking-wide text-success">
            <h1>{session.user.name.split(" ", 1)}</h1>
          </button> : null}
          {MENU_LIST.map((menu, idx) => (
            <button className="p-2 text-2xl font-semibold tracking-wide text-success"
              onClick={() => {
                setActiveIdx(idx);
                setNavActive(false);
              }}
              key={menu.href}
            >
              
              <NavItem {...menu} active={idx === activeIdx} />
            </button>
            
          ))}
          <button className="p-2 text-2xl font-semibold tracking-wide text-success" 
          //onClick={openModal}>
          //onClick={() => signIn()}>
          onClick={session ? signOut : signIn}>
            {session ? "Salir" : "Acceder"}
          </button>
        </div>
      </nav>
            </div>

          <script type="text/javascript" src="navi.js"></script>
          </div>
        </header>
              
        <main className="container flex-grow mx-auto">
          <div className="px-2">
            {typeof children === "function" ? children(openModal) : children}
          </div>
        </main>
        <SigninPopupModal show={showModal} onClose={closeModal} />
      </div>
    </>
  );
}
};
Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

export default Layout;