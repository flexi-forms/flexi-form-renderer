import { z } from 'zod';

export const VisibleIfRegex = /\{([^}]+)\}\s*=\s*'([^']+)'/;

export const spanMap = value => {
  switch (value) {
    case '1/12': {
      return 'calc(100%/12 - 1px)';
    }
    case '2/12': {
      return 'calc(100%/6 - 2px)';
    }
    case '3/12': {
      return 'calc(100%/4 - 3px)';
    }
    case '4/12': {
      return 'calc((100%/3) - 8px)';
    }
    case '5/12': {
      return 'calc(500%/12 - 5px)';
    }
    case '6/12': {
      return 'calc(100%/2 - 6px)';
    }
    case '7/12': {
      return 'calc(700%/12 - 7px)';
    }
    case '8/12': {
      return 'calc(200%/3 - 8px)';
    }
    case '9/12': {
      return 'calc(300%/4 - 9px)';
    }
    case '10/12': {
      return 'calc(500%/6 - 10px)';
    }
    case '11/12': {
      return 'calc(1100%/12 - 11px)';
    }
    default: {
      return '100%';
    }
  }
};

export const buildValidationSchema = data => {
  const schema = {};

  const createSchema = datum =>
    datum?.forEach(element => {
      switch (element?.type) {
        case 'panel': {
          if (element.elements && element.elements.length > 0) createSchema(element?.elements);
          break;
        }
        case 'text':
        case 'number':
        case 'date':
        case 'radiogroup':
        case 'dropdown':
          if (element.isRequired) {
            schema[element.name] = z.string({
              required_error: `${element.title ?? element.name} is required.`
            });
          } else {
            schema[element.name] = z.string().optional();
          }
          break;
        case 'boolean':
          if (element.isRequired) {
            schema[element.name] = z.boolean({
              required_error: `${element.title ?? element.name} is required.`
            });
          } else {
            schema[element.name] = z.boolean().optional();
          }
          return;
        case 'checkbox':
          schema[element.name] = z.array(z.string());
          break;
        case 'file':
          schema[element.name] = z.any();
          break;
        default:
          break;
      }
      if (element.isRequired) {
        schema[element.name] = schema[element.name].required(
          `${element.title ?? element.name} is required.`,
        );
      }
      if (element.validators) {
        element.validators.forEach(validator => {
          if (validator.type === 'regex') {
            schema[element.name] = schema[element.name].matches(
              new RegExp(validator.regex),
              validator.text,
            );
          }
        });
      }
    });

  createSchema(data?.elements);

  return z.object(schema);
};
