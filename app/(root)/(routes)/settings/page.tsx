"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useAction } from "convex/react";
import { Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const SettingsPage = () => {
  // const payment = useAction(api.stripe.pay);
  // const router = useRouter();

  // const handlePay = async () => {
  // const url = await payment();
  // router.push(url);
  // };

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center  gap-x-5">
        <Settings className="h-6 w-6 md:w-8 md:h-8 text-muted-foreground" />
        <h2 className="text-2xl md:text-3xl font-bold">Settings</h2>
      </div>
      {/* <Button onClick={handlePay}>Subscribe</Button> */}
    </div>
  );
};

export default SettingsPage;
