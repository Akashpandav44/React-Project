import { z } from 'zod';
import { JSONSchema } from '../types/schema';

// Define validation for each field type
const JSONFieldSchema = z.object({
  type: z.enum(['string', 'number', 'boolean']),
  label: z.string(),
  name: z.string(),
  required: z.boolean(),
  options: z.array(z.string()).optional(),
});

// Define the schema for the entire JSON object
export const JSONSchemaValidator = z.object({
  title: z.string(),
  description: z.string(),
  fields: z.array(JSONFieldSchema),
});

// Validate a JSON schema
export const validateJSONSchema = (json: unknown) => {
  try {
    return JSONSchemaValidator.parse(json);
  } catch (error) {
    return error.errors;
  }
};
