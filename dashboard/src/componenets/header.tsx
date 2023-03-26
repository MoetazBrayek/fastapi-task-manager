import React, { FC } from "react";
import { FaNewspaper, FaTasks, FaBook, FaTrophy, FaRoad } from "react-icons/fa";

const Header: FC = () => {

  return (
<header className="bg-blue-500">
  <nav className="container mx-auto px-6 py-3 md:flex md:justify-between md:items-center">
    <div className="flex items-center justify-between">
      <div>
        <a className="flex items-center text-2xl font-bold text-white hover:text-gray-300" href="/home">
          <span className="mr-2">
            <FaTasks />
          </span>
          Task Manager
        </a>
      </div>
      <div className="flex md:hidden">
        <button
          type="button"
          className="text-gray-500 hover:text-white focus:outline-none focus:text-white"
          aria-label="toggle menu"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
            <path
              fillRule="evenodd"
              d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
            />
          </svg>
        </button>
      </div>
    </div>
    <div className="md:flex md:items-center md:mx-6">
      <div className="flex flex-col md:flex-row md:mx-6">
        <a className="my-1 text-lg text-gray-200 hover:text-white md:mx-4 md:my-0" href="news">
          <span className="mr-2">
            <FaNewspaper />
          </span>
          News
        </a>
        <a className="my-1 text-lg text-gray-200 hover:text-white md:mx-4 md:my-0" href="tasks">
          <span className="mr-2">
            <FaTasks />
          </span>
          Tasks
        </a>
        <a className="my-1 text-lg text-gray-200 hover:text-white md:mx-4 md:my-0" href="wiki">
          <span className="mr-2">
            <FaBook />
          </span>
          Wiki
        </a>
        <a className="my-1 text-lg text-gray-200 hover:text-white md:mx-4 md:my-0" href="ranking">
          <span className="mr-2">
            <FaTrophy />
          </span>
          Ranking
        </a>
        <a className="my-1 text-lg text-gray-200 hover:text-white md:mx-4 md:my-0" href="roadmap">
          <span className="mr-2">
            <FaRoad />
          </span>
          Roadmap
        </a>
      </div>
      <div className="flex items-center">
        <button
          className="bg-white text-blue-900 px-4 py-2 rounded-md hover:bg-gray-200"
          type="button"
        >
          Log out
        </button>
        <div className="ml-4">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://picsum.photos/id/237/200/200"
            alt="Profile"
          />
        </div>
      </div>
    </div>
  </nav>
</header>
    )
}

export default Header