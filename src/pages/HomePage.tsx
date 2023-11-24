import React, {PropsWithChildren} from "react";

const HomePage: React.FunctionComponent<PropsWithChildren> = ({children}) => {
    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to our website!</p>
        </div>
    );
}

export default HomePage;