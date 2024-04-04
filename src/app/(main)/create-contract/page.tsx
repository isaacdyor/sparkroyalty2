"use client";

import type { contractSchema } from "@/lib/validators/contractSchema";
import React from "react";
import type { z } from "zod";

export type ContractInput = z.infer<typeof contractSchema>;

const CreateContractPage: React.FC = () => {
  // const form = useForm<ContractInput>({
  //   resolver: zodResolver(contractSchema),
  //   defaultValues: {
  //     cashPayout: "",
  //     royaltyPayments: [{ percent: "", payout: "" }],
  //   },
  // });

  // const fieldArray = useFieldArray({
  //   control: form.control,
  //   name: "royaltyPayments",
  // });

  return (
    <div className="flex justify-center py-4 sm:p-12 md:p-14 lg:h-[90vh] lg:px-20">
      {/* <div className="flex w-full flex-col rounded-t-lg border-border sm:border lg:flex-row lg:rounded-lg">
        <ContractChat form={form} />
        <ContractParamaters form={form} fieldArray={fieldArray} />
      </div> */}
      <p>hello</p>
    </div>
  );
};

export default CreateContractPage;
