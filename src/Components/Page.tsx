import {FC} from 'react';
import ContributorList from './ContributorList';

interface PageProps{
    foo?: number;
    bar?: string;
}

const Page:FC<PageProps> = (props)=>
{
    return  <>
                {/*Hátha több elemünk is lesz*/}
                <ContributorList text='Top contributors for Angular' perPageLimit={40}/>
            </>
}

export default Page;