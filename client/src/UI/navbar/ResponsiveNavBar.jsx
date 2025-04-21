// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import styles from "./ResponsiveNavBar.module.scss";
// import { FiMenu, FiX } from "react-icons/fi";

// const ResponsiveNavBar = ({ links = [] }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => setIsOpen((prev) => !prev);

//   return (
//     <nav className={styles.navbar}>
//       <div className={styles.burger} onClick={toggleMenu}>
//         {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
//       </div>

//       <div className={`${styles.links} ${isOpen ? styles.show : ""}`}>
//         <Link to="/allCategories" onClick={() => setIsOpen(false)}>
//           Все категории
//         </Link>
//         {Array.isArray(links) &&
//           links.map((link) => (
//             <Link
//               key={link.id}
//               to={`/category/${link.id}`}
//               onClick={() => setIsOpen(false)}
//             >
//               {link.Name}
//             </Link>
//           ))}
//         <Link to="#" onClick={() => setIsOpen(false)}>
//           Отзывы
//         </Link>
//         <Link to="#" onClick={() => setIsOpen(false)}>
//           Контакты
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default ResponsiveNavBar;
