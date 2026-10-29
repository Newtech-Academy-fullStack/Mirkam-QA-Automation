// Central place for test data, so tests don't hard-code values.
export const PASSWORD = process.env.PASSWORD || 'secret_sauce';

export const USERS = {
  standard: process.env.STANDARD_USER || 'standard_user',
  lockedOut: 'locked_out_user',
  problem: 'problem_user',
};

export const CUSTOMER = {
  firstName: 'Test',
  lastName: 'Student',
  postalCode: '12345',
};
