import { useEffect, useState } from 'react';    

import MarkdownPreview from '@uiw/react-markdown-preview';

const CourseViewContent = ({ courseFileSelectedAsProps }: { courseFileSelectedAsProps: string }) =>{
    
    const [markdownContent, setMarkdownContent] = useState("");

    const getmarkdownsrc = async () => {
        const req = await fetch(courseFileSelectedAsProps);
        const res = await req.text();

        setMarkdownContent(res);
    }

    useEffect(()=>{
        getmarkdownsrc();
    }, [courseFileSelectedAsProps])

    return(
        <>
            
            <div className='padding--small'>
                
                <MarkdownPreview source={markdownContent} className='padding--large body-bg-dark border--smoother' />

            </div>

        </>
    );

}

export default CourseViewContent;