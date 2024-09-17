import {ActionGetResponse, ActionPostRequest, ActionPostResponse, ACTIONS_CORS_HEADERS } from "@solana/actions"
// import { headers } from "next/headers";
import {PublicKey, SystemProgram, Transaction} from "@solana/web3.js"


export async function GET(request: Request) {
  const responseBody : ActionGetResponse = {
    icon: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/Solana_logo.png/252px-Solana_logo.png",
    description: "This is a demo blink.",
    title: "Do Blink!",
    label: "Click Me!",
    error: {message: "This blink is not implemented yet!"},

  }
  const response = Response.json(responseBody, {headers: ACTIONS_CORS_HEADERS})
  return response
}

export async function Post(request: Request){
  const requestBody :ActionPostRequest = await request.json();
  const userPubkey = requestBody.account;
  console.log(userPubkey);


  const tx = new Transaction();
  tx.feePayer = new PublicKey(userPubkey);
  tx.recentBlockhash = SystemProgram.programId.toBase58();
  const serialTx = tx.serialize({requireAllSignatures: false, verifySignatures: false}).toString('base64');
  

  const response: ActionPostResponse ={
    transaction: serialTx,
    message: "Hello "+userPubkey,   
  };

  return Response.json(response,{headers: ACTIONS_CORS_HEADERS})
}

export async function OPTIONS(request: Request){
  return new Response(null,{headers: ACTIONS_CORS_HEADERS})
}
