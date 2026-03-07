import type {
  QuoteRequest,
  CreateQuoteRequest,
} from "@/schemas/quote-request.schema";

export const quoteRequestPublicApi = {
  create: async (data: CreateQuoteRequest): Promise<QuoteRequest> => {
    const res = await fetch("/api/quote-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error((await res.json()).error);
    return (await res.json()).quoteRequest;
  },
};
