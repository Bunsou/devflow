export class RequestError extends Error {
  statusCode: number;
  errors?: Record<string, string[]>;

  constructor(
    statusCode: number,
    message: string,
    errors?: Record<string, string[]>
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.name = "RequestError";
  }
}

export class ValidationError extends RequestError {
  constructor(fieldError: Record<string, string[]>) {
    const message = ValidationError.formatFieldError(fieldError);
    super(400, message, fieldError);
    this.name = "ValidationError";
    this.errors = fieldError;
  }

  static formatFieldError(errors: Record<string, string[]>): string {
    const formattedMessages = Object.entries(errors).map(
      ([field, messages]) => {
        const fieldName = field.charAt(0).toUpperCase() + field.slice(1);

        if (messages[0] === "Required") {
          return `${fieldName} is required`;
        } else {
          return messages.join(" and ");
        }
      }
    );

    return formattedMessages.join(", ");
  }
}

export class NotFoundError extends RequestError {
  constructor(resource: string) {
    super(404, `${resource} not found`);
    this.name = "NotFoundError";
  }
}

export class ForbiddenError extends RequestError {
  constructor(message: string) {
    super(403, `You do not have permission to access this ${message}`);
    this.name = "ForbiddenError";
  }
}

export class UnauthorizedError extends RequestError {
  constructor(message: string) {
    super(401, `You are not authorized to access this ${message}`);
    this.name = "UnauthorizedError";
  }
}
