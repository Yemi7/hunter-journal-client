import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import logoImg from '../resources/images/hk-logo.png'
import './page-styles/home.css'

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home">
            <div className="cover ">
                <img src={logoImg} className="w-100 h-auto rounded cover-image" />
            </div>
            <div className="journal-details mt-5 p-5 rounded">
                <p className="lh-3">
                    The Hunter Journal is an item in Hollow Knight, given to you by a character named "The Hunter." It tracks
                    the details of all the enemies you have defeated, and when you defeat more it gives you more details on said
                    enemy.
                </p>
            </div>
            <div className="button-container w-100 d-flex justify-content-evenly mt-5">
                <Button onClick={() => { navigate('/journal') }} className="button px-5 py-3">Journal</Button>
                <Button onClick={() => { navigate('/location-list') }} className="button px-5 py-3">Locations</Button>
            </div>
        </div>

    )
}

export default Home;