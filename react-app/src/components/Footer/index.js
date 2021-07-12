import React from 'react';
import "./index.css";

const Footer = () => {

    return (
        <footer>
            <div className="footer-top">
                <div className="footer-middle">
                    <h6>About Feedit</h6>
                    <p>Feedit is a reddit clone based on food.</p>
                </div>
                <div className="footer-right">
                    <h6>Site by:</h6>
                    <p>
                        Nathan Mac <a href="https://github.com/nathan-mac">Github</a> <a href="https://www.linkedin.com/in/nathan-m-68b60582/">Linkedin</a>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
