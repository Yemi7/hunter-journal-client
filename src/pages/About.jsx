import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AboutImg from '../resources/images/about2.png'
import './page-styles/about.css'
import { ThemeContext } from "../context/theme.context";
import { Placeholder } from "react-bootstrap";
import WhiteGithubPng from "../resources/images/whitegithub.png"

function About() {
    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <div className="about">
            <div className="image-box ">
                <img src={AboutImg} className="w-100 h-auto rounded about-image" />
            </div>
            <div className="about-details">
                <h2>The Hunter Journal</h2>
                <p>
                    This website is inspired by the hunter journal in the game Hollow Knight,
                    that tracks the details of an enemy you have defeated.
                </p>
                <h2>Features</h2>
                <ul>
                    <li>You can view a database of enemies</li>
                    <li>You can filter the enemies you see by their location in the game</li>
                    <li>You can add, edit and delete enemies from the database</li>
                    <li>You can view a list of locations in the game </li>
                    <li>You can search for enemies in the search bar by name</li>
                </ul>
                <h2>Credits</h2>
                <div className="creator">
                    <p>Oluyemi Ogunbadejo</p>
                    {
                        theme === "dark" ?
                            <Link to='https://github.com/Yemi7/hunter-journal-client'>
                                <img className="light-git-png" src={WhiteGithubPng} />
                            </Link> :
                            Placeholder
                    }
                    <p>Github</p>
                    <Link className="art-link" to='https://www.reddit.com/r/HollowKnightArt/comments/18b8xx8/i_badly_drew_every_named_hollow_knight_character/'>
                        <h2>Cover art</h2>
                    </Link>
                    <Link to={"/"} >
                        <button className="btn" >Back</button>
                    </Link>
                </div>

            </div>

        </div>
    )
}

export default About;