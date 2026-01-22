export const SWAGGER_DOCS = {
  TAGS: {
    AUTH: 'auth',
    PATIENTS: 'patients',
    PROFESSIONALS: 'professionals',
    WORKSHOPS: 'workshops',
    EVOLUTIONS: 'evolutions',
    PIA: 'pia',
  },

  DESCRIPTIONS: {
    AUTH: {
      TAG: 'Authentication and access control',
      LOGIN: 'Authenticate user in the sanctuary',
    },
    PATIENTS: {
      TAG: 'Protected patients management',
      CREATE: 'Register new patient in the sanctuary',
      FIND_ALL: 'List patients with filters and pagination',
      FIND_ONE: 'Find patient by ID',
      UPDATE: 'Update patient information',
      DELETE: 'Remove patient from sanctuary',
    },
    PROFESSIONALS: {
      TAG: 'Professionals management',
      CREATE: 'Register new professional in the sanctuary',
      FIND_ALL: 'List professionals with filters and pagination',
      FIND_ONE: 'Find professional by ID',
      UPDATE: 'Update professional information',
      DELETE: 'Remove professional from sanctuary',
    },
    WORKSHOPS: {
      TAG: 'Workshops management',
      CREATE: 'Create new workshop in the sanctuary',
      FIND_ALL: 'List workshops with filters and pagination',
      FIND_ONE: 'Find workshop by ID',
      UPDATE: 'Update workshop information',
      DELETE: 'Remove workshop from sanctuary',
    },
    EVOLUTIONS: {
      TAG: 'Evolution reports',
      CREATE: 'Create new evolution report',
      FIND_ALL: 'List reports with filters and pagination',
      FIND_ONE: 'Find report by ID',
      UPDATE: 'Update evolution report',
      DELETE: 'Remove evolution report',
    },
    PIA: {
      TAG: 'Individualized Care Plans',
      CREATE: 'Create new PIA',
      FIND_ALL: 'List PIAs with filters and pagination',
      FIND_ONE: 'Find PIA by ID',
      UPDATE: 'Update PIA',
      DELETE: 'Remove PIA',
    },
  },

  RESPONSES: {
    SUCCESS: {
      200: 'Operation completed successfully',
      201: 'Resource created successfully',
      204: 'Resource removed successfully',
    },
    ERROR: {
      400: 'Invalid request',
      401: 'Not authenticated',
      403: 'Permission denied',
      404: 'Resource not found',
      409: 'Conflict - resource already exists',
      500: 'Internal server error',
    },
  },

  EXAMPLES: {
    AUTH: {
      EMAIL: 'master@centrotea.com',
      PASSWORD: 'password123',
    },
    PATIENT: {
      NAME: 'John Doe',
      RA: '123456',
      AGE: 25,
      BIRTH_DATE: '1999-01-15',
      PROTOCOL: 'PROT-2024-001',
      METADATA: {
        anamnesis: 'Anamnesis data',
        observations: 'General observations',
      },
    },
  },

  QUERIES: {
    CURSOR: 'Cursor for pagination',
    LIMIT: 'Results limit per page',
    NAME: 'Filter by name',
    EMAIL: 'Filter by email',
    STATUS: 'Filter by status',
    RA: 'Filter by RA',
    PROTOCOL: 'Filter by protocol',
  },
};

/**
 * Helper to create standardized error responses for Swagger documentation
 * @param module - The module name to be included in 404 and 409 error messages
 * @returns Object with error response configurations
 */
export const swaggerError = (module: string) => ({
  401: { status: 401, description: SWAGGER_DOCS.RESPONSES.ERROR[401] },
  403: { status: 403, description: SWAGGER_DOCS.RESPONSES.ERROR[403] },
  404: {
    status: 404,
    description: `${module} ${SWAGGER_DOCS.RESPONSES.ERROR[404].toLowerCase()}`,
  },
  409: {
    status: 409,
    description: `${module} ${SWAGGER_DOCS.RESPONSES.ERROR[409].toLowerCase()}`,
  },
});

/**
 * Helper to create standardized success responses for Swagger documentation
 * @param status - HTTP status code (200, 201, or 204)
 * @returns Object with success response configuration
 */
export const swaggerSuccess = (status: 200 | 201 | 204) => ({
  status,
  description: SWAGGER_DOCS.RESPONSES.SUCCESS[status],
});
