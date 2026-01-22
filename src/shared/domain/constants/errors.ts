export const ERRORS = {
  AUTH: {
    INVALID_CREDENTIALS:
      'As runas de acesso estão incorretas. Verifique suas credenciais.',
    USER_NOT_FOUND: 'Usuário não encontrado nos registros do santuário.',
    UNAUTHORIZED: 'Você não tem permissão para atravessar este portal.',
    TOKEN_EXPIRED: 'Sua essência de acesso expirou. Por favor, renove o login.',
    TOKEN_INVALID: 'O token fornecido não é válido.',
  },
  PATIENT: {
    NOT_FOUND:
      'Não encontramos nenhum rastro deste protegido nas nossas crônicas.',
    ALREADY_EXISTS: 'Já existe um protegido registrado com este RA: {ra}',
    INVALID_RA: 'O RA fornecido não está em conformidade com as leis arcanas.',
    INVALID_STATUS: 'O status fornecido não é válido.',
  },
  PROFESSIONAL: {
    NOT_FOUND: 'Profissional não encontrado nos registros do santuário.',
    ALREADY_EXISTS: 'Já existe um profissional registrado com este email.',
    INVALID_SPECIALTY: 'A especialidade fornecida não é válida.',
  },
  WORKSHOP: {
    NOT_FOUND: 'Oficina não encontrada nos registros do santuário.',
    ALREADY_EXISTS: 'Já existe uma oficina com este título.',
    INVALID_STATUS: 'O status da oficina não é válido.',
    NO_CLASSES: 'A oficina deve ter pelo menos uma turma.',
  },
  EVOLUTION: {
    NOT_FOUND: 'Relatório de evolução não encontrado.',
    ALREADY_EXISTS:
      'Já existe um relatório de evolução para este paciente neste período.',
  },
  PIA: {
    NOT_FOUND: 'PIA não encontrado nos registros.',
    ALREADY_EXISTS: 'Já existe um PIA ativo para este paciente.',
    INVALID_STATUS: 'O status do PIA não é válido.',
  },
  SHARED: {
    INTERNAL_ERROR:
      'Houve uma oscilação na mana do servidor. Tente novamente mais tarde.',
    VALIDATION_ERROR:
      'Os dados fornecidos não estão em conformidade com as leis arcanas.',
    NOT_FOUND: 'Recurso não encontrado.',
    CONFLICT: 'Conflito detectado: o recurso já existe.',
    BAD_REQUEST: 'A requisição contém dados inválidos.',
    FORBIDDEN: 'Acesso negado a este recurso.',
  },
};
