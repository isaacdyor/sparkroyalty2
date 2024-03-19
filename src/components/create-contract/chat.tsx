"use client";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { getParams, getQuestion } from "./actions";
import {
  UseFieldArrayReturn,
  UseFormReturn,
  UseFormSetValue,
  useFieldArray,
} from "react-hook-form";
import { ContractInput } from "@/app/(main)/create-contract/page";
import { Loader2 } from "lucide-react";
import { QuestionDialog } from "./questionDialog";
import { removeQuotesAndNewLines } from "@/lib/utils";

export type CompletionType = {
  cashPayout: string;
  royaltyPayments: RoyaltyPayments[];
};

type RoyaltyPayments = {
  percent: string;
  payout: string;
};

export const ContractChat: React.FC<{
  form: UseFormReturn<ContractInput>;
}> = ({ form }) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [question, setQuestion] = useState<string | null>(null);

  const onClick = async () => {
    setLoading(true);
    const response = await getParams(prompt);
    setLoading(false);
    const data: CompletionType = JSON.parse(
      response.choices[0]?.message?.content ?? "",
    );
    data.royaltyPayments.forEach((payment) => {
      if (payment.payout == "0" || payment.percent == "0") {
        askQuestion(data.royaltyPayments);
      }
    });
    form.setValue("royaltyPayments", data.royaltyPayments);
    form.setValue("cashPayout", data.cashPayout);
  };

  const askQuestion = async (payments: RoyaltyPayments[]) => {
    setShowQuestion(true);
    setQuestion(null);
    let questionPrompt = "";
    payments.forEach((payment, index) => {
      if (payment.payout == "0") {
        questionPrompt += `Missing payout information for royalty payment ${
          index + 1
        }. `;
      }
      if (payment.percent == "0") {
        questionPrompt += `Missing percent information for royalty payment ${
          index + 1
        }. `;
      }
    });
    const response = await getQuestion(questionPrompt);
    const unparsedQuestion = JSON.stringify(
      response.choices[0]?.message.content ?? "",
    );
    const parsedQuestion = removeQuotesAndNewLines(unparsedQuestion);
    setQuestion(parsedQuestion);
  };

  return (
    <div className="flex w-full flex-col gap-8 border-r border-border p-8">
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold">
          Describe your contract in English
        </h1>
        <p className="text-muted-foreground">
          And the contract will be generated automatically
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <Textarea
          className="h-80"
          placeholder="Type your message here."
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button onClick={onClick} variant="secondary">
          {loading ? <Loader2 className="animate-spin" /> : <p>Generate</p>}
        </Button>
      </div>
      <QuestionDialog
        form={form}
        previousPrompt={prompt}
        showQuestion={showQuestion}
        setShowQuestion={setShowQuestion}
        question={question}
      />
    </div>
  );
};
