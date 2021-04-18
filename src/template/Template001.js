import React from 'react'

import { useHistory } from "react-router-dom";

function Template001(props) {

    const temp001 = useHistory();

    return (
        <div>

            {/* //header */}
           <nav 
                style={{
                    backgroundColor: "white",
                    boxShadow: "0px 5px 15px 5px rgba(0, 0, 0, 0.24)",
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                    height: "70px",
                    
                }} 
            >
                <a href="https://www.google.com">
                    <img 
                        src="https://s.rfi.fr/media/display/b2309eec-0ec9-11ea-b521-005056a9aa4d/w:1280/p:1x1/bird-2695678_1920.jpg" 
                        alt="logo"
                        style={{
                            width: "100px",
                            height: "40px",
                            objectFit: 'fill',
                            marginLeft:"10px"
                        }} 
                            
                    />
                </a>
                <ul 
                    style={{
                        display: "flex",
                        listStyleType: "none",
                        
                        flex: 1,
                        justifyContent:"flex-end"
                    }}
                >
                    <li  style={{marginLeft:"30px",marginRight:"30px",}}>
                        <a  href="https://www.google.com" style={{ textDecoration:"none",color:"blue" }}>Link 1</a>
                    </li>
                    <li  style={{marginLeft:"30px",marginRight:"30px"}}>
                        <a  style={{ textDecoration:"none",color:"blue"  }} href="https://www.google.com">Link 2</a>
                    </li>
                    <li style={{marginLeft:"30px",marginRight:"30px"}}>
                        <a style={{textDecoration:"none",color:"blue" }} href="https://www.google.com">Link 3</a>
                    </li>
                </ul>
            </nav>

            {/* body */}

            <div
                style={{
                    display: "flex",
                    height: "70vh",
                    alignItems: "center",
                    justifyContent: "space-around",
                    borderBottom: "1px solid black",
                    // backgroundColor:"red",
                    color:"red",
                }}
            >
                <div style={{ flex: 0.4 }}>
                    <h3>Brand / Logo</h3>
                    <p>When using the .navbar-brand class on images, Bootstrap 4 will automatically style the image to fit the
                        navbar.</p>
                </div>

                <div style={{ flex: 0.4 }}>
                    <form>
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="Enter the email" 
                            style={{
                                width: "100%",
                                padding: "12px 20px",
                                margin: "5px 0",
                                boxSizing: "border-box",
                                height: "40px",
                                marginBottom: "5px",
                            }}
                        />

                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="enter the password"
                            style={{
                                width: "100%",
                                padding: "12px 20px",
                                margin: "5px 0",
                                boxSizing: "border-box",
                                height: "40px",
                                marginBottom: "5px",
                            }}
                        />
                        <button 
                            style={{
                                backgroundColor: "#4caf50",
                                border: "none",
                                color: "white",
                                textAlign: "center",
                                textDecoration: "none",
                                display: "block",
                                fontSize: "16px",
                                margin: "4px 2px",
                                cursor: "pointer",
                                width: "100%",
                                height: "40px",
                            
                            }}
                            

                        >
                            Login
                        </button>
                    </form>

                </div>
            </div>
            
            {/* footer */}
            <div >
                footer
            </div>
        </div>
    )
}

export default Template001;
