import { FC } from "react";
import { Button } from "./Button";
import logo from "../assets/Logo.png";
import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react";

const PageHeader: FC = () => {
  const toggle = () => {
    // 展示menu
    // PC
  };

  return (
    <div className="flex justify-between items-center px-4 h-14">
      {/**Left */}
      <div className="gap-4 items-center flex-shrink-0 flex sm:mr-10">
        <Button onClick={toggle} variant="ghost" size="icon">
          <Menu />
        </Button>
        <a href="/">
          <img src={logo} className="h-6" />
        </a>
      </div>

      {/**form*/}
      <form className="flex-[0_1_732px] hidden sm:flex">
        <Button
          onClick={() => {}}
          type="button"
          size="icon"
          variant="ghost"
          className="flex-shrink-0 sm:hidden"
        >
          <ArrowLeft />
        </Button>

        <div className="flex flex-1 mr-4">
          <input
            type="search"
            placeholder="Search"
            className="flex-1 rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none"
          />
          <Button className="py-2 px-4 rounded-r-full border-secondary-border border border-l-0 flex-shrink-0">
            <Search />
          </Button>
        </div>

        <Button type="button" size="icon" className="flex-shrink-0">
          <Mic />
        </Button>
      </form>

      {/**Buttons*/}
      <div className="flex items-center md:gap-2 ml-10">
        <Button
          onClick={() => {}}
          size="icon"
          variant="ghost"
          className="sm:hidden"
        >
          <Search />
        </Button>
        <Button size="icon" variant="ghost" className="sm:hidden">
          <Mic />
        </Button>
        <Button size="icon" variant="ghost">
          <Upload />
        </Button>
        <Button size="icon" variant="ghost">
          <Bell />
        </Button>
        <Button size="icon" variant="ghost">
          <User />
        </Button>
      </div>
    </div>
  );
};

export default PageHeader;
