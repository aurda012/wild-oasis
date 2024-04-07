import { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // 3. If the user is not authenticated, redirect to the login page using useNavigate
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  // 2. While loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If there is a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
