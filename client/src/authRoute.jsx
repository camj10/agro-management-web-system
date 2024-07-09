// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import axios from 'axios';

// const AuthRoute = ({ element, ...rest }) => {
//   const [auth, setAuth] = React.useState(false);

//   React.useEffect(() => {
//     axios.get('http://localhost:8081')
//       .then(res => {
//         if (res.data.Status === 'Success') {
//           setAuth(true);
//         } else {
//           setAuth(false);
//         }
//       })
//       .catch(err => {
//         console.error(err);
//         setAuth(false);
//       });
//   }, []);

//   return auth ? <Route {...rest} element={element} /> : <Navigate to="/login" />;
// };

// export default AuthRoute;

// PrivateRoute.js
// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import axios from 'axios';
 
// const AuthRoute = ({ element, ...rest }) => {
//   const [auth, setAuth] = React.useState(false);

//   React.useEffect(() => {
//     axios.get('http://localhost:8081')
//       .then(res => {
//         if (res.data.Status === 'Success') {
//           setAuth(true);
//         } else {
//           setAuth(false);
//         }
//       })
//       .catch(err => {
//         console.error(err);
//         setAuth(false);
//       });
//   }, []);

//   return auth ? <Route {...rest} element={element} /> : <Navigate to="/login" />;
// };

// export default AuthRoute;

// PrivateRoute.js
// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import axios from 'axios';

// const AuthRoute = ({ element, ...rest }) => {
//   const [auth, setAuth] = React.useState(false);

//   React.useEffect(() => {
//     axios.get('http://localhost:8081')
//       .then(res => {
//         if (res.data.Status === 'Success') {
//           setAuth(true);
//         } else {
//           setAuth(false);
//         }
//       })
//       .catch(err => {
//         console.error(err);
//         setAuth(false);
//       });
//   }, []);

//   return auth ? <Route {...rest} element={element} /> : <Navigate to="/login" />;
// };

// export default AuthRoute;


import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import axios from 'axios';

const AuthRoute = ({ element, ...rest }) => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const res = await axios.get('http://localhost:8081');
        if (res.data.Status === 'Success') {
          setAuth(true);
        } else {
          setAuth(false);
        }
      } catch (err) {
        console.error(err);
        setAuth(false);
      }
    };

    checkAuthentication();
  }, []);

  return auth ? <Route {...rest} element={element} /> : <Navigate to="/login" />;
};

export default AuthRoute;

