import { NextResponse } from "next/server";

export function DELETE(request,{params}){
    console.log(params)
    const userId=params.userId
    console.log(userId)
    return NextResponse.json({
        message:"delete"
    })
}