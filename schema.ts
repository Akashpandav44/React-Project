export interface JSONField {
  type: 'string' | 'number' | 'boolean';
  label: string;
  name: string;
  required: boolean;
  options?: string[]; // for select fields
}

export interface JSONSchema {
  title: string;
  description: string;
  fields: JSONField[];
}
