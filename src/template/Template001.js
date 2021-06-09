import React,{useEffect,useState} from 'react'

import { useHistory,useLocation } from "react-router-dom";


//redux
import { connect } from "react-redux";

const NAVIGATOR = window.navigator;

function Template001(props) {

    const location = useLocation();
    let searchParams1 = new URLSearchParams(window.location.href);
    // console.log(searchParams1.get(`http://localhost:3000/template/001?template_name`));

    let template_name = searchParams1.get(`http://localhost:3000/template/001?template_name`);
    console.log(template_name);

    //fetching all user agent
    const userAgentfunction = () => {

        const userAgentData = {
            appcodeName: NAVIGATOR.appCodeName,
            appName : NAVIGATOR.appName,
            appVersion : NAVIGATOR.appVersion,
            userAgent : NAVIGATOR.userAgent,
            userAgentData : NAVIGATOR.userAgentData,
            vendor : NAVIGATOR.vendor,
            platform :NAVIGATOR.platform,
            deviceMemory : NAVIGATOR.deviceMemory,
            
        }
        return userAgentData;
    }

    useEffect(() => {
        console.log(document.title);
        document.title = 'template 001'

        //user agent data
        console.log(userAgentfunction());

        //fetching ip address and location 
        fetch('https://ipgeolocation.abstractapi.com/v1/?api_key=c45b67797f8f462ebbe9d79f4f47a1c2', {
            method:'GET'
        })
        .then(response => {
            return (response.json());
        })
        .then(data => console.log(data))
        .catch(error => {
            console.log(error);
        });

        fetch(`http://127.0.0.1:8000/template/resource/retrieve/?template_name=${template_name}`, {
            
            
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                
            },
            
        })
            .then(response => response.json())
            .then(data => {
                document.title = data.data.template_name;
                document.getElementsByTagName("link")[0].href ="data:image/png;base64,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"
                console.log(data.data);
                setTemplateData({
                    bodyBackgroundcolor: data.data.bodyBackgroundcolor,
                    headerBackgroundColor:data.data.headerBackgroundColor,
                    headerFontColor:data.data.headerFontColor,
                    headerNav1:data.data.headerNav1,
                    headerNav2: data.data.headerNav2,
                    headerNav3:data.data.headerNav3,
                    bodyFontColor:data.data.bodyFontColor,
                    bodyButtonColor:data.data.bodyButtonColor
                });
            })
            .catch(err => console.log(err))
        
    }, [])

    const [templateData, setTemplateData] = useState({
        bodyBackgroundcolor: "#ffffff",
        headerBackgroundColor:"white",
        headerFontColor:"black",
        headerNav1:"Link 1",
        headerNav2: "Link 2",
        headerNav3:"Link 3",
        bodyFontColor:"black",
        bodyButtonColor:"green"


    });
    const temp001 = useHistory();

    return (
        <div>

            {/* //header */}
           <nav 
                style={{
                    backgroundColor: templateData.headerBackgroundColor,
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
                        <a href="https://www.google.com" style={{ textDecoration: "none", color: templateData.headerFontColor }}>{ templateData.headerNav1}</a>
                    </li>
                    <li  style={{marginLeft:"30px",marginRight:"30px"}}>
                        <a style={{ textDecoration: "none", color: templateData.headerFontColor }} href="https://www.google.com">{ templateData.headerNav2}</a>
                    </li>
                    <li style={{marginLeft:"30px",marginRight:"30px"}}>
                        <a style={{ textDecoration: "none", color: templateData.headerFontColor }} href="https://www.google.com">{ templateData.headerNav3}</a>
                    </li>
                </ul>
            </nav>

            {/* body */}

            <div
                style={{
                    color:templateData.bodyFontColor,
                    display: "flex",
                    height: "70vh",
                    alignItems: "center",
                    justifyContent: "space-around",
                    borderBottom: "1px solid black",
                    backgroundColor: templateData.bodyBackgroundcolor,
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
                                backgroundColor: templateData.bodyButtonColor,
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

const mapStatetoProps = (state) => {
    return {
        templateReducers: state.templateReducers.templateName,
    }
}

export default connect(mapStatetoProps,undefined)(Template001);
