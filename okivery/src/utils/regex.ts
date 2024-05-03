export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const passwordRegex =
  /^(?=.*[a-zA-Z0-9])[a-zA-Z0-9!@#$%^&*()_+{}|:"<>?`\-=[\]\\;',./]{8,}$/;

export const phoneRegex = /^010\d{8}$/;

export const yearRegex = /^(19[0-9][0-9]|20\d{2})$/;

export const monthRegex = /^(0[0-1]|0[0-9]|1[0-2])$/;

export const dayRegex = /^(0[1-9]|[1-2]\d|3[01])$/;
