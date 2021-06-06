import React, { createContext, useState} from 'react'

const SpecificCampaignDetailContext = createContext();

function SpecificCampaignDetailProvider(props) {
    const [campaignDetail, setCampaignDetail] = useState({});
    console.log("SpecificCampaignDetailProvider")
    return (
        <SpecificCampaignDetailContext.Provider value={[campaignDetail, setCampaignDetail]}>
            {props.children}
        </SpecificCampaignDetailContext.Provider>
    )
}

export  {SpecificCampaignDetailContext,SpecificCampaignDetailProvider}
