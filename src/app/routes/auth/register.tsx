import { useState } from "react";
import {useNavigate,useSearchParams}from 'react-router-dom';

import {AuthLayout} from "@/components/layouts/auth-layout";
import {paths} from "@/config/paths";
import {RegisterForm} from "@/features/auth/components/register-form";
import {useTeams} from "@/features/teams/api/get-teams";

export const RegisterRoute = ()=>{
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirectTo = searchParams.get('redirectTo');
    const [chooseTeam, setChooseTeam] = useState<boolean>(false);
    const teamsQuery = useTeams({
        queryConfig:{
            enabled:chooseTeam
        }
    });

    return (
        <AuthLayout title="Create an account">
            <RegisterForm
                onSuccess={()=>{
                    navigate(redirectTo?redirectTo:paths.app.dashboard.getHref(),{
                        replace:true
                    });
                }}
               chooseTeam={chooseTeam}
               setchooseTeam={()=>setChooseTeam(!chooseTeam)}
               teams={teamsQuery.data?.data ?? []}
            />
        </AuthLayout>
    );
}