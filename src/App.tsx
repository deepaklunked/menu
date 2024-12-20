import { useState } from "react";
import Menu from "./components/Menu";
import styled from "styled-components";
import Button from "./components/Button";
import { PRODUCTS_URL } from "./constants";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 40px;
`;

function App() {
  const [showProducts, setShowProducts] = useState(false);
  const [isExternalFilter, setIsExternalFilter] = useState(false);

  const handleButtonClick = () => setShowProducts((prev) => !prev);
  const handleCheckbox = () => setIsExternalFilter((prev) => !prev);

  return (
    <AppContainer>
      <div>
        <label htmlFor="externalFilter">External filter?</label>
        <input id="externalFilter" type="checkbox" onChange={handleCheckbox}></input>
      </div>
      <Button onClick={handleButtonClick}>
        {showProducts ? "Hide" : "Show"} products
      </Button>
      {showProducts ? <Menu fetchURL={PRODUCTS_URL} isExternalFilter={isExternalFilter} /> : null}
    </AppContainer>
  );
}

export default App;
