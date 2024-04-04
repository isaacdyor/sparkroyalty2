"use client";

import type { contractSchema } from "@/lib/validators/contractSchema2";
import React from "react";
import type { z } from "zod";

export type ContractInput = z.infer<typeof contractSchema>;

const CreateContractPage: React.FC = () => {
  // const form = useForm<ContractInput>({
  //   resolver: zodResolver(contractSchema),
  //   defaultValues: {
  //     cashPayout: 0,
  //     royaltyPayments: [{ percent: 0, payout: 0 }],
  //   },
  // });

  return (
    <div className="flex justify-center py-4 sm:p-12 md:p-14 lg:h-[90vh] lg:px-20">
      {/* <div className="flex w-full flex-col rounded-t-lg border-border sm:border lg:flex-row lg:rounded-lg">
        <ContractChat form={form} />
        <ContractForm form={form} />
      </div> */}
      <p>hello</p>
    </div>
  );
};

export default CreateContractPage;
