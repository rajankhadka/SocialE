import React,{useEffect,useState} from 'react'

import { useHistory,useLocation,useParams } from "react-router-dom";


//redux
import { connect } from "react-redux";
import { template } from '../api/template/template';

const NAVIGATOR = window.navigator;

function Template001(props) {
    const params = useParams();

    // console.log('params', params);
    // console.log("location", location);
    // let searchParams1 = new URLSearchParams(window.location.href);
    // console.log(searchParams1.get(`http://localhost:3000/template/001?template_name`));

    // let template_name = searchParams1.get(`http://localhost:3000/template/001?template_name`);
    // console.log(template_name);

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
        fetch(template.templateIPtracing, {
            method: 'GET'
        })
            .then(response => {
                return (response.json());
            })
            .then(data => console.log(data))
            .catch(error => {
                console.log(error);
            });

        //validating target audience and campaign id and fetching template resources
        fetch(template.templateValidateandresource, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${window.localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                campaign_id: params.campaignid,
                target_user_uuid: params.uuid,
                template_name: params.tempNam
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.sucess) {
                    console.log(data.data);
                    setTemplateData(prevState => {
                        return {
                            ...prevState,
                            ...data.data
                        }
                    });
                    setError(false);
                } else {
                    setError(true);
                }
            })
            .catch(err => console.log(err));
        
    }, []);

    const [error, setError] = useState(false);

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

    let templatePage = null;
    if (error) {
        templatePage=<h1>Page Expired!!!</h1>
    } else {
        templatePage = (
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
    return templatePage
}

const mapStatetoProps = (state) => {
    return {
        templateReducers: state.templateReducers.templateName,
    }
}

export default connect(mapStatetoProps,undefined)(Template001);
