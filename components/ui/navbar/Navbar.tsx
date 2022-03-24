import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="header">
      <div className="menu-logo">
        <Image 
        src={'/logo.png'}
        height={20}
        width={30}
        alt="logo"
        />
        
        <h1>Task Manager</h1>
      </div>
      <div className="header-menu">
        <Link href={"/"} passHref>
          <div className="menu-link is-active">Task</div>
        </Link>
        <Link href={"/search"} passHref>
          <div className="menu-link">Search</div>
        </Link>
      </div>
      {/* <div className="search-bar">
        <input type="text" placeholder="Search" />
      </div> */}
    </div>
  );
};
