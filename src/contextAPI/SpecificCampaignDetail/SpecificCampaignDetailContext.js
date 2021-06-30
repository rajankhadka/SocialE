import React, { createContext, useState} from 'react'

const SpecificCampaignDetailContext = createContext();

function SpecificCampaignDetailProvider(props) {
    const [campaignDetail, setCampaignDetail] = useState({});
    return (
        <SpecificCampaignDetailContext.Provider value={[campaignDetail, setCampaignDetail]}>
            {props.children}
        </SpecificCampaignDetailContext.Provider>
    )
}

export  {SpecificCampaignDetailContext,SpecificCampaignDetailProvider}
