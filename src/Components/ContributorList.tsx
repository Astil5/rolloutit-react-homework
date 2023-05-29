import { useState, useEffect, useCallback } from 'react';
import { Octokit } from "octokit";

import ContributorComp from './Contributor';

import clstyle from '../syles/ContributorList.module.css'

const octokit = new Octokit({
    userAgent: "rolloutit_github/v1.0.0"
})

interface ContributorListProps {
    text?: string;
    perPageLimit: number;
}

type Contributor = {
    login: string;
    id: number;
    avatarUrl: string;
    contributions: number;
    reposUrl: string;
    htmlUrl: string;
};

const ContributorList = (props: ContributorListProps) => {

    const [pageCounter, setPageCounter] = useState(1);
    const [contributors, setContributors] = useState<Array<Contributor>>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    //Make Request
    const getContributors = useCallback(async function (pageNumber: number) { // Külön service réteg-be tegyem bele
        /*
        A service fájlban lévő függvényt lehessen más repo-ra is meghívni (Generizálás)
        Objektum a paramétere a függvénynek
        */
        try {

            let response = await octokit.request('GET /repos/{owner}/{repo}/contributors', {
                owner: 'angular',
                repo: 'angular',
                per_page: props.perPageLimit,
                page: pageNumber,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })
            setContributors(contributors => contributors.concat(response.data.map(row => {
                let contributor: Contributor = {
                    login: row.login!, id: row.id as number,
                    avatarUrl: row.avatar_url as string, contributions: row.contributions as number,
                    reposUrl: row.repos_url as string, htmlUrl: row.html_url as string
                };
                return contributor
            })
            ));
        }
        catch (error: unknown) { // kell visszajelzés a user felé
            console.error(error)
            return undefined
        }
    }, [props.perPageLimit])

    useEffect(() => {
        setIsLoading(true)
        getContributors(pageCounter)
        setIsLoading(false)
    }, [pageCounter, getContributors])


    const handleScroll = (target: HTMLDivElement): void => {
        if (isLoading)
            return

        const bottom = Math.floor(target.scrollHeight - target.scrollTop) === Math.floor(target.clientHeight);
        if (bottom) {
            setPageCounter(pageCounter + 1)
        }
    }

    return <>
        <div className={clstyle.text}><h1>{props.text}</h1></div>
        <div className={clstyle.grid_list} onScroll={(e: any) => handleScroll(e.target)}>
            {
                contributors.map((contributor, key: number): JSX.Element => {
                    return <ContributorComp login={contributor.login} id={contributor.id}
                        avatarUrl={contributor.avatarUrl} contributions={contributor.contributions}
                        reposUrl={contributor.reposUrl} htmlUrl={contributor.htmlUrl} key={contributor.login} />

                })}
            {
                isLoading ? "Loading data..." : ""
            }
        </div>
    </>
}

export default ContributorList;