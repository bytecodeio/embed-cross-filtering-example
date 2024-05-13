import React, {ReactNode, useEffect} from 'react'
import { Drawer, IconButton, close } from '@looker/components';
import { Close } from '@styled-icons/material-outlined';

export default function CodeDrawer({content, path, drawerToggle, setDrawerToggle}) {
    const [iframeData, setIframeData] = React.useState('');
    useEffect(() => {
        const url = 'https://api.github.com/repos/bytecodeio/LookerEmbeddedReference-Frontend/contents/src/components/'+path;
        //fetch('https://api.github.com/repos/aaronmodic/jsonplaceholder/contents/db.json')
        fetch(url)
        .then((res) => res.json())
        .then((ghContent) => {
            const decodedString = 'data:text/javascript;base64,'+ghContent['content'];
            setIframeData(decodedString);
        }) 
    },[content])

    return(
        <Drawer width={800} isOpen={drawerToggle} content={
            <>
                <IconButton onClick={() => setDrawerToggle(false)} icon={<Close />} size="large" />
                <iframe frameBorder={0} width={'100%'} height={'100%'} src={iframeData}></iframe>
            </>
        } />          
    )
}