import { NextResponse } from "next/server";


export function GET(request,{params}){
 const {userID,postId}=params
    return NextResponse.json(params)
}