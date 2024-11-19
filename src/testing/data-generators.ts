/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    randCompanyName,
    randUserName,
    randEmail,
    randParagraph,
    randUuid,
    randPassword,
    randCatchPhrase,
} from "@ngneat/falso";

const generateUser = () => ({
    id: randUuid()+Math.random(),
    firstName: randUserName({ withAccents: false }),
    lastName: randUserName({ withAccents: false }),
    email: randEmail(),
    password: randPassword(),
    teamId: randUuid(),
    teamName: randCompanyName(),
    role: 'ADMIN',
    bio: randParagraph(),
    createdAt: Date.now(),
});

export const createUser =<T extends Partial<ReturnType<typeof generateUser>>>(overrides?:T)=>{
    return {...generateUser(),...overrides};
};

const generateTeam = ()=>({
    id:randUuid(),
    name:randCompanyName(),
    description:randParagraph(),
    createdAt:Date.now(),
})

export const createTeam = <T extends Partial<ReturnType<typeof generateTeam>>>(overrides?:T) => {
    return {...generateTeam(),...overrides}; // 生成一个团队
}

const generateDiscussion = ()=>({
    id:randUuid(),
    title:randCatchPhrase(),
    body:randParagraph(),
    createdAt:Date.now(),
}); // 生成一个讨论

export const createDiscussion = <T extends Partial<ReturnType<typeof generateDiscussion>>>(overrides?:T&{
    authorId:string;
    teamId:string;
})=>{
    return {...generateDiscussion(),...overrides};
}//

const generateComment = ()=>({
    id:randUuid(),
    body:randParagraph(),
    createdAt:Date.now(),
}); // 生成一个评论

export const createComment = <T extends Partial<ReturnType<typeof generateComment>>>(overrides?:T&{
    authorId:string;
    discussionId:string;
})=>{
    return {...generateComment(),...overrides};
} // 创建一个评论