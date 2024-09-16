import React from 'react';
import Call from "../../attributes/Call/Call";

const CallMedia = ({sessionId}) => {
    return (
        <Call roomId={"__"} sessionId={sessionId}/>
    );
};

export default CallMedia;