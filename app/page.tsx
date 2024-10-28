"use client";

import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";

import {Image} from "@nextui-org/image"

import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from  "@nextui-org/dropdown"

import { Button } from "@nextui-org/button"

import {Divider} from "@nextui-org/divider"

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {ConnectWallet} from"@/components/connectwallet"
// import nacl from "tweetnacl"; 
import React, { FC, useCallback, useState, useEffect } from 'react';

import { Input } from "@nextui-org/input";
import { Router } from "next/router";

export default function Home() {
  const swapItem = [
    {
      key: "pump",
      label: "pump",
    },
    {
      key: "raydium",
      label: "raydium",
    }
  ]

  const [token, setToken] = useState("");
  const [rate, setRate] = useState("0.01");
  const [address, setAddress] = useState("");
  const [swap, setSwap] = useState('pump');

  const [isGenerated, setIsGenerated] = useState(false);

  const [finalLink, setFinalLink] = useState("");
  const [twitterLink , setTwitterLink] = useState("")


const { publicKey } = useWallet();
function sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function generateLink() {
  console.log(publicKey,publicKey != null)
  let add = ""
    if(publicKey != null)
    {
      add = publicKey.toBase58()
    }else{
      add = address
    }
  let tk = ""
    if(token)
    {
      tk = token
    }else{
      tk = "Eq1Wrk62j2F2tLf9XfdBssYJVr5k8oLJx3pqEL1rpump"
    }
  let rt = 0.01
  if(Number(rate)&&Number(rate)>=0&&Number(rate)<3)
  {
    rt = Number(rate);
  }

  let final = ""
  if(swap == "pump")
  {
    final = `https://dial.to/?action=solana-action:https://funproxy.site/api/pump/${tk}:${add}:${rt}`
    setFinalLink(
      final
    )
    setIsGenerated(true)
  }

  if(swap == "raydium")
  {
    final = `https://dial.to/?action=solana-action:https://funproxy.site/api/raydium/${tk}:${add}:${rt}`
    setFinalLink(
      final
    )
    setIsGenerated(true)
  }
  
  setTwitterLink(`https://twitter.com/intent/tweet?text= 🚀Pump it ! : ${encodeURI(final)}`)
    console.log(
      token,
      rate,
      add,
      swap
    )
  }
  useEffect(() => {
  }, [])

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Share Token on &nbsp;</span>
        <br></br>
        <span className={title({ color: "violet" })}>Pump&nbsp;</span>
        <span className={title()}>or  <span className={title({ color: "violet" })}>Raydiun&nbsp;</span>
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Simply via  <span className={title({ color: "violet" })}>Blinks&nbsp;</span>
        </div>
      </div>
      <Card className="max-w-[800px] w-[60%]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="./logo.png"
          width={40}
        />


        <div style={{width:"100%" , display:"flex"}}>
          <div className="flex flex-col" style={{width:"70%"}}>
            <p className="text-md">Funproxy</p>
            <p className="text-small text-default-500">funproxy.site</p>
          </div>
        <div style={{paddingRight:"0px"}}>
              {/* <WalletMultiButton></WalletMultiButton> */}
              {/* <WalletMultiButton> </WalletMultiButton> */}
              <WalletMultiButton className="btn btn-ghost" />
              {/* <ConnectWallet onUseWalletClick={onUseWalletClick} /> */}
        </div>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <h3>Generate your referral link for tokens you pump !</h3>
          <br></br>
          <Dropdown>
              <DropdownTrigger>
                <Button 
                  variant="bordered" 
                >
                  {swap}
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="Action event example" 
                onAction={(key) => setSwap(key)}
              >
                <DropdownItem key="pump">pump</DropdownItem>
                <DropdownItem key="raydium">raydium</DropdownItem>
              </DropdownMenu>
            </Dropdown>
        <div  className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <Input type="text" variant={'underlined'} label="Token Address"placeholder="Enter the token address"
           onChange={e => { setToken(e.currentTarget.value); }}
          />
          <Input type="number" variant={'underlined'} label="Referral rate" placeholder="Enter your referral rate , 1% ~ 3%"
           onChange={e => { setRate(e.currentTarget.value); }}
          />
        </div>
        <div  className="flex w-full ">
          <Input type="text" variant={'underlined'} label="Referral Address" placeholder="Enter your solana wallet address" value={publicKey?.toBase58()}
            onChange={e => { setAddress(e.currentTarget.value); }}
          />
         
        </div>
          <br></br>

      </CardBody>
      <Divider/>
      <CardFooter>
      <Button style={{width:'100%'}} onClick={generateLink}>
            Generate Link
          </Button>
      </CardFooter>
    </Card>
    {/* <ConnectWallet /> */}
    

    {
      isGenerated ? 
      <div className="mt-8">
      <Snippet hideCopyButton hideSymbol variant="bordered">
        <span>
          {finalLink}
        </span>
      </Snippet>
      <div style={{width:'100%' ,textAlign:"center"}}>
      <Button variant="bordered" style={{width:"50%"}} onClick={() => {navigator.clipboard.writeText(finalLink)}} >Copy</Button>
      <Button variant="bordered" style={{width:"50%"}} onClick={
        location.href = twitterLink
      } >Share on X!</Button>

      </div>

      </div>
    : null

    }



    </section>
  );
}
