// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useMsal } from '@azure/msal-react';

// const AuthHandler:React.FC = () => {
//   const { instance } = useMsal();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Handle the redirect after login and retrieve the state
//     instance.handleRedirectPromise().then((response) => {
//       if (response) {
//         const returnUrl = response.state || '/'; // Default to root if no state
//         navigate(returnUrl); // Redirect back to the original URL
//       }
//     });
//   }, [instance, navigate]);

//   return null; // This component doesn't render anything, just handles redirect
// };

// export default AuthHandler;
