"use client";

import { quoteRequestPublicApi } from "@/lib/api/quote-request.public.api";
import { CreateQuoteRequest } from "@/schemas/quote-request.schema";
import { useMutation } from "@tanstack/react-query";

export function useCreateQuoteRequest() {
  return useMutation({
    mutationFn: (data: CreateQuoteRequest) =>
      quoteRequestPublicApi.create(data),
  });
}
