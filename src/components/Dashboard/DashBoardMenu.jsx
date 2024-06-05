import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const DashBoardMenu = ({ path, logo, title, open }) => {
  return (
    <li className="flex rounded-md p-2 cursor-pointer hover:bg-red-200 text-gray-500 text-sm items-center gap-x-4 mt-2">
      <NavLink to={path} className="flex items-center gap-4">
        <div className="text-red-400">{logo}</div>
        <span className={`${!open && "hidden"} origin-left duration-200`}>
          {title}
        </span>
      </NavLink>
    </li>
  );
};
DashBoardMenu.propTypes = {
  path: PropTypes.string,
  logo: PropTypes.node,
  title: PropTypes.string,
  open: PropTypes.bool,
};
export default DashBoardMenu;
