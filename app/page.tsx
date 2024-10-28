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
  const [rate, setRate] = useState(0.01);
  const [address, setAddress] = useState("");
  const [swap, setSwap] = useState('pump');

  let publicKey;
  let sendTransaction;


  async function testWallet() {
    // const { publicKey, sendTransaction } = useWallet();
    // console.log(publicKey)
  }
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Make&nbsp;</span>
        <span className={title({ color: "violet" })}>beautiful&nbsp;</span>
        <br />
        <span className={title()}>
          websites regardless of your design experience.
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern React UI library.
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={siteConfig.links.docs}
        >
          Documentation
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>

      <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            Get started by editing <Code color="primary">app/page.tsx</Code>
          </span>
        </Snippet>
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
        <div className="flex flex-col">
          <p className="text-md">Funproxy</p>
          <p className="text-small text-default-500">funproxy.site</p>
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
          <Input type="text" variant={'underlined'} label="Token Address"placeholder="Enter the token address" />
          <Input type="number" variant={'underlined'} label="Referral rate" placeholder="Enter your referral rate , 1% ~ 3%" />
        </div>
        <div  className="flex w-full ">
          <Input  style={{width:"40%"}} type="text" variant={'underlined'} label="Referral Address" placeholder="Enter your solana wallet address" />
          <WalletMultiButton style={{width:"100%"}}></WalletMultiButton>
        </div>
          <br></br>

      </CardBody>
      <Divider/>
      <CardFooter>
      <Button style={{width:'100%'}}>
            Generate Link
          </Button>
      </CardFooter>
    </Card>
    {/* <ConnectWallet /> */}
    
    </section>
  );
}
