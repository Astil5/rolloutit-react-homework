import {FC} from 'react';

import cstyle from '../syles/Contributor.module.css'

interface ContributorProps{
    login: string;
    id: number;
    avatar_url: string;
    contributions: number;
    repos_url: string;
    html_url: string;
    key: number;
}

const Contributor:FC<ContributorProps> = (props)=>
{
    return <>
        <div className={cstyle.contributor_card}>
            {props.login}
        </div>
    </>
}

export default Contributor;