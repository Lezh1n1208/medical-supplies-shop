export function assertNoError(error: { message: string } | null): void {
  if (error) throw new Error(error.message);
}
