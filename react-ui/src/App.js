import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
function App() {
    const [message, setMessage] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const url = useState('/api');
    const fetchData = useCallback(() => {
        fetch(url)
            .then(response => {
            if (!response.ok) {
                throw new Error(`status ${response.status}`);
            }
            return response.json();
        })
            .then(json => {
            setMessage(json.message);
            setIsFetching(false);
        }).catch(e => {
            setMessage(`API call failed: ${e}`);
            setIsFetching(false);
        });
    }, [url]);
    useEffect(() => {
        setIsFetching(true);
        fetchData();
    }, [fetchData]);
    return (React.createElement("div", { className: "App" },
        React.createElement("header", { className: "App-header" },
            React.createElement("img", {className: "App-logo", alt: "logo" }),
            process.env.NODE_ENV === 'production' ?
                React.createElement("p", null, "This is a production build from create-react-app.")
                : React.createElement("p", null,
                    "Edit ",
                    React.createElement("code", null, "src/App.js"),
                    " and save to reload."),
            React.createElement("p", null,
                '« ',
                React.createElement("strong", null, isFetching
                    ? 'Fetching message from API'
                    : message),
                ' »'),
            React.createElement("p", null,
                React.createElement("a", { className: "App-link", href: "https://github.com/mars/heroku-cra-node" }, "React + Node deployment on Heroku")),
            React.createElement("p", null,
                React.createElement("a", { className: "App-link", href: "https://reactjs.org", target: "_blank", rel: "noopener noreferrer" }, "Learn React")))));
}
export default App;
