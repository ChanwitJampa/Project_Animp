import users from '../assets/account.json'
export function signin(email,password){
    return new Promise((resolve,reject)=>{
        const foundUser =users.find(
            (user) =>user.accounts_user === email && user.accounts_pwd === password
        )
        setTimeout(()=>{
            if(foundUser){
                resolve(foundUser)
            }
            else{
                reject('Email or passwprd is invalid')
            }
        },500)
    })
}