const respond = (status: number, message: string) =>
  new Response(message, { status });

export const internalServerError = () => respond(500, "Internal Server Error");
export const notFound = () => respond(404, "Not Found");
