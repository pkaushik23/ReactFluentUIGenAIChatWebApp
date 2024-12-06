//To send info to Database for user creation.
export type UserInfoDb = {
    azure_ad_id: string
    tenant_id: string
    email: string
    full_name: string
}

//This is complete info about user including the UserID that was generated in the Database
export type UserInfo = UserInfoDb & {
    user_id: string
}


//Zod for schema definiton.