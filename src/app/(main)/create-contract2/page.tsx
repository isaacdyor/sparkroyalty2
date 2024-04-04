"use client";

import { ContractChat } from "@/components/create-contract2/chat";
import { ContractForm } from "@/components/create-contract2/form";
import { contractSchema } from "@/lib/validators/contractSchema2";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type ContractInput = z.infer<typeof contractSchema>;

const CreateContractPage: React.FC = () => {
  const form = useForm<ContractInput>({
    resolver: zodResolver(contractSchema),
    defaultValues: {
      cashPayout: 0,
      royaltyPayments: [{ percent: 0, payout: 0 }],
    },
  });

  return (
    <div className="flex justify-center py-4 sm:p-12 md:p-14 lg:h-[90vh] lg:px-20">
      <div className="flex w-full flex-col rounded-t-lg border-border sm:border lg:flex-row lg:rounded-lg">
        <ContractChat form={form} />
        <ContractForm form={form} />
      </div>
    </div>
  );
};

export default CreateContractPage;
