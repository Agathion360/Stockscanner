
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import BarcodeScanner from './components/Scaner/Scaner';
// import Inicio from './components/Inicio/Inicio';
// import Stock from './components/Stock/Stock';
// import Salida from './components/Salida/Salida';
// import Ingreso from './components/Ingreso/Ingreso';


// function App() {
//   return (
//     <Router>
//       <div>
//         <nav>
//           <ul>
//             <li>
//               <Link to="/">Inicio</Link>
//             </li>
//             <li>
//               <Link to="/scaner">Control de Stock / Ingreso</Link>
//             </li>

//             <li>
//               <Link to="/stock">stock productos</Link>
//             </li>

//             <li>
//               <Link to="/salida">salida de productos</Link>
//             </li>

//             <li>
//               <Link to="/ingreso">Ingreso de productos</Link>
//             </li>


//           </ul>
//         </nav>

//         <Routes>
//           <Route path="/" element={<Inicio />} />
//           <Route path="/scaner" element={<BarcodeScanner />} />
//           <Route path="/stock" element={<Stock/>} />
//           <Route path="/salida" element={<Salida/>} />
//           <Route path="/ingreso" element={<Ingreso/>} />

       
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;




import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaBarcode, FaBoxOpen, FaWarehouse, FaArrowUp, FaArrowDown, FaClipboardList, FaCogs, FaUpload } from 'react-icons/fa';
import BarcodeScanner from './components/Scaner/Scaner';
import Inicio from './components/Inicio/Inicio';
import Stock from './components/Stock/Stock';
import Salida from './components/Salida/Salida';
import Ingreso from './components/Ingreso/Ingreso';
import Consulta from './components/Consulta/Consulta';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/scaner" element={<BarcodeScanner />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/salida" element={<Salida />} />
          <Route path="/ingreso" element={<Ingreso />} />
          <Route path="/consulta" element={<Consulta />} />
     
        </Routes>

      </div>
    </Router>
  );
}

export default App;
