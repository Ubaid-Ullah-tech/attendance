import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
 
export function SimpleFooter() {
  return (
    <footer className="flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 md:px-20 py-6 text-center md:justify-between">
      <Typography color="blue-gray" className="font-normal">
        &copy; 2024 Ubaid Attendance System
      </Typography>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
        
        <li>
          <Typography
            as="span"
            href="#"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            <Link to='/register'>
            Register
            </Link>
          </Typography>
        </li>
        <li>
          <Typography
            as="span"
            href="#"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            <Link to='/login'>
            Login
            </Link>
          </Typography>
        </li>
        <li>
          <Typography
            as="span"
            href="#"
            color="blue-gray"
            className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
          >
            <Link to='/contact'>
            Contact Us
            </Link>
          </Typography>
        </li>
      </ul>
    </footer>
  );
}