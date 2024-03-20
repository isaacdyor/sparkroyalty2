"use client";

import { ContractChat } from "@/components/create-contract/chat";
import { ContractParamaters } from "@/components/create-contract/paramters";
import { contractSchema } from "@/lib/validators/contractSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

export type ContractInput = z.infer<typeof contractSchema>;

const CreateContractPage: React.FC = () => {
  const form = useForm<ContractInput>({
    resolver: zodResolver(contractSchema),
    defaultValues: {
      cashPayout: "",
      royaltyPayments: [{ percent: "", payout: "" }],
    },
  });

  const fieldArray = useFieldArray({
    control: form.control,
    name: "royaltyPayments",
  });

  return (
    <div className="flex h-[90vh] justify-center  px-4 py-4 sm:py-12 md:p-14 lg:px-20">
      <div className="flex w-full rounded-lg border border-border ">
        <ContractChat form={form} />
        <ContractParamaters form={form} fieldArray={fieldArray} />
      </div>
    </div>
  );
};

export default CreateContractPage;
