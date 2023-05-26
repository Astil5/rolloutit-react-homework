import {FC, useState, useEffect, UIEvent} from 'react';
import { Octokit} from "octokit";

import Contributor from './Contributor';

import clstyle from '../syles/ContributorList.module.css'
import { JsxElement } from 'typescript';

const octokit = new Octokit({
    userAgent: "rolloutit_github/v1.0.0"
  })

  

interface ContributorListProps{
    text?: string;
    perPageLimit: number;
}

interface contributorType{
    login: string;
    id: number;
    avatar_url: string;
    contributions: number;
    repos_url: string;
    html_url: string;
}

const ContributorList:FC<ContributorListProps> = (props)=>
{

    let pageCounter = 1
    const [contributors, setContributors] = useState<Array<contributorType>>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    //Make Request
    async function getContributors(pageNumber: number) {
        try{
            
            let response = await octokit.request('GET /repos/{owner}/{repo}/contributors', {
                owner: 'angular',
                repo: 'angular',
                per_page: props.perPageLimit,
                page: pageNumber,
                headers: {
                'X-GitHub-Api-Version': '2022-11-28'
                }
            }).then()
            console.log(response)
            response.data.forEach((_contributor: any):void =>{
                const contributor: contributorType = { login: _contributor.login, id: _contributor.id,
                    avatar_url: _contributor.avatar_url, contributions: _contributor.contributions,
                    repos_url: _contributor.repos_url, html_url: _contributor.html_url}
                setContributors(contributors => [...contributors, contributor ]);
            })
            setIsLoading(false) 
            return response.data
        }
        catch(error: any){
            console.log(error.message)
            return undefined
        }
    }

    useEffect(() => {
        setIsLoading(true)
        getContributors(pageCounter)
       
      },[])
      
    
    const handleScroll = (target: any ): void =>{
        if(isLoading)
        {
            return
        }
        else{
            const bottom = target.scrollHeight - target.scrollTop === target.clientHeight;
        
            if (bottom) { 
                console.log("Bottom reached")

                pageCounter+=1
                setIsLoading(true)
                getContributors(pageCounter)
            }
        }
        
    }  

    return <>
        <div className={clstyle.text}><h1>{props.text}</h1></div>
        <div className={clstyle.grid_list} onScroll={(e: any) => handleScroll(e.target)}>
            {isLoading? "Loading data..." : 
                contributors.map((contributor : contributorType, key: number): JSX.Element =>{
                    return <Contributor login={contributor.login} id={contributor.id} 
                        avatar_url={contributor.avatar_url} contributions={contributor.contributions} 
                        repos_url={contributor.repos_url} html_url={contributor.html_url} key={key} />

                })
            }
        </div>
    </>
}

export default ContributorList;