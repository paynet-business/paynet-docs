// Example values for the request editor and the generated code samples (used by codeGenerator and apiTester).
import { SchemaObject } from '../types/api';

/** A parameter (name + schema) or a bare schema node. */
export interface ExampleSource {
  name?: string;
  type?: string;
  format?: string;
  example?: unknown;
  enum?: unknown[];
  items?: ExampleSource;
  schema?: ExampleSource;
}

// Generate example values based on parameter type and schema
export function generateExampleValue(param: ExampleSource, customValue?: string): unknown {
  // Use custom value if provided
  if (customValue !== undefined && customValue !== '') {
    // Try to parse as appropriate type
    const { type } = param.schema || param;
    switch (type) {
      case 'integer': {
        const intValue = parseInt(customValue);
        return isNaN(intValue) ? customValue : intValue;
      }
      case 'number': {
        const numValue = parseFloat(customValue);
        return isNaN(numValue) ? customValue : numValue;
      }
      case 'boolean':
        return customValue.toLowerCase() === 'true';
      default:
        return customValue;
    }
  }

  const { type, format, example, enum: enumValues, schema } = param.schema || param;

  if (example !== undefined) return example;
  if (enumValues && enumValues.length > 0) return enumValues[0];

  switch (type) {
    case 'string':
      if (format === 'date') return '2024-01-01';
      if (format === 'date-time') return '2024-01-01T00:00:00Z';
      if (format === 'email') return 'user@example.com';
      if (format === 'uuid') return '123e4567-e89b-12d3-a456-426614174000';
      if (param.name?.toLowerCase().includes('id')) return 'example_id';
      return `example_${param.name || 'value'}`;
    case 'integer':
      return 123;
    case 'number':
      return 123.45;
    case 'boolean':
      return true;
    case 'array':
      return [generateExampleValue({ schema: schema?.items || { type: 'string' } })];
    case 'object':
      return {};
    default:
      return `example_${param.name || 'value'}`;
  }
}

// Generate example object from JSON schema
export function generateExampleFromSchema(schema: SchemaObject): unknown {
  if (schema.example) return schema.example;

  switch (schema.type) {
    case 'object': {
      const obj: Record<string, unknown> = {};
      const properties = schema.properties;
      if (properties) {
        Object.keys(properties).forEach(key => {
          obj[key] = generateExampleFromSchema(properties[key]);
        });
      }
      return obj;
    }
    case 'array':
      return schema.items ? [generateExampleFromSchema(schema.items)] : [];
    case 'string':
      if (schema.format === 'date') return '2024-01-01';
      if (schema.format === 'date-time') return '2024-01-01T00:00:00Z';
      if (schema.format === 'email') return 'user@example.com';
      return schema.enum?.[0] || 'example_string';
    case 'integer':
      return schema.enum?.[0] || 123;
    case 'number':
      return schema.enum?.[0] || 123.45;
    case 'boolean':
      return true;
    default:
      return null;
  }
}
