/** A node of an OpenAPI / JSON Schema document (only the fields the portal reads). */
export interface SchemaObject {
  $ref?: string;
  type?: string;
  format?: string;
  description?: string;
  properties?: Record<string, SchemaObject>;
  items?: SchemaObject;
  /** List of required property names; some old specs mark a single property with `required: true`. */
  required?: string[] | boolean;
  example?: unknown;
  enum?: unknown[];
}

/** One media type of a request body or response (e.g. `application/json`). */
export interface MediaTypeObject {
  schema?: SchemaObject;
  example?: unknown;
}

/** A response of an operation in the OpenAPI specification. */
export interface ResponseObject {
  description: string;
  content?: Record<string, MediaTypeObject>;
}

export interface OpenAPISpec {
  openapi: string;
  info: {
    title: string;
    version: string;
    description: string;
  };
  servers: Array<{
    url: string;
    description: string;
  }>;
  paths: {
    [path: string]: {
      [method: string]: {
        summary: string;
        description: string;
        parameters?: Array<{
          name: string;
          in: string;
          description: string;
          required: boolean;
          schema: {
            type: string;
          };
        }>;
        requestBody?: {
          description?: string;
          required?: boolean;
          content: {
            [mediaType: string]: MediaTypeObject;
          };
        };
        responses: {
          [statusCode: string]: ResponseObject;
        };
        tags: string[];
      };
    };
  };
  components: {
    schemas?: Record<string, SchemaObject>;
    securitySchemes: {
      [name: string]: {
        type: string;
        scheme?: string;
        bearerFormat?: string;
        in?: string;
        name?: string;
      };
    };
  };
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  endpoints: Endpoint[];
}

export interface Endpoint {
  id: string;
  method: string;
  path: string;
  summary: string;
  description: string;
  parameters?: Parameter[];
  responses: Record<string, ResponseObject>;
}

/** An endpoint together with the values typed in the portal's request editor. */
export interface EndpointRequestInput extends Endpoint {
  customParameterValues?: Record<string, string>;
  customRequestBody?: string;
}

export interface Parameter {
  name: string;
  in: string;
  description: string;
  required: boolean;
  type: string;
}