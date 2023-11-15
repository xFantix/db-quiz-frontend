import { ReactNode } from "react";
import { toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosError } from "axios";

const DEFAULT_ERROR = "Something went wrong.";
const ERROR_TITLE = "ERROR";

enum HttpStatusCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
}

interface NotificationConfig extends ToastOptions {
  undo: () => void;
}

const showSuccess = (message: ReactNode, config?: NotificationConfig) => {
  toast.success(message, config);
};

const showError = (message: ReactNode, config?: ToastOptions) => {
  toast.error(message, config);
};

function isObject(obj: unknown): boolean {
  return obj ? typeof obj === "function" || typeof obj === "object" : false;
}

const isAxiosError = (error: any): error is AxiosError => {
  return isObject(error) && (error as AxiosError).isAxiosError === true;
};

const showErrors = (error: unknown, config?: ToastOptions) => {
  if (isAxiosError(error)) {
    if (error?.response?.status !== HttpStatusCode.UNAUTHORIZED) {
      const errorData = error?.response?.data;
      if (errorData instanceof Object) {
        const errorArray = flatterError(errorData, 10);

        if (Array.isArray(errorArray)) {
          errorArray.forEach((message) => {
            if (typeof message === "string") {
              toast.error(ERROR_TITLE, config);
            }
          });
        } else {
          toast.error(ERROR_TITLE, config);
        }
      } else {
        toast.error(ERROR_TITLE, config);
      }
    }
  } else {
    toast.error(ERROR_TITLE, config);
  }
};

export const toastService = {
  showSuccess: showSuccess,
  showError: showError,
  showErrors: showErrors,
};

function flatterError(error: unknown, depth = 1): unknown {
  const _depth = depth;
  try {
    if (error instanceof Error) {
      return [error.message];
    } else if (error instanceof Object) {
      const errorArray = flatterObject(error, _depth);
      return Array.isArray(errorArray) ? errorArray.flat(depth) : errorArray;
    } else if (typeof error === "string") {
      return [error];
    }
  } catch {
    return [DEFAULT_ERROR];
  }
}

function flatterObject(
  data: object | Array<unknown>,
  depth: number
): unknown[] | string | object {
  if (data instanceof Object && depth > 0) {
    depth--;
    return (Array.isArray(data) ? data : Object.values(data)).map((item) =>
      item instanceof Object ? flatterObject(item, depth) : item
    );
  }

  return data;
}
