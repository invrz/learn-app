import { useEffect, useState } from 'react';    

import MarkdownPreview from '@uiw/react-markdown-preview';

const CourseViewContent = () =>{
    
    const [markdownContent, setMarkdownContent] = useState("");

    const getmarkdownsrc = async () => {
        const req = await fetch("https://raw.githubusercontent.com/invrz/learn-backend-postgres-express/refs/heads/main/1.%20getting-started.md");
        const res = await req.text();

        setMarkdownContent(res);
    }

    useEffect(()=>{
        getmarkdownsrc();
    }, [])

    return(
        <>
            
            <div className='padding--small'>
                
                <MarkdownPreview source={markdownContent} className='padding--small body-bg-dark border--smoother' />

            </div>

        </>
    );

}

export default CourseViewContent;