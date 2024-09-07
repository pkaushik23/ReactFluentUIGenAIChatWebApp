import React, { ReactNode, useEffect } from 'react';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { handleLogin } from '../services/msalHelper';
import { LoginFlow } from '../models/types/appTypes';

interface ProtectedRouteProps {
    children: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isAuthenticated = useIsAuthenticated();
    const { instance } = useMsal();


    const handleSignIn = () => {
        handleLogin(instance, LoginFlow.Redirect);
    };

    useEffect(() => {
        if (!isAuthenticated) {
          handleSignIn();
        }
      }, [isAuthenticated, instance]);

    if (!isAuthenticated) {
        return null; 
    }

    return children;
};

export default ProtectedRoute;
