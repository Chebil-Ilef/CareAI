import React, { useState } from "react";
import Icon from "../Images/logo_heart.PNG";
import Profile from "../Images/profile.webp";
// import Dashboard from "../Images/dash.svg";
import Skin from "../Images/skin.svg";
import BrainCancer from "../Images/brain.svg";
import Alzheimers from "../Images/alzheimers.svg";
import Parkinson from "../Images/parkinson.svg";
import Chatbot from "../Images/chatbot.svg";
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
                    <p className="name">Hello there 👋🏻</p>
                    <p>hospital@gmail.com</p>
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
                    <li
                        className={
                            location.pathname === "/HeartDisease"
                                ? "active"
                                : ""
                        }
                    >
                        <img src={Skin} alt="Skin Cancer" />
                        <a href="/skin">Skin Cancer</a>
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
                            location.pathname === "/settings" ? "active" : ""
                        }
                    >
                        <img src={Parkinson} alt="Parkinson" />
                        <a href="/Parkinson">Parkinson</a>
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
