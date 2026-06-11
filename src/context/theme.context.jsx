import { createContext, useState } from "react";

const ThemeContext = createContext();

function ThemeWrapper(props) {
    const [theme, setTheme] = useState("dark");

    const passedContext = {
        theme,
        setTheme,
    }

    return (
        <ThemeContext.Provider value={passedContext}>
            {props.children}
        </ThemeContext.Provider>
    )

}

export {
    ThemeContext,
    ThemeWrapper
}