import {FC} from 'react';

import cstyle from '../syles/Contributor.module.css'

interface ContributorProps{
    text?: string;
}

const Contributor:FC<ContributorProps> = (props)=>
{
    return <>
        <div className={cstyle.contributor_card}>
            {props.text}
        </div>
    </>
}

export default Contributor;