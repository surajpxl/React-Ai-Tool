import React, { useEffect, useState } from 'react';
import { checkHeading, replaceHeadingStars } from '../helper';

const Answer=({ ans, index, totalResult})=>{

    const [heading, setHeading] = useState(false);
    const [answer, setAnswer] = useState(ans);
    // console.log(index);
    

    useEffect(()=>{
    if(checkHeading(ans)){

        setHeading(true);
        setAnswer(replaceHeadingStars(ans));
    }
    }, [])


    return(
        <>
        {
        index==0 && totalResult>1?<span className='pt-2 text-xl block text-white'>{answer}</span>:
        heading?<span className={'pt-2 text-lg block text-white'}>{answer}</span>
        :<span className='pl-5 text-sm'>{answer}</span>
        
        }
        </>
    )
}

export default Answer;