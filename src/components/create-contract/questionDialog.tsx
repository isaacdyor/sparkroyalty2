import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import type { ApplicationInput } from "../venture/detail/pending/applyButton";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { getParams } from "./actions";
import { CompletionType } from "./chat";
import { UseFormReturn } from "react-hook-form";
import { ContractInput } from "@/app/(main)/create-contract/page";

type ApplicationDialogProps = {
  previousPrompt: string;
  showQuestion: boolean;
  setShowQuestion: React.Dispatch<React.SetStateAction<boolean>>;
  question: string | null;
  form: UseFormReturn<ContractInput>;
};

export const QuestionDialog: React.FC<ApplicationDialogProps> = ({
  previousPrompt,
  showQuestion,
  setShowQuestion,
  question,
  form,
}) => {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");

  const onSubmit = async () => {
    let prompt =
      "previous information: " +
      previousPrompt +
      ". You then asked the question: " +
      question +
      ". And they responded: " +
      answer;

    setLoading(true);
    const response = await getParams(prompt);
    setLoading(false);
    setShowQuestion(false);
    const data: CompletionType = JSON.parse(
      response.choices[0]?.message?.content ?? "",
    );

    form.setValue("royaltyPayments", data.royaltyPayments);
    form.setValue("cashPayout", data.cashPayout);
  };
  return (
    <Dialog open={showQuestion} onOpenChange={setShowQuestion}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>More Info Needed</DialogTitle>
          {question ? (
            <DialogDescription>{question}</DialogDescription>
          ) : (
            <Loader2 className="animate-spin" />
          )}
        </DialogHeader>
        <Textarea
          className="h-80"
          placeholder="Type your message here."
          onChange={(e) => setAnswer(e.target.value)}
        />
        <Button onClick={onSubmit} variant="secondary">
          {loading ? <Loader2 className="animate-spin" /> : <p>Save</p>}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
