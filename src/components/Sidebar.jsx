import React, { useState } from "react";
import Icon from "../Images/2.PNG";
import Profile from "../Images/doc.webp";
import Dashboard from "../Images/dashboard.svg";
import HeartDisease from "../Images/transactions.svg";
import BrainCancer from "../Images/performance.svg";
import Alzheimers from "../Images/news.svg";
import Parkinson from "../Images/settings.svg";
import Chatbot from "../Images/support.svg";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
    const location = useLocation();

    const [closeMenu, setCloseMenu] = useState(false);

    const handleCloseMenu = () => {
        setCloseMenu(!closeMenu);
    };

    return (
        <div className={closeMenu === false ? "sidebar" : "sidebar active"}>
            <div
                className={
                    closeMenu === false
                        ? "logoContainer"
                        : "logoContainer active"
                }
            >
                <img src={Icon} alt="icon" className="logo" />
                <h2 className="title">CareAI. </h2>
            </div>
            <div
                className={
                    closeMenu === false
                        ? "burgerContainer"
                        : "burgerContainer active"
                }
            >
                <div
                    className="burgerTrigger"
                    onClick={() => {
                        handleCloseMenu();
                    }}
                ></div>
                <div className="burgerMenu"></div>
            </div>
            <div
                className={
                    closeMenu === false
                        ? "profileContainer"
                        : "profileContainer active"
                }
            >
                <img src={Profile} alt="profile" className="profile" />
                <div className="profileContents">
                    <p className="name">Hello, John 👋🏻</p>
                    <p>johnsmith@gmail.com</p>
                </div>
            </div>
            <div
                className={
                    closeMenu === false
                        ? "contentsContainer"
                        : "contentsContainer active"
                }
            >
                <ul>
                    <li className={location.pathname === "/" ? "active" : ""}>
                        <img src={Dashboard} alt="dashboard" />
                        <a href="/">dashboard</a>
                    </li>
                    <li
                        className={
                            location.pathname === "/HeartDisease"
                                ? "active"
                                : ""
                        }
                    >
                        <img src={HeartDisease} alt="Heart Disease" />
                        <a href="/HeartDisease">Heart Disease</a>
                    </li>
                    <li
                        className={
                            location.pathname === "/BrainCancer" ? "active" : ""
                        }
                    >
                        <img src={BrainCancer} alt="Brain Cancer" />
                        <a href="/BrainCancer">Brain Cancer</a>
                    </li>
                    <li
                        className={
                            location.pathname === "/news" ? "active" : ""
                        }
                    >
                        <img src={Alzheimers} alt="Alzheimer’s" />
                        <a href="/Alzheimers">Alzheimer’s </a>
                    </li>
                    <li
                        className={
                            location.pathname === "/settings" ? "active" : ""
                        }
                    >
                        <img src={Parkinson} alt="Parkinson" />
                        <a href="/Parkinson">Parkinson</a>
                    </li>
                    <li
                        className={
                            location.pathname === "/support" ? "active" : ""
                        }
                    >
                        <img src={Chatbot} alt="Healthcare Chatbot" />
                        <a href="/Chatbot">Chatbot</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
