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
            <img src={props.avatar_url} className={cstyle.contributor_img}/>
            <p className={cstyle.profile}><a href={props.html_url} target='_blank'>{props.login}</a></p>
            <p className={cstyle.contribution_number}>{props.contributions} contributions</p>
            <a href={props.repos_url} target='_blank'><button>View repositories</button></a> {/* Ez a feature az 5. feladat része, nem fejlesztettem tovább*/}
        </div>
    </>
}

export default Contributor;