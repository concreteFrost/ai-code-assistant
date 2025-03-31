export const codeAssistantSchema: any = {
  type: "object",
  properties: {
    header: {
      type: "string",
    },
    code: {
      type: "string",
    },
    errors: {
      type: "array",
      items: { type: "string" },
    },
    suggestions: {
      type: "array",
      items: { type: "string" },
    },
    reject: {
      type: "string",
    },
  },
  required: ["header", "code", "errors", "suggestions", "reject"],
  strict: true,
};
