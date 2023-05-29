import cstyle from '../syles/Contributor.module.css'

interface ContributorProps {
    login: string;
    id: number;
    avatarUrl: string;
    contributions: number;
    reposUrl: string;
    htmlUrl: string;
    key: string;
}

const Contributor = (props :ContributorProps) => {
    return <>
        <div className={cstyle.contributor_card}>
            <img src={props.avatarUrl} alt={`Profile pic of ${props.login}`} className={cstyle.contributor_img} />
            <p className={cstyle.profile}><a href={props.htmlUrl} target='_blank' rel="noreferrer">{props.login}</a></p>
            <p className={cstyle.contribution_number}>{props.contributions} contributions</p>
            <a href={props.reposUrl} target='_blank' rel="noreferrer"><button>View repositories</button></a> {/* Ez a feature az 5. feladat része, nem fejlesztettem tovább*/}
        </div>
    </>
}

export default Contributor;