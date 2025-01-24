"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { purchaseToken } from "../_store/_api";
import { cn } from "@/lib/utils";
import useAuthStore from "@/app/auth/_store";

interface TokenPurchasePopupProps {
  requiredTokens: string;
  userId: string;
  onSuccess?: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TokenPurchasePopup({ requiredTokens, userId, onSuccess, open, onOpenChange }: TokenPurchasePopupProps) {
  const [tokens, setTokens] = useState(requiredTokens);
  const [isLoading, setIsLoading] = useState(false);
  const { updateTokens } = useAuthStore();

  const handleTokenInput = (value: string) => {
    if (/^\d*\.?\d*$/.test(value)) {
      if (parseFloat(value) || value === "") {
        setTokens(value);
      }
    }
  };

  const handleTokenBlur = () => {
    const parsedValue = parseFloat(tokens);
    if (isNaN(parsedValue) || parsedValue < parseFloat(requiredTokens)) {
      setTokens(requiredTokens);
    } else {
      setTokens(parsedValue.toString());
    }
  };

  const handlePurchase = async () => {
    try {
      setIsLoading(true);
      const { data } = await purchaseToken({
        token: parseFloat(tokens),
        userId
      });
      console.log(data)
      if (data.success && !isNaN(parseFloat(data.user.tokens))) {
        console.log("Updating tokens")
        updateTokens(parseFloat(data.user.tokens))
      }
      onSuccess?.();
    } catch (error) {
      console.error("Failed to purchase tokens:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setTokens(requiredTokens);
  }, [requiredTokens]);

  const calculatedPrice = (parseFloat(tokens) / 3).toFixed(2);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Purchase Tokens</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="tokens">Amount of Tokens</Label>
            <div className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded-lg px-4 py-2">
              <button
                type="button"
                onClick={() => setTokens((prev) => Math.max(2, parseFloat(prev) - 1).toString())}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
              >
                -
              </button>
              <div className="text-gray-200 text-xl font-bold flex gap-1">
                <input
                  type="text"
                  value={tokens}
                  onChange={(e) => handleTokenInput(e.target.value)}
                  onBlur={handleTokenBlur}
                  className={cn("bg-transparent outline-none border-none rounded-lg")}
                  style={{ width: `${Math.min(tokens.toString().length)}ch` }}
                />
                <span>Tokens</span>
              </div>
              <button
                type="button"
                onClick={() => setTokens((prev) => Math.min(100, parseFloat(prev) + 1).toString())}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                +
              </button>
            </div>
            <p className="text-sm text-gray-400">You are short on tokens by {requiredTokens}</p>
            <p className="text-sm text-gray-400">Price: ${calculatedPrice} (1 Token = $0.50)</p>
          </div>

          <Button
            onClick={handlePurchase}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            {isLoading ? "Processing..." : `Purchase for $${calculatedPrice}`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
