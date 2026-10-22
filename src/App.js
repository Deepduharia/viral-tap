import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tools from "./pages/Tools";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Disclaimer from "./pages/Disclaimer";
import Guides from "./pages/Guides";
const App = () => {
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/tools", element: _jsx(Tools, {}) }), _jsx(Route, { path: "/about", element: _jsx(About, {}) }), _jsx(Route, { path: "/contact", element: _jsx(Contact, {}) }), _jsx(Route, { path: "/privacy-policy", element: _jsx(PrivacyPolicy, {}) }), _jsx(Route, { path: "/terms", element: _jsx(Terms, {}) }), _jsx(Route, { path: "/disclaimer", element: _jsx(Disclaimer, {}) }), _jsx(Route, { path: "/guides", element: _jsx(Guides, {}) })] }) }));
};
export default App;
